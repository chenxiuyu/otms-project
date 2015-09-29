/*function area*/
var ehaier = ehaier || {};

/* sobox 2.0 */
!function(a,b){a.sobox={maskIndex:0,showMask:function(c){var d=this,e=a(".so-openmask"),f=a(b).height();return e.length?d.maskIndex++:(e=a('<div class="so-openmask"></div>'),a("body").append(e),d.maskIndex=1),e.height(c?f+20:0),e.css("z-index",1e3+10*d.maskIndex),e},show:function(b,c,d){var e=this,f=a(b.obj),g=e.showMask(c);return e.setPos(b),b.onlyOne&&a("body").data("soonlyone",!0),f.css("z-index",1002+10*e.maskIndex).fadeIn(),f.find(".s-close").bind("click",function(){e.hide(f)}),d&&d(),g},hide:function(b,c){var d=this,e=a(".so-openmask");a(b).fadeOut("fast",function(){a("select").show(),c&&c()}),d.maskIndex--,e.css("z-index",1e3+10*d.maskIndex),0==d.maskIndex&&e.remove(),a(b).find(".s-close").unbind("click")},drag:function(c,d){function g(a){null==a&&(a=window.event),e.css({opacity:"0.4",left:a.clientX-posX+"px",top:a.clientY-posY+"px"})}var e=a(c),f=a(d);f.mousedown(function(c){c||(c=window.event),posX=c.clientX-parseInt(e.css("left")),posY=c.clientY-parseInt(e.css("top")),a(b).mousemove(function(a){g(a)})}),a(b).mouseup(function(){a(b).unbind("mousemove"),e.css({opacity:"1"})})},setPos:function(c){var e,f,g,h,i,j,k,l,m,n;switch(c=a.extend({mode:"center",obj:null,pos:[0,0],offset:[0,0]},c),e=a(c.obj),f=Math.floor(e.height()/2),g=Math.floor(e.width()/2),h=a(window).scrollTop(),i=a(window).height(),j=c.pos[0],k=c.pos[1],l=c.offset[0],m=c.offset[1],e.css({position:"fixed"}),"undefined"==typeof b.body.style.maxHeight&&(n=e.find("select"),a("select").not(n).hide()),c.mode){case"win":e.css({left:j+l,top:k+m}),"undefined"==typeof b.body.style.maxHeight&&e.css({position:"absolute",top:h+k+m});break;case"doc":e.css({position:"absolute",left:j+l,top:k+m});break;case"tc":e.css({left:"50%",top:m,marginLeft:-g+l}),"undefined"==typeof b.body.style.maxHeight&&e.css({position:"absolute",top:h+m});break;case"bc":e.css({left:"50%",bottom:m,marginLeft:-g+l}),"undefined"==typeof b.body.style.maxHeight&&e.css({position:"absolute",top:h+m+i});break;default:e.css({top:"50%",left:"50%",marginTop:-f-10+m,marginLeft:-g+l}),"undefined"==typeof b.body.style.maxHeight&&e.css({position:"absolute",top:h+i/2})}},pop:function(b){function j(i){var j,l,m;b=a.extend(b,i||{}),b.showTitle?e.append(f):g.addClass("s-sopop-single-close"),e.append(g).append(h),b.height&&"iframe"!=b.type&&e.css("height",b.height+"px"),e.css({visibility:b.visibility?"visible":"hidden"}),"content"==b.type&&h.html(b.content),"target"==b.type&&(j=a(b.target).show(),h.append(j)),"iframe"==b.type&&(l=a('<iframe src="'+b.iframe+'" width="100%" height="'+b.height+'" frameborder="0" scrolling="auto"></iframe>'),h.html(l)),"ajax"==b.type&&h.load(b.ajax.url,b.ajax.data,function(){c.setPos({mode:b.posType,obj:e,pos:b.pos,offset:b.offset}),b.ajax.callback&&b.ajax.callback()}),b.btn.length>0&&(m=a('<p class="p-so-popBtn"></p>'),a.each(b.btn,function(){var b=a.extend({cls:null,text:"确定",link:"#",removePop:!0,callback:function(){}},this),c=a('<a class="a-sopop-btn" href="'+b.link+'"><span class="s-sopop-btn">'+b.text+"</span></a>");null!==b.cls&&c.addClass(b.cls),c.bind("click",function(){return b.callback&&b.callback(k),b.removePop&&k(),"#"===b.link?!1:!0}),m.append(c)}),e.append(m)),a("body").append(e),b.showTitle&&b.drag&&(f.addClass("h2-sopop-move"),c.drag(e,f)),b.beforePop(e,f,g,h),d=c.show({mode:b.posType,obj:e,pos:b.pos,offset:b.offset,onlyOne:b.onlyOne},b.showMask,b.onPop(k)),g.bind("click",function(){k()}),b.maskClick&&d.bind("click",function(){k()})}function k(d){b=a.extend(b,d||{}),c.hide(e),a("body").removeData("soonlyone"),null!=b.target&&a(b.target).appendTo("body").hide(),e.remove(),b.closePop()}var d,e,f,g,h,i,c=this;return b=a.extend({type:"content",target:null,content:null,iframe:null,ajax:{url:null,data:null,callback:function(){}},posType:"center",pos:[0,0],offset:[0,0],cls:null,width:400,height:null,defaultShow:!0,visibility:!0,title:"提示",showTitle:!0,showMask:!0,onlyOne:!1,drag:!0,maskClick:!0,btn:[],beforePop:function(){},onPop:function(){},closePop:function(){}},b||{}),e=a('<div class="so-popbox '+(b.cls?b.cls:"")+'" style="width:'+b.width+'px;display:none;"></div>'),f=a('<h2 class="h2-sopop"><span class="s-sopop-title">'+b.title+"</span></h2>"),g=a('<span class="s-sopop-close">[关闭]</span>'),h=a('<div class="so-popbox-cont"></div>'),i=a("body").data("soonlyone"),b.defaultShow&&!i&&j(),{wrap:e,opt:b,removePop:k,showPop:j}},alert:function(a,b,c){var d=this;d.pop({cls:"so-popAlert",title:a,width:360,content:b,btn:[{text:"确定",callback:function(){c&&c()}}]})},confirm:function(a,b,c,d){var e=this;e.pop({cls:"so-popConfirm",title:a,width:360,content:b,btn:[{text:"确定",callback:function(){c&&c()}},{text:"取消",cls:"a-sopop-cancel",callback:function(){d&&d()}}]})},tip:function(b){var d,c=this;b=a.extend({cls:"so-popTip",showTitle:!1,posType:"tc",showMask:!1,width:360,stayTime:5e3,offset:[0,12]},b||{}),d=c.pop(b),b.stayTime>0&&setTimeout(function(){d.removePop()},b.stayTime)},loading:function(b){var d,c=this;return b=a.extend({type:"content",cls:"so-loading",showTitle:!1,maskClick:!1,width:80,height:36,content:"",stayTime:0},b||{}),d=c.pop(b),b.stayTime>0&&setTimeout(function(){d.removePop()},b.stayTime),{open:d.showPop,close:d.removePop}}},a.fn.soIframePop=function(b){var c=a.extend({type:"iframe",targetTag:"href",splitString:"#soIframe?",width:800,height:480,showTitle:!1},b||{}),d=[];return this.each(function(){var g,h,b=a(this),e=b.attr(c.targetTag).split(c.splitString),f=e[0];par=e[1]?e[1].split("&"):"",g={},a.each(par,function(){var a=this.split("=");g[a[0]]=a[1]}),c=a.extend(c,g||{}),c.showTitle="true"==c.showTitle?1:+c.showTitle,c.iframe=f,c.defaultShow=!1,h=a.sobox.pop(c),d.push(h),b.click(function(){return h.showPop(),a(this).data("iframePop",h),!1})}),d},a.fn.soSidePop=function(b){var c=a(this),d=b.event||"click";return c.bind(d,function(c){var d=a.extend({showMask:!1,posType:"doc",pos:[c.pageX,c.pageY],offset:[10,10],onlyOne:!0,returnFalse:!0},b||{});return sidepop=a.sobox.pop(d),d.returnFalse?!1:void 0}),c},a.fn.soOverTip=function(b){var c=a(this),d=a.extend({cls:"so-overTip",showMask:!1,posType:"doc",offset:[10,10],showTitle:!1,onlyOne:!0},b||{}),e=null;return c.mouseenter(function(b){d.pos=[b.pageX,b.pageY],e=a.sobox.pop(d)}).mouseleave(function(){e.removePop()}),c}}(jQuery,document);


/*soChange*/
;(function($){$.fn.extend({"soChange":function(o){o=$.extend({thumbObj:null,botPrev:null,botNext:null,changeType:'fade',thumbNowClass:'now',thumbOverEvent:true,slideTime:1000,autoChange:true,clickFalse:true,overStop:true,changeTime:5000,delayTime:300},o||{});var _self=$(this);var thumbObj;var size=_self.size();var nowIndex=0;var index;var startRun;var delayRun;function fadeAB(){if(nowIndex!=index){if(o.thumbObj){$(o.thumbObj).removeClass(o.thumbNowClass).eq(index).addClass(o.thumbNowClass)};if(o.slideTime<=0){_self.eq(nowIndex).hide();_self.eq(index).show()}else if(o.changeType=='fade'){_self.eq(nowIndex).fadeOut(o.slideTime);_self.eq(index).fadeIn(o.slideTime)}else{_self.eq(nowIndex).slideUp(o.slideTime);_self.eq(index).slideDown(o.slideTime)};nowIndex=index;}};function runNext(){index=(nowIndex+1)%size;fadeAB()};_self.hide().eq(1).show();if(o.thumbObj){thumbObj=$(o.thumbObj);thumbObj.removeClass(o.thumbNowClass).eq(1).addClass(o.thumbNowClass);thumbObj.click(function(){index=thumbObj.index($(this));fadeAB();if(o.clickFalse){return false}});if(o.thumbOverEvent){thumbObj.hover(function(){index=thumbObj.index($(this));delayRun=setTimeout(fadeAB,o.delayTime)},function(){clearTimeout(delayRun)})}};if(o.botNext){$(o.botNext).click(function(){if(_self.queue().length<1){runNext()};return false})};if(o.botPrev){$(o.botPrev).click(function(){if(_self.queue().length<1){index=(nowIndex+size-1)%size;fadeAB()};return false})};if(o.autoChange){startRun=setInterval(runNext,o.changeTime);if(o.overStop){_self.hover(function(){clearInterval(startRun);},function(){startRun=setInterval(runNext,o.changeTime)})}}}})})(jQuery);
/*use*/
ehaier.member = {
	init : function () {
		var that = this;
		if($('.vali-form').length){//表单验证
			that._valiForm();
		}
		if($('.pwform').length){
			that._pwValidate();//密码验证
		}

		that.sendVerify('#sendEmailVerify','/sendEmailVerify');//发送email验证
		that.sendVerify('#sendSmsVerify','/sendSmsVerify',['mobile','#curMobile']);//发送短信验证
		that._smsVerify();//短信验证码验证
		if($('.js_show_logistics').length){
			that._showLogistics();//订单跟踪
		}
		if($('#addressForm').length){
			that._addrValidate();//地址页验证
			that._regionEvent();//地址选择
			that._del_address();//删除地址
			that._add_address();	//新增收货地址
			that._edit_address();	//编辑收货地址
			that._set_defaultaddress();//设置默认地址
			//			that._submit_address();	//编辑收货地址
		}
		if($('.mycollection').length){
			that._delCollection();//删除收藏
		}
		if($('.membergift').length){
			that._giftChangeTab();//礼品卡选项卡切换
			that._variCode();//验证码
			that._bindGiftCard();//绑定礼品卡
			that._checkLeft();//查询礼品卡余额
			that._useMoneyCard();//使用增值卡
			that._popDetail();//查询礼品卡使用详情
		}
		if($('.historytop').length){
			that._calendarUse();//时间选择
		}
		if($('#verifySmsForm').length){
			that._verifySms();
		}
		if($('#doAddfixedAddress').length){
			that._doAddfixedAddress();
		}
		if($('#addReceiptInfo').length){
			that._addReceiptInfo();
		}
	},
	_smsVerify : function () {
		if ($('.btn-verifyMobile').length) {
			$('.btn-verifyMobile').click(function () {
				var vcv = $('.verifyCode').val();
				if (vcv!='') {
					$.ajax({
						type : 'post',
						url : '/member.php?a=verifySms',
						data : 'verifyCode='+vcv,
						success : function (data) {
							if (data.result=='wrong') {
								$.sobox.alert('提示',data.message);
							}else {
								window.location.reload();
							}
						}
					});
				}else {
					$.sobox.alert('提示','请输入验证码！');
				}
				return false;
			});
		}
	},
	//表单验证
	_valiForm : function(){
//		var $formA = $('.vali-form').soValidate({
//			submit : function (form) {
//				form.submit();
//			}
//		});
	},
	//订单跟踪
	_showLogistics : function () {
		$('.js_show_logistics').toggle(function () {
			var index=$('.js_show_logistics').index(this);
			$('.show_logistics').eq(index).show();
		},function () {
			var index=$('.js_show_logistics').index(this);
			$('.show_logistics').eq(index).hide();
		});
	},
	//地区选择变化
	regionChange : function (o,url) {
		var _self = $(o),v = _self.val(); 
		var nextSel = _self.next('select');
		$.getJSON('/getRegionOptions?parentId=' +v,function (data) {
			if (data.success&&data.data) {
				var optionHtml = '<option value="">请选择...</option>';
				$.each(data.data,function () {
					optionHtml += '<option value="'+this.id+'">'+this.regionName+'</option>';
				});
				nextSel.html(optionHtml);
			}
		});
		
	},
	
	//地址选择
	_regionEvent : function () {
		var that = this;
		if ($('.se-region').length) {
			$('.se-region').change(function () {
				that.regionChange(this);
			});
		}
	},
	//删除地址
	_delAddr : function(){
		$('.js_del_address').click(function () {
			$.sobox.pop({
				title : '提示',
				content : '您确定要删除收货地址吗？',
				btn:[{text : '确定'},{text : '取消',cls:'a-cancel'}]
			});
		return false;
		});
	},
	//新增收货地址
	_add_address : function () {
		$('.js_add_address').click(function () {
			//添加操作将表单中的ID值清空
			$('#txt-id').attr("value",'');
			$('#txt-fresher').attr("value",'');
			$('#txt-contact').attr("value",'');
			$('#txt-addr').attr("value",'');
			$('#txt-fresh').attr("value",'');
			$('select[name="provinceId"]').find('option[value=0]').attr("selected","selected");
			document.getElementById("cityId").options.length=1;
			document.getElementById("regionId").options.length=1;
			$.sobox.pop({type:'target',title:'新增收货地址',target:'#addressForm',width:660});
		});
	},
	//编辑收货地址
	_edit_address : function () {
		$('.js_edit_address').click(function () {
			$('.em-errMes').hide();
			
			var index=$('.js_edit_address').index(this);
			$('#addressForm').attr("action","/updateAddress?id="+$('.ed_fresher').eq(index).attr("ed_id"));
			//$('#addressForm').attr("action","http://www."+ehaier.tool.domain+".com/memberaddress.php?a=doEdit&id="+$('.ed_fresher').eq(index).attr("ed_id"));
			//编辑地址时设置表单中的ID值
//			$('#txt-id').attr("value",$('#ed_id').val());
			$('#txt-fresher').attr("value",$('.ed_fresher').eq(index).text());
			$('#txt-contact').attr("value",$('.ed_contact').eq(index).text());
			$('#txt-addr').attr("value",$('.ed_addr').eq(index).text());
			$('#txt-fresh').attr("value",$('.ed_fresh').eq(index).text());
			
			$('.se-time option').each(function(){this.selected=false;});
			$('.se-time').find('option[value='+ $(".ed_time").eq(index).attr("shippingTime") +']').attr("selected","selected");
			
			var privinceID=$('.ed_addr').eq(index).attr("privinceID");
			var cityId=$('.ed_addr').eq(index).attr("cityId");
			var regionId=$('.ed_addr').eq(index).attr("regionId");
			$('select[name="provinceId"]').find('option[value='+ privinceID +']').attr("selected","selected");
			function changeR (){
				var privinceVal=$('#provinceId').find('option:selected').val();
				var cityVal=$('#cityId').find('option:selected').val();
					if(privinceVal != 0){
					$.ajax({
						type : 'get',
						url : '/getRegionOptions?parentId='+privinceVal,
						success : function (data) {
							if (data.data) {
								var optionHtml = '<option value="">请选择...</option>';
								$.each(data.data,function (k,v) {
									optionHtml += '<option value="'+this.id+'">'+this.regionName+'</option>';
								});
								$('#cityId').html(optionHtml);
								$('select[name="cityId"]').find('option[value='+ cityId +']').attr("selected","selected");
								}
					},
						error : function () { alert("请求出错了");}
					});
					
					$.ajax({
						type : 'get',
						url : '/getRegionOptions?parentId='+cityId,
						success : function (data) {
							if (data.data) {
								var optionHtml = '<option value="">请选择...</option>';
								$.each(data.data,function (k,v) {
									optionHtml += '<option value="'+this.id+'">'+this.regionName+'</option>';
								});
								$('#regionId').html(optionHtml);
								$('select[name="regionId"]').find('option[value='+ regionId +']').attr("selected","selected");
								}
						},
							error : function () { alert("请求出错了");}
						});
					}else {
						$('select[name="provinceId"]').find('option[value=0]').attr("selected","selected");
						document.getElementById("cityId").options.length=1;
						document.getElementById("regionId").options.length=1;
					}
			}
		changeR();
		$('select[name="regionId"]').find('option[value='+ regionId +']').attr("selected","selected");
		$.sobox.pop({type:'target',title:'编辑收货地址',target:'#addressForm',width:660});
		});		
	},
	//提交收货地址
//	_submit_address : function(){
//		$('#addressForm').submit(function () {
//			alert( this.action);
//		});
//	},
	//删除地址
	_del_address : function(){
		$('.js_del_address').click(function () {
			var del_url=$(this).attr("href");
			//var del_url='http://www.'+ehaier.tool.domain+'.com'+$(this).attr("href");
			var address_id = $(this).attr("href");
			$.sobox.confirm('提示','你确定此操作吗？',function(){
				//window.location.href = del_url;
				$('#addressForm').attr("action",del_url);
				$('#addressForm').submit();
				},function(){
					
					
				}); 
		return false;
		});
	},
	
	//设置默认地址
	_set_defaultaddress:function(){
		$('.js_set_default').click(function () {
			var del_url=$(this).attr("href");
			//var del_url='http://www.'+ehaier.tool.domain+'.com'+$(this).attr("href");
			var address_id = $(this).attr("href");
			$.sobox.confirm('提示','你确定此操作吗？',function(){
				//window.location.href = del_url;
				$('#addressForm').attr("action",del_url);
				$('#addressForm').submit();
				},function(){
					
					
				}); 
			return false;
		});
		
	},
	//删除收藏
	_delCollection : function(){
		$('.bt_blue').click(function(){
			var url='/delmembercolect?productId='+$(this).attr("productId");
			$.sobox.confirm('提示','你确定此操作吗？',function(){
				$("#collectForm").attr("action", url).attr("method", "POST").submit();
				$(this).parents('tr').remove();
				},function(){}); 
		})
	},
	sendVerify : function (o,ajaxUrl,optArr) {
		if ($(o).length) {
			$(o).click(function () {
				var _self = $(this);
				var v = _self.val();
				var url = ajaxUrl;
				if (optArr) {
					ov = $(optArr[1]).val();
					var url = ajaxUrl+'?'+optArr[0]+'='+ov+'&t=' + Math.random();
				}
				$.ajax({
					type :'get',
					url : url,
					success : function (data) {
						if (data.success==false) {
							$.sobox.alert('提示',data.message);
						}else {
							timeDown({
								begin: function(second) {
									_self.val(second + "秒后重新发送").attr("disabled", true);
								},
								end: function () {
									_self.val(v).attr("disabled", false);
								}
							},30);
						}
					}
				});
			});
		}
		function timeDown(obj, second) {
			if (second <= 0) {
				obj.end();
				return;
			}
			obj.begin(second);
			setTimeout(function () {timeDown(obj, second - 1)}, 1000);
		}
	},
	//membergiftcard礼品卡选项卡切换
	_giftChangeTab : function(){
		$('.form-giftbound').soChange({
			thumbObj:'.a-cardsnav',//导航对象指向标题h3
			slideTime:0,
			thumbOverEvent:true,//关闭鼠标经过切换的动作
			autoChange:false
		});
	},
	//查看礼品卡详情
	_popDetail:function(){
		$('.a-checklist').click(function(){
			var cardNum = $(this).parent().parent().children()[1].innerHTML;
				$.ajax({
				type : 'get',
				url: "/getCardLog",
				data :{
					'cardNum':cardNum 
				},
				success : function (data) {
					if (data.data){
						var card = data.data[0];
						var html;
						if(card == null || card.giftCardNumbers== null){
							 html = "<p class='p-giftinfo'>";
							 html+=" <table class='uselist'>  <tr>";
		                     html+="<th class='th-innertale'>时间</th>";
		                     html+="<th class='th-innertale'>订单编号</th>";
		                     html+="<th class='th-innertale'>类型</th>";
		                     html+="<th class='th-innertale'>消费金额</th>";
		                     html+="<th class='th-innertale'>是否本人消费</th>";
		                     html+="<th class='th-innertale'>备注</th> </tr>";
						}else{
							var cardNumber = card.giftCardNumbers.cardNumber;
							var amount = card.giftCardNumbers.amount;
							var balance = card.giftCardNumbers.balance;
							html = "<p class='p-giftinfo'>";
							html+="<span>礼品卡卡号："+cardNumber+"</span>";
							html+="<span>面值：<em>"+"￥"+amount+"</em></span>";
							html+="<span>余额："+"￥"+balance+"</span>";
		                    html+="<span>有效期："+card.giftCardNumbers.cardAddTimeStr+"</span></p>";
		                    
		                    html+=" <table class='uselist'>  <tr>";
		                    html+="<th class='th-innertale'>时间</th>";
		                    html+="<th class='th-innertale'>订单编号</th>";
		                    html+="<th class='th-innertale'>类型</th>";
		                    html+="<th class='th-innertale'>消费金额</th>";
		                    html+="<th class='th-innertale'>是否本人消费</th>";
		                    html+="<th class='th-innertale'>备注</th> </tr>";
	                    $.each(data.data,function (k,v) {
                    	
	                    	var type;//类型
	                    	var isSelf;
	                    	if(this.usedType==1){
	                    		type = "减卡内余额";
	                    	}else{
	                    		type = "加卡内余额";
	                    	}
	                    	
	                    	if(this.giftCardNumbers.memberId == this.giftCardNumbers.bindMemberId){
	                    		isSelf = "是";
	                    	}else{
	                    		isSelf = "否";
	                    	}
                    	
	                    	html+="<tr>";
	                    	html+= "<td class='td-cardslist'>"+this.addTimeStr+"</td>";
	                    	html+= "<td class='td-cardslist'>"+this.orderSn+"</td>";
	                    	html+= "<td class='td-cardslist'>"+type+"</td>";
	                    	html+= "<td class='td-cardslist'>"+"￥"+this.amount+"</td>";
	                    	html+= "<td class='td-cardslist'>"+isSelf+"</td>";
	                    	html+= "<td class='td-cardslist'>"+this.remark+"</td>   ";
                    
					});
						}
                    html+="</tr></table>";
                    
                    $('.usedetail').html(html);
                    
                    $.sobox.pop({
						type:'target',
						title:'礼品卡使用记录',
						width:750,
						target:'.usedetail',
						cls:'usecardlist'
					});
					}else{//无记录
						var no_html ="<p colspan='10' style='color: red;'>"+"无记录"+"</p>";
						$('.usedetail1').html(no_html);
						$.sobox.pop({
							type:'target',
							title:'礼品卡使用记录',
							width:750,
							target:'.usedetail1',
							cls:'usecardlist'
						});
					}
				}
			});
			return false;
			
		});
	},
	//验证码
	_variCode : function(){
		$('#varicode').click(function () {
		$(this).val('');
		$('#kaptchaImage').show().attr('src','/getKaptcha3?'+ Math.random());
		$(this).unbind('click');
	});
	$('#kaptchaImage').click(function () {
		$(this).attr('src','/getKaptcha3?'+ Math.random());
		return false;
	});
	$('.form-giftboundB').submit(function(){
		if ($.trim($('#varicode').val()) == '') {
			$('#adviceMsg').addClass('validation-advice').html('请输入验证码');
			return false;
		}
	});
	},
	
	//绑定礼品卡
	_bindGiftCard:function(){
		$('#btn-bound').click(function () {
			var $form = $('.form-giftboundB');
//			$('.form-giftboundB').attr("action","/binduser.html");
//			$('.form-giftboundB').attr("method","post");
//			$('.form-giftboundB').submit();
			$.ajax({
				type : 'post',
				url: '/binduser',
				data :
					"varicode="+ $form.find('input[name=varicode]').val()+
					"&cardno=" +$form.find('input[name=cardnum]').val()+
					"&cardno1=" +$form.find('input[name=cardno1]').val()+
					"&cardno2=" +$form.find('input[name=cardno2]').val()+
					"&cardno3=" +$form.find('input[name=cardno3]').val()+
					"&cardno4=" +$form.find('input[name=cardno4]').val()+'&'+getCSRFTokenParam(),
				success : function (data) {
					if (typeof(data) == "object"){
						$.sobox.alert('礼品卡绑定',data.data.message);
					}
					refrushCSRFToken(data.csrfToken);
				}
			});
			return false;
	});
	},
	
	//查询礼品卡余额
	_checkLeft : function(){
		var checkbalance = $('#checkleft');
		if (checkbalance){
		checkbalance.click(function () {
//			$('.form-giftboundB').attr("action","/checkBalance");
//			$('.form-giftboundB').attr("method","get");
//			$('.form-giftboundB').submit();
			var $form = $('.form-giftboundB');
			$.ajax({
				type : 'get',
				url: "/checkBalance",
				data :{
					'varicode': $form.find('input[name=varicode]').val(),
					'cardno': $form.find('input[name=cardnum]').val(),
					'cardno1': $form.find('input[name=cardno1]').val(),
					'cardno2': $form.find('input[name=cardno2]').val(),
					'cardno3': $form.find('input[name=cardno3]').val(),
					'cardno4': $form.find('input[name=cardno4]').val()
				},
				success : function (data) {
					if (typeof(data) == "object"){
						if(data.data.balance != null){
							$.sobox.alert('查看礼品卡余额',"￥"+data.data.balance+"元");
						}else{
							$.sobox.alert('查看礼品卡余额',data.data.message);
						}
					}
				}
			});
			return false;
		});
		}
	},
	//使用增值卡
	_useMoneyCard:function(){
		$('#usemcard').click(function () {
		var $form = $('.form-giftboundC');
//		$('.form-giftboundC').attr("action","/userCardno");
//		$('.form-giftboundC').submit();
		$.ajax({
			type : 'post',
			url : '/userCardno',
			data : 
				"store="+ $form.find('input[name=shopid]').val()+
				"&choosecard=" +$form.find('select[name=choosecard]').val()+
				"&money="+ $form.find('input[name=usemoney]').val()+
				"&cardno11=" +$form.find('input[name=moneycard1]').val()+
				"&cardno21=" +$form.find('input[name=moneycard2]').val()+
				"&cardno31=" +$form.find('input[name=moneycard3]').val()+
				"&cardno41=" +$form.find('input[name=moneycard4]').val()+
				"&remark="+ $form.find('input[name=remark]').val()+'&'+getCSRFTokenParam(),
				
			success : function (data) {
				console.log(typeof(data));
				if (typeof(data) == "object"){
					$.sobox.alert('提示',data.data.message);
				}
				refrushCSRFToken(data.csrfToken);
			}
		});
		return false;
	});
	},
	_calendarUse : function(){
	$('#createTimeMin').calendar({btnBar:false});
	$('#createTimeMax').calendar({btnBar:false});
	},
	_verifySms:function(){
		$('#verifySms').click(function () {
			$.ajax({
				type: 'post',
				url: '/verifySms',
				data: "verifyCode="+$('#verifyCode').val()+'&'+getCSRFTokenParam(),
				success: function (data) {
					console.log(typeof(data));
					refrushCSRFToken(data.csrfToken);
					if (data.success == false){
						$.sobox.alert('提示',data.message);
					}else{
						window.location.href="/index.html";
					}
				},
				error: function(data){
					alert('ddd');
				}
			});
		});
	},
	_doAddfixedAddress: function(){
		$('#doAddfixedAddress').click(function(){
			var regionName = $('#provinceId option:selected').text() + ' ' + $('#cityId option:selected').text() + ' ' + $('#regionId option:selected').text();
			$.ajax({
				type: 'post',
				url: '/doAddReadMode',
				data: 
					'consignee=' + $('#txt-consignee').val() + 
					'&idNumber=' + $('#txt-idNumber').val() + 
					'&mobile=' + $('#txt-mobile').val() + 
					'&provinceId=' + $('#provinceId').val() + 
					'&cityId=' + $('#cityId').val() + 
					'&regionId=' + $('#regionId').val() + 
					'&regionName=' + regionName + 
					'&address=' + $('#txt-addr').val() + 
					'&zipCode=' + $('#txt-zipCode').val() +
					'&'+getCSRFTokenParam(),
				success: function(data){
					refrushCSRFToken(data.csrfToken);
					if(data.success == false){
						$.sobox.alert('提示',data.message);
					}else{
						window.location.href='/index.html';
					}
				}
			});
		});
	},
	_addReceiptInfo: function(){
		$('#addReceiptInfo').click(function(){
			alert();
			$.ajax({
				type: 'post',
				url: 'doAddReceiptInfo',
				data:
					'consignee=' + $('#rep-consignee').val() +
					'&address=' + $('#rep-address').val() +
					'&zipcode=' + $('#rep-zipcode').val() +
					'&mobile=' + $('#rep-mobile').val() +
					'&companyName=' + $('#rep-companyName').val() +
					'&taxSpotNum=' + $('#rep-taxSpotNum').val() +
					'&regAddress=' + $('#rep-regAddress').val() +
					'&regPhone=' + $('#rep-regPhone').val() +
					'&bank=' + $('#rep-bank').val() +
					'&bankAccount=' + $('#rep-bankAccount').val() +
					'&'+getCSRFTokenParam(),
				success: function(data){
					if(data.success == false){
						$.sobox.alert('提示',data.message);
					}else{
						window.location.href='/index.html';
					}
					refrushCSRFToken(data.csrfToken);
				}
			});
		});
	},
	_addrValidate : function () {
		$('.em-errMes').hide();
		
		function nameCheck(){
			var pcode=$('#txt-fresher');
			var pcValue=pcode.val();
			if((pcValue.length)<1){
				$('#txt-fresher + .em-errMes').show().html('请输入收货人姓名');
				return false;	
				}else{
					$('#txt-fresher + .em-errMes').hide();
					return true;	
				}
		}
		function teleCheck(){
			var checx=/^(13|15|18)\d{9}$/;
			var tele=$('#txt-contact');
			var teleValue=tele.val();
			if(!checx.test(teleValue)){
				$('#txt-contact + .em-errMes').show().html('请输入正确的11位手机号码');
				return false;					
				}else{
					$('#txt-contact + .em-errMes').hide()
					return true;
				}
		}
		function pcCheck(){
			var checx=/^[1-9]\d{5}(?!\d)$/;
			var pcode=$('#txt-fresh');
			var pcValue=pcode.val();
			if(!checx.test(pcValue)){
				$('#txt-fresh + .em-errMes').show().html('请输入正确的6位邮政编码');
				return false;					
				}else{
					$('#txt-fresh + .em-errMes').hide();
					return true;	
				}
		}
		
		function addrCheck(){
			var addr=$('#txt-addr');
			var addrValue=addr.val()
			if((addrValue.length<1)||(addrValue.length>=50)){
				$('#txt-addr + .em-errMes').show().html('请输入收货地址且地址不能超过50字');
				return false;	
				}else{
					$('#txt-addr + .em-errMes').hide();
					return true;	
				}
		}
		
		
		$('#txt-fresher').blur(nameCheck);
		$('#txt-contact').blur(teleCheck);
		$('#txt-fresh').blur(pcCheck);
		$('#txt-addr').blur(addrCheck);
		$('#addressForm .bt_submit').click(function(){
			var provinceVal = $('#provinceId').val();
			var cityVal =  $('#cityId').val();
			var regionVal = $('#regionId').val();
			if(nameCheck()&&teleCheck()&&addrCheck()&&pcCheck()&&provinceVal != 0 && cityVal !=0 &&regionVal!= 0 ){
				return true;
			}else if(nameCheck()&&teleCheck()&&addrCheck()&&pcCheck()){
				//提交时校验省市区
				if(provinceVal == 0 || cityVal == 0 || regionVal == 0){
					$('.se-region + .em-errMes').show().html('请选择地区');
			}
			return false;				
			}else{
				return false;
			}
		});	

},
_pwValidate : function(){
	$('.em-errMes').hide();
	$('#txt-oldpw').blur(opwCheck);
	$('#txt-newpw').blur(npwCheck);
	$('#txt-repw').blur(reCheck);
	$('.pwform .bt_submit').click(function(){
			if(opwCheck()&&npwCheck()&&reCheck()){
				return true;			
			}else{
				return false;
				}				
			});	
		function opwCheck(){
				var pw=$('#txt-oldpw');
				var pwValue=pw.val();
				if((pwValue.length)<6){
					$('#txt-oldpw + .em-errMes').show().html('请输入至少6位作为密码');
					return false;					
					}else{
						$('#txt-oldpw + .em-errMes').hide()
						return true;
					}
			}
		function npwCheck(){
				var npw=$('#txt-newpw');
				var npwValue=npw.val();
				console.log('------'+npwValue);
				if((npwValue.length)<6){
					$('#txt-newpw + .em-errMes').show().html('请输入至少6位作为密码');
					return false;					
					}else{
						$('#txt-newpw + .em-errMes').hide()
						return true;
					}
			}
		function reCheck(){
				var npw=$('#txt-newpw');
				var npwValue=npw.val();
				var rpw=$('#txt-repw');
				var rpwValue=rpw.val();
				if(rpwValue!=npwValue){
					$('#txt-repw + .em-errMes').show().html('两次输入密码不一致，请重新输入');
					return false;					
					}else{
						$('#txt-repw + .em-errMes').hide()
						return true;
					}
			}
}


}

/*use*/
$(function () {
	ehaier.member.init();
});


	
	
