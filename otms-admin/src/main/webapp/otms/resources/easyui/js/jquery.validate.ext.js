/*
 * Translated default messages for the jQuery validation plugin.
 * Locale: CN
 */
jQuery.extend(jQuery.validator.messages, {
        required: "必填字段",
		remote: "请修正该字段",
		email: "请输入正确格式的电子邮件",
		url: "请输入合法的网址",
		date: "请输入合法的日期",
		dateISO: "请输入合法的日期 (ISO).",
		number: "请输入合法的数字",
		digits: "只能输入整数",
		creditcard: "请输入合法的信用卡号",
		equalTo: "请再次输入相同的值",
		accept: "请输入拥有合法后缀名的字符串",
		maxlength: jQuery.validator.format("请输入一个长度最多是 {0} 的字符串"),
		minlength: jQuery.validator.format("请输入一个长度最少是 {0} 的字符串"),
		rangelength: jQuery.validator.format("请输入一个长度介于 {0} 和 {1} 之间的字符串"),
		range: jQuery.validator.format("请输入一个介于 {0} 和 {1} 之间的值"),
		max: jQuery.validator.format("请输入一个最大为 {0} 的值"),
		min: jQuery.validator.format("请输入一个最小为 {0} 的值")
});


/* 验证扩展 */
(function($) {

	$.extend($.fn.validatebox.defaults.rules, {   
	    integer: {   
	        validator: function(value,param){   
	        	var reg1 =  /^\d+$/; 
	        	return value.match(reg1) != null; 
	        },   
	        message: '请输入非负整数。'  
	    },
	    date: {   
	        validator: function(value,param){   
	        	var reg1 =  /^(?:19|20)[0-9][0-9]-(?:(?:0[1-9])|(?:1[0-2]))-(?:(?:[0-2][1-9])|(?:[1-3][0-1]))$/; 
	        	return value.match(reg1) != null; 
	        },   
	        message: '日期正确格式为：9999-01-01。'  
	    } ,
	    datetime: {   
	        validator: function(value,param){   
	        	var reg1 =  /^(?:19|20)[0-9][0-9]-(?:(?:0[1-9])|(?:1[0-2]))-(?:(?:[0-2][1-9])|(?:[1-3][0-1])) (?:(?:[0-2][0-3])|(?:[0-1][0-9])):[0-5][0-9]:[0-5][0-9]$/; 
	        	return value.match(reg1) != null; 
	        },   
	        message: '时间正确格式为：9999-01-01 00:00:00。'  
	    }     
	});  
	
})(jQuery);

//中文字两个字节
$.validator.addMethod("byteRangeLength", function(value, element, param) {
	var length = value.length;
	for(var i = 0; i < value.length; i++){
		if(value.charCodeAt(i) > 127){
			length++;
		}
	}
	return this.optional(element) || ( length >= param[0] && length <= param[1] );
}, "字符长度不符合要求(一个中文字算2个字符)");

//非负数
$.validator.addMethod("integer", function(value, element) {
	return this.optional(element) || /^\d+$/.test(value);
},"请输入非负整数。");

//颜色验证
$.validator.addMethod("color", function(value, element) {
	return this.optional(element) || /^\#[0-9a-fA-F]{6}$/.test(value);
},"格式如：#fff0000");

// 字符验证
$.validator.addMethod("baseChar", function(value, element) {
	return this.optional(element) || /^[\u0391-\uFFE5\w]+$/.test(value);
},"只能用中文、英文字母、数字和下划线");

// 手机号码验证
$.validator.addMethod("isMobile", function(value, element) {
	var length = value.length;
	return this.optional(element) || (length == 11 && /^((1)+\d{10})$/.test(value));
},"请填写正确的手机号码");

// 电话号码验证
$.validator.addMethod("isPhone", function(value, element) {
	var tel = /^(\d{3,4}-?)?\d{7,9}$/g;
	return this.optional(element) || (tel.test(value));
},"请填写正确的电话号码");

// 邮政编码验证
$.validator.addMethod("isZipCode", function(value, element) {
	var tel = /^[0-9]{6}$/;
	return this.optional(element) || (tel.test(value));
}, "请填写正确的邮政编码");

//身份证号码验证 
jQuery.validator.addMethod("isIdCardNo", function(value, element) { 
	var tel1 = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/;
	var tel2 = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{4}$/;
  return this.optional(element) || (tel1.test(value)) || (tel2.test(value));     
}, "请正确输入您的身份证号码"); 

//密码验证
jQuery.validator.addMethod("vPassWord",function(value,element){
	var tel = /^[a-zA-Z][^\u3400-\u9FFF]*$/;
	return this.optional(element) || (tel.test(value));
}, "密码不能输入中文");

function freeValite(opt) {//设置自由组验证 demo: opt = {classFirstName : 'txt-free',valiteAddCls : 'required'}
	$('input[class*="'+opt.classFirstName+'"]').blur(function () {
		var txtCls = $(this).attr('class').split('[')[1].split(']')[0];
		var needV = false;
		var $txtG = $('input[class*="['+txtCls+']"]');
		$txtG.each(function () {
			var valN = ($(this).val()=='')?false:true;
			needV = valN || needV;
		});
		if (needV) {
			$txtG.addClass(opt.valiteAddCls);
		}else {
			$txtG.removeClass(opt.valiteAddCls).removeClass('error');
			$txtG.each(function () {
				$(this).siblings('.error').hide();
			});
		}
	});
}
