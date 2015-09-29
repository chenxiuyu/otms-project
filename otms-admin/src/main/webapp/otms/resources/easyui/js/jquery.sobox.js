/* sobox 2.0 */
(function ($) {
	var $so = $.sobox={};
	/* $.sobox.base */
	$so.base = {
		maskIndex:0,
		insertmask:function () {
			var $mask = $('<div class="so-openmask"></div>');
			if (!$('.so-openmask').length) {$('body').append($mask);$so.base.maskIndex = 1;}else{$so.base.maskIndex++;};
			return $mask;
		},
		//set position,=ie6+
		setPos:function(o) {
			var $o = $(o),
				 t=Math.floor($o.height()/2),
				 l=Math.floor($o.width()/2);
			var scrollY=$(window).scrollTop(),wh = $(window).height();
			$o.css({'left':'50%','marginTop':-t-30,'marginLeft':-l});
			if(typeof document.body.style.maxHeight == "undefined") {
				var this_sel = $o.find('select');
				$('select').not(this_sel).hide();
				$o.css({'position':'absolute','top':(scrollY+wh/2)});
			}else{
				$o.css({'position':'fixed','top':'50%'});
			}
			return $o;
		},
		show:function (obj,fn) {//显示弹出框和mask,fn返回事件
			var obj = $(obj),dh = $(document).height();
			var $mask = $so.base.insertmask();
			$('.so-openmask').height(dh+20);
			//$('.so-openmask').bind('click',function () {$so.base.hide(obj);});
			$so.base.setPos(obj).fadeIn();
			obj.find('.s-close').bind('click',function () {$so.base.hide(obj);});
			if (fn) {fn();}
			return $mask;//返回背景层对象
		},
		hide:function (obj,fn) {//隐藏弹出框和mask,fn返回事件
			$(obj).fadeOut("fast",function () {
				$('select').show();
				if (fn) {fn();}
			});
			$so.base.maskIndex--;
			if ($so.base.maskIndex==0) {$('.so-openmask').remove();$(this).hide();}
			$(obj).find('.s-close').unbind('click');
		},
		mhide:function (obj,fn) {//只隐藏弹出框,fn返回事件
			$(obj).fadeOut(300,function () {
				$so.base.maskIndex--;
				if (fn) {fn();}
			});
		}
	}
		

	$so.show = $so.base.show;
	$so.hide = $so.base.hide;
	$so.mhide = $so.base.mhide;
	/* $.sobox.pop */
	$.soPopbox= $so.pop = function (o) {
		var o = $.extend({
			popTarget : null,//pop目标，值为某目标的id或class
			wrapTarget : true,//是否外包裹pop目标，false时直接对应目标盒子
			className : null,//添加自定义类名
			width:400,height:null,//宽高属性
			defaultShow:true,//默认pop执行后显示（用于部分复杂处理场景）
			title : '提示',//默认标题
			titleHide:false,//标题栏隐藏：默认显示
			maskClick : true,//点击背景关闭内容
			content : null,//pop内容
			beforeCallback:function(){},
			callback : function(){},
			closeCallback : function(){},//s-sopop-close点击返回事件
			ajax:{url:null,data:null,callback:function(){}},//ajax事件
			btn : []//{className:,name:'确定',link:,returnFalse:true,closePop: true,callback:}
		}, o || {});
		var $popWrap = $('<div class="so-popbox" style="width:'+o.width+'px;visibility:hidden;"></div>');
		var $mask;//在base.show事件中设置
		if (o.className) {$popWrap.addClass(o.className);}
		if (o.height) {$popWrap.css('height',o.height+'px');}
		var  $popCont = '<h2 class="h2-sopop"><span class="s-sopop-title">'+o.title+'</span><span class="ss-close s-sopop-close">[关闭]</span></h2><div class="so-popbox-cont"></div>';
		$popWrap.append($popCont);
		var $popTitle = $popWrap.find('.h2-sopop');
		var $popCont = $popWrap.find('.so-popbox-cont');
		var $ssClose = $popWrap.find('.s-sopop-close');
		if (o.titleHide) {$popTitle.hide();}
		if (o.popTarget) {//添加目标对象
			var $popTarget= $(o.popTarget).show();
			if (o.wrapTarget) {
				$popCont.append($popTarget);
			}else {
				$popWrap = $popTarget;
			}
		}
		if (o.content) {$popCont.append(o.content);}//添加内容
		if (o.ajax.url){
			var $ajaxBox = o.wrapTarget?$popCont:$popWrap;
			$ajaxBox.load(o.ajax.url,o.data,function () {
				$so.base.setPos($popWrap);
				if (o.ajax.callback) {o.ajax.callback();}
			});
		}
		if (o.btn) {//添加按钮
			var $popBtn = $('<p class="p-so-popBtn"></p>');
			$.each(o.btn,function () {
				var param = $.extend({//btn param
					className:null,//添加类名
					name:'确定',//默认按钮文字
					link:'#',//默认链接（按钮由a标签定义）
					returnFalse:true,//默认a事件返回false
					closePop: true,//默认点击按钮关闭弹出层
					callback:function (removePop){}//返回事件
				},this);
				var thisBtn = $('<a class="a-sopop-btn" href="'+param.link+'"><span class="s-sopop-btn">'+param.name+'</span></a>');
				if (param.className!==null) {thisBtn.addClass(param.className);}
				thisBtn.bind('click',function () {
					if (param.callback) {param.callback(removePop);}
					if (param.closePop) {removePop();}
					return (param.returnFalse)?false:true;
				});
				$popBtn.append(thisBtn);
				$popWrap.append($popBtn);
			});
		}
		$('body').append($popWrap);
		if (o.defaultShow){$popWrap.css('visibility','visible');}
		o.beforeCallback();
		$mask = $so.base.show($popWrap,o.callback(removePop));//显示弹出层，并设置$mask为背景层
		$ssClose.bind('click',function () {o.closeCallback();removePop();});
		if (o.maskClick) {$mask.bind('click',function () {removePop();});}//点击背景层关闭事件
		function removePop() {
			$so.base.hide($popWrap);
			if (o.popTarget!=null) {
				$(o.popTarget).appendTo('body').hide();
				if (!o.wrapTarget) {$popWrap = $('<div>');}
			}
			$popWrap.remove();
		}
	}
	/* $.sobox.alert */
	$.soPopAlert = $so.alert =  function (title,content,callback) {//快捷3个参数：标题、正文、点击确定返回事件
		$so.pop({
			className:'so-popAlert',title:title,width:360,content:content,
			btn:[{name:'确定',callback:function () {if (callback) {callback();}}}]
		});
	}
	/* $.sobox.confirm */
	$.soPopConfirm = $so.confirm =  function (title,content,successBack,cancelBack) {//快捷4个参数：标题、正文、点击确定返回事件、点击取消返回事件
		$so.pop({
			className:'so-popConfirm',
			title :title,width:360,content :content,
			btn:[{name:'确定',callback:function () {if (successBack) {successBack();}}},
				{name:'取消',className:'a-cancel',callback:function () {if (cancelBack) {cancelBack();}}}]
		});
	}

})(jQuery);