var ehaier = ehaier || {};
ehaier.domainUrl = ehaier.domainUrl || {}
ehaier.domainUrl.memberBaseDomain = ehaier.domainUrl.memberBaseDomain || "http://member.ehaier.com";

(function($) {
	/*
			登录表单
			注册表单
	 */
	$.extend({
		dologin : function(){
			var ajaxLoginUrl = "http://member.testehaier.com/ajaxLogin?callback=?";
			$.getJSON(ajaxLoginUrl, function(data){
				var ajaxPop = $.sobox.pop({
					cls:'ajax-popInfoBox',
					defaultShow : true,
					onlyOne : true,//防止重复调用，一次只显示一个
					title : '用户登录',
					content : data.data
				});
				ajaxPop.showPop();
				$('body').data('ajaxPop', ajaxPop);
			});
		}
	});
		
})(jQuery);


