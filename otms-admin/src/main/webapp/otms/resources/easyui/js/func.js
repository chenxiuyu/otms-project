$.fn.foucsText=function(c){var a=this;var b=(c==null)?$(a).val():c;a.val(b);a.focus(function(){if(a.val()==b){a.val("")}});a.blur(function(){if(a.val()==""){a.val(b)}});return a};

/* 分页函数 */
function pagerFilter(data){
	if (typeof data.length == 'number' && typeof data.splice == 'function'){	// is array
		data = {
			total: data.length,
			rows: data
		}
	}
	var dg = $(this);
	var opts = dg.datagrid('options');
	var pager = dg.datagrid('getPager');
	pager.pagination({
		onSelectPage:function(pageNum, pageSize){
			opts.pageNumber = pageNum;
			opts.pageSize = pageSize;
			pager.pagination('refresh',{
				pageNumber:pageNum,
				pageSize:pageSize
			});
			dg.datagrid('loadData',data);
		}
	});
	if (!data.originalRows){
		data.originalRows = (data.rows);
	}
	var start = (opts.pageNumber-1)*parseInt(opts.pageSize);
	var end = start + parseInt(opts.pageSize);
	data.rows = (data.originalRows.slice(start, end));
	return data;
}

$(function () {

	if($.validator){
		$.validator.setDefaults({//表单提交验证事件
			submitHandler: function(form) {
				if(window.afterValidate){
					$.messager.progress({text:"提交中..."});
					afterValidate();
				}
				form.submit();
			}
		});

		$(".validForm").validate();//form-a 验证
		//$(".op-form-b").validate();//form-b 验证
	}

	if ($('.a-extend').length) {
		var $s=$('#searchbar')
		var sh = $s.panel('options').height;
		$('.a-extend').toggle(function () {
			$(this).addClass('a-intend');
			$s.panel('resize',{height:26});
			$(window).trigger('resize');
		},function () {
			$(this).removeClass('a-intend');
			$s.panel('resize',{height:sh});
			$(window).trigger('resize');
		});
	}

	$('.txt-focus').each(function () {
		$(this).foucsText();
	});

	if ($('.dt-group').length) {
		$('.dt-group').click(function () {
			var $p = $(this).parent();
			if ($p.hasClass('dl-intend')) {
				$p.removeClass('dl-intend');
			}else {
				$p.addClass('dl-intend');
			}
		});
	}
});


function dataGridLoadSuccess(data){
	if(data.rows.length==0){//无数据提示
		var body1 = $(this).data().datagrid.dc.body1;
		var body2 = $(this).data().datagrid.dc.body2;
		body1.find('table').html('<tr class="datagrid-row"><td class="datagrid-td-rownumber"><div class="datagrid-cell-rownumber"></div></td></tr>');
		body2.find('table').width('100%').find('tbody').append('<tr><td style="height: 25px; text-align: center;">没有数据</td></tr>');
	}
	if('afterDataGridLoaded' in window) {
		afterDataGridLoaded(data);
	}
}

function queryParamsHandler(formId){
	var strParams = '{';
	$("[name^='q_']").each(function () {
		strParams+='"'+$(this).attr('name')+'"';
		strParams+=':';
		strParams+='"'+$(this).val()+'"';
		strParams+=',';
	});
	strParams = strParams.substr(0, strParams.length-1);
	strParams += '}';
	return eval('('+strParams+')');
}


//根据cookie的name取得value
function getCookie(c_name)
{
if (document.cookie.length>0)
  {
  c_start=document.cookie.indexOf(c_name + "=");
  if (c_start!=-1)
    { 
    c_start=c_start + c_name.length+1; 
    c_end=document.cookie.indexOf(";",c_start);
    if (c_end==-1) c_end=document.cookie.length;
    return decodeURIComponent(document.cookie.substring(c_start,c_end));
    } 
  }
return "";
}

function getErrMsg(errMsg) {
	if (errMsg) {
		if (errMsg.indexOf('"') == 0 && errMsg.lastIndexOf('"') == errMsg.length - 1) {
			errMsg = errMsg.substring(1, errMsg.length - 1);
		}
	}
	return errMsg;
}

//ajax防重复提交
function getCSRFTokenParam(){
	var cSRFTokenParam = 'CSRFToken=';
	cSRFTokenParam += $("input[name='CSRFToken']").val();
	cSRFTokenParam += '&CSRFMemKey=';
	cSRFTokenParam += $("input[name='CSRFMemKey']").val();
	return cSRFTokenParam;
}

function refrushCSRFToken(csrfToken){
	$("input[name='CSRFToken']").val(csrfToken);
}

//相册功能
//userEmail
//img_show_prefix无值，表示没有预览功能
//仅提供img_show_prefix，或isMulti值为false，表示只有单个组件
function openGalleryGroup(userEmail, img_show_prefix, isMulti) {
	var that = this;
	var curInput=null;
	var curImgShow=null;
	var ajaxFileUrl = ehaier.domainUrl.albumImgServer+'getCateListJson.html?uid='+userEmail+'&pi=';
	var ajaxPicUrl = ehaier.domainUrl.albumImgServer+'getImageAppsListJson.html?uid='+userEmail;

	var sgalleryPop = "<div id='galleryPop' class='easyui-dialog' data-options='title:\"选择图片\",iconCls:\"icon-save\",modal:true,closed:true' style='width:580px;height:435px;'><ul class='ul-op-gallery'></ul><p class='p-page'></p></div>";
	$('body').append(sgalleryPop);

	var ajaxPicPageUrl = null;
	var sGallery = $('<span class="s-gallerySel"></span>');
	var $galleryPage = $('#galleryPop .p-page');

	$('.txtGallery').after(sGallery);

	$('.s-gallerySel').click(function () {
		curInput = $(this).siblings('.txtGallery');
		if(img_show_prefix != undefined){
			curImgShow = img_show_prefix;
			if(isMulti == true){
				curImgShow += curInput.attr("id").substr(curInput.attr("id").length-1);
			} 
		}
		$('#galleryPop').window('open');
		getFileList(ajaxFileUrl,1);
	});

	function getFileList(ajaxUrl,page) {
		$.ajax({//请求文件夹列表
			url:ajaxUrl+page,
			type:"GET",dataType: "jsonp",jsonp: "jsonpCallback",
			success:function ( fileData ) {
				if (fileData.success) {//文件列表有数据
					var data = fileData.data;
					var fileHtml = '',pageHtml = '',filePage = data.pc*1,nowPage = data.pi*1;
					var pageHtmlBox = '<span class="s-total"> 共<em class="em-total"></em>条记录</span><span class="s-page"></span>';//分页html
					$galleryPage.empty().append(pageHtmlBox);//插入分页
					$.each(data.imageCateList,function () {//文件夹列表
						fileHtml += '<li class="li-file"><a class="a-file" href="'+ajaxPicUrl+'&cid='+this.imageCategory.cateId+'">'+this.imageCategory.cateName+'<span class="s-num">('+this.cateImageCount+')</span></a></li>';
					});
					$('.ul-op-gallery').html(fileHtml);
					for (i = 1; i <= filePage; i++) {//增加页码
						if (i == nowPage) {
							pageHtml += '<a class="a-page a-pageNow" href="'+i+'">'+i+'</a>';
						}else {
							pageHtml += '<a class="a-page" href="'+i+'">'+i+'</a>';
						}
					}
					$('#galleryPop .s-page').html(pageHtml);
					$('#galleryPop .em-total').text(fileData.totalCount);

					$('#galleryPop .a-page').click(function () {//页码点击事件
						$galleryPage.empty();
						var p = $(this).attr('href');
						getFileList(ajaxUrl,p);
						return false;
					});

					$('.a-file').click(function () {//文件夹点击事件
						$galleryPage.empty();
						var ajaxPicUrl = $(this).attr('href');
						ajaxPicPageUrl = ajaxPicUrl;
						getGalleryList(ajaxPicPageUrl,ajaxUrl,nowPage);
						return false;
					});
				}else {//返回失败(无数据，或地址请求错误)
					$('.ul-op-gallery').html(fileData.message);
				};
			}
		});
	}


	function getGalleryList(ajaxUrl,ajaxFileUrl,nowPage) {
		$.ajax({
			url:ajaxUrl,
			type:"GET",dataType: "jsonp",jsonp: "jsonpCallback",
			success:function ( data ) {
				if (data.success) {
					var imgData = data.data;
					var liHtml = '',pageHtml = '',galleryPage = imgData.pc*1;
					var pageHtmlBox ='<a class="a-backFile" href="'+ajaxFileUrl+'">&lt;&lt;返回专辑</a><span class="s-total"> 共<em class="em-total"></em>条记录</span><span class="s-page"></span>';//分页html
					$galleryPage.empty().append(pageHtmlBox);
					$.each(imgData.imageAppsList,function () {//遍历显示图片
						liHtml += '<li class="li-img"><a class="a-img" href="#"><img src="'+this.imageUrl+'" alt="" /></a><span class="s-imgSize">'+this.imageWidth+'*'+this.imageHeight+'</span></li>';
					});
					$('.ul-op-gallery').html(liHtml);
					$('.ul-op-gallery img').click(function () {//绑定图片点击事件
						curInput.val($(this).attr('src')).focus();
						$('#galleryPop').window('close');
						$galleryPage.empty();
						if(curImgShow != null){
							$('#'+curImgShow).attr('src', $(this).attr('src')); //显示图片区域赋值
						}
						return false;
					});
					for (i = 1; i <= galleryPage; i++) {//增加页码
						if (i== imgData.pi*1) {
							pageHtml += '<a class="a-page a-pageNow" href="'+ajaxPicPageUrl+'&pi='+i+'">'+i+'</a>';
						}else {
							pageHtml += '<a class="a-page" href="'+ajaxPicPageUrl+'&pi='+i+'">'+i+'</a>';
						}
					}

					$('#galleryPop .s-page').html(pageHtml);
					$('#galleryPop .em-total').text(data.totalCount);
					$('#galleryPop .a-backFile').click(function () {
						$galleryPage.empty();
						var ajaxUrl = $(this).attr('href');
						getFileList(ajaxUrl,nowPage);
						return false;
					});
					$('#galleryPop .a-page').click(function () {//页码点击事件
						$galleryPage.empty();
						var ajaxUrl = $(this).attr('href');
						getGalleryList(ajaxUrl,ajaxFileUrl,nowPage);
						return false;
					});
				}else {//返回失败(无数据，或地址请求错误)
					$('.ul-op-gallery').html(data.message);
					var pageHtmlBox ='<a class="a-backFile" href="'+ajaxFileUrl+'">&lt;&lt;返回专辑</a>';
					$galleryPage.empty().append(pageHtmlBox);
					$('#galleryPop .a-backFile').click(function () {
						$galleryPage.empty();
						var ajaxUrl = $(this).attr('href');
						getFileList(ajaxUrl,nowPage);
						return false;
					});
				};
			}
		});
	}

}
