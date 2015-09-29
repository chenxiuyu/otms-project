(function($) { 
	var vlid =false;
	var phonevlid =false;
	var existMobile = null;
	var existEmail = null;
	var blackMobile = null;
	var blackEmail = null;
	
	var error_message = {
			'username_or_mobile_bank':'邮箱或手机必须选一个',
			'username_exist':'您的邮箱已注册！',
			'mobile_validate_bank':'请输入手机验证码',
			'mobile_validate_equals':'请输入6位手机验证码',
			'mobile_validate_error':'手机验证码错误',
			'username_validate_error':'邮箱格式错误',
			'mobile_error':'请输入正确的手机号',
			'mobile_bank':'请输入手机号',
			'mobile_exist':'您的手机已注册！',
			'mobile_get_validate_error':'取手机验证码错误',
			'password_contain_bank':'密码不能有空格',
			'password_bank':'请输入密码',
			'password_mix':'密码不能少于6位',
			'password_no_equals':'两次密码不一致',
			'password_simple':'密码过于简单',
			'repassword_bank':'请输入确认密码',
			'validate_bank':'请输入验证码',
			'validate_error':'验证码错误',
			'validate_equals':'请输入4位手机验证码',
			'validate_get_error':'取验证码错误',
			'black':'此用户已被锁定，请联系管理员'
			
		};
   
	//提交表单
	$(".js_submit").click(function(){
		$('.js_mmjs_validation').submit();
	});
	
	//邮箱失去焦点
	$("#shop_login_username").blur(function(){
		usernameBlur();
	});
	//手机号码失去焦点
	$("#mobile").blur(function(){
		mobileBlur();
	});
	//手机验证码
	$("#mobileValid").blur(function(){
		mobileValidFunction();
	});
	//登录密码失去焦点
	$("#password").blur(function(){
		passwordBlur();
	});
	//登录密码
	$("#password").keyup(function(){
		pwdStrength($("#password"),$("#mobileStrengthPic"));
	});
	/*
	//确认密码失去焦点
	$("#repassword").blur(function(){
		repasswordBlur();
	});
	*/
	 //验证码失去焦点
    $("#validcode").blur(function(){
    	checkValid();
    });

    function checkValid(){
    	if($("#validcode").val().length <= 0 ){
	 		$("#validcode").parent().find(".validation_marked_info").show().html(error_message.validate_bank);
			$("#validcode").addClass("info_error");
			vlid = false;
			return false;
	 };
	 $.get("getValidCode",{random:Math.random(),validcode:$("#validcode").val()},function(result){
		 	if(result.message){
		 		$("#validcode").parent().find(".validation_marked_info").show().html(result.message);
		    	$("#validcode").addClass("info_error");
		    	$("#verifyCodeId").attr("src","getKaptcha3?random="+Math.random());
		    	vlid = false;
		    }else{
		    	$("#validcode").parent().find(".validation_marked_info").show().html("");
	    		$("#validcode").removeClass("info_error");
	    		vlid = true;
		    }
	    	
	  	});
    }
	
	//提交前验证
	var MYvalidate2 = function(){
		var result = true;
		
		//email phone需要验证
		var mobile_regexp = /^[1][34578]\d{9}$/;
		var email_regexp =  /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
        if($.trim($("#shop_login_username").val()).length == 0 && $.trim($("#mobile").val()).length == 0 ){
        	$("#two_err_info").show().text(error_message.username_or_mobile_bank);
        	$("#shop_login_username").addClass("info_error");
        	$("#mobileinfo").show().text(error_message.mobile_bank);
        	$("#mobile").addClass("info_error");
        	result =  false;
        }else{
        	if($.trim($("#mobile").val()).length > 0 && !mobile_regexp.test($.trim($("#mobile").val()))){
            	$("#mobileinfo").show().text(error_message.mobile_error);
            	$("#mobile").addClass("info_error");
    			result = false;
        	}else{
        		$("#mobileinfo").show().text(' ');
            	$("#mobile").removeClass("info_error");
        	}
        	
        	if($.trim($("#shop_login_username").val()).length > 0 && !email_regexp.test($.trim($("#shop_login_username").val()))){
        		$("#two_err_info").show().text(error_message.username_validate_error);
            	$("#shop_login_username").addClass("info_error");
    			result = false;
        	}else{
        		$("#two_err_info").show().text(' ');
        		$("#shop_login_username").removeClass("info_error");
        		result = true;
        	}
        }
        //判断手机是否存在
  		if(isMobileExist()){
  			clearTime();
  			result = false;
  		}
  		//判断邮箱存在
  		if(isEmailExist()){
  			result = false;
  		}
  		if(isMobileBlank()){
  			result = false;
  		}
  		if(isEmailBlank()){
  			result = false;
  		}
  		/*
        if(!mobileValidFunction()){
        	result = false;
        }
        */
        if(!passwordBlur()){
        	result = false;
        }
		return result;
	};
	//提交前验证
	var MYvalidate = function(){
		var result = true;
		
		//email phone需要验证
		var mobile_regexp = /^[1][34578]\d{9}$/;
		var email_regexp =  /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
        if($.trim($("#shop_login_username").val()).length == 0 && $.trim($("#mobile").val()).length == 0 ){
        	$("#two_err_info").show().text(error_message.username_or_mobile_bank);
        	$("#shop_login_username").addClass("info_error");
        	$("#mobileinfo").show().text(error_message.mobile_bank);
        	$("#mobile").addClass("info_error");
        	result =  false;
        }else{
        	if($.trim($("#mobile").val()).length > 0 && !mobile_regexp.test($.trim($("#mobile").val()))){
            	$("#mobileinfo").show().text(error_message.mobile_error);
            	$("#mobile").addClass("info_error");
    			result = false;
        	}else{
        		$("#mobileinfo").show().text(' ');
            	$("#mobile").removeClass("info_error");
        	}
        	
        	if($.trim($("#shop_login_username").val()).length > 0 && !email_regexp.test($.trim($("#shop_login_username").val()))){
        		$("#two_err_info").show().text(error_message.username_validate_error);
            	$("#shop_login_username").addClass("info_error");
    			result = false;
        	}else{
        		$("#two_err_info").show().text(' ');
        		$("#shop_login_username").removeClass("info_error");
        		result = true;
        	}
        }
        //判断手机是否存在
  		if(isMobileExist()){
  			clearTime();
  			result = false;
  		}
  		//判断邮箱存在
  		if(isEmailExist()){
  			result = false;
  		}
  		if(isMobileBlank()){
  			result = false;
  		}
  		if(isEmailBlank()){
  			result = false;
  		}
  		/*
        if(!mobileValidFunction()){
        	result = false;
        }
        */
        if(!passwordBlur()){
        	result = false;
        }
        /*
        if(!repasswordBlur()){
        	result = false;
        }
        */
        !checkValid();
        if(!vlid)result = false;
		return result;
	};
	//邮箱失去焦点
	var usernameBlur = function(){
		//email phone需要验证
		var email_regexp =  /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
        if($.trim($("#shop_login_username").val()).length == 0 && $.trim($("#mobile").val()).length == 0 ){
        	$("#two_err_info").show().text(error_message.username_or_mobile_bank);
        	$("#shop_login_username").addClass("info_error");
        	$("#mobileinfo").show().text(error_message.mobile_bank);
        	$("#mobile").addClass("info_error");
        	return false;
        }else{
        	$("#two_err_info").show().text(' ');
        	$("#shop_login_username").removeClass("info_error");
        	$("#mobileinfo").show().text(' ');
        	$("#mobile").removeClass("info_error");
        }
        
        var emailResult = true;
        if($.trim($("#shop_login_username").val()).length > 0){
	    	if(!email_regexp.test($.trim($("#shop_login_username").val()))){
	    		$("#two_err_info").show().text(error_message.username_validate_error);
	        	$("#shop_login_username").addClass("info_error");
	    		emailResult = false;
	    	} else {
	    		isSyncEmailExist();
	    	}
        } else {
        	existEmail = null;
        	blackEmail = null;
        }
        var mobileResult = true;
        if($.trim($("#mobile").val()).length > 0){
        	var mobile_regexp = /^[1][34578]\d{9}$/;
	        if(!mobile_regexp.test($.trim($("#mobile").val()))){
	        	$("#mobileinfo").show().text(error_message.mobile_error);
	        	$("#mobile").addClass("info_error");
	        	mobileResult = false;
	    	} else {
	    		isSyncMobileExist();
	    	}
        } else {
        	$("#mobileValid").removeClass("info_error");
	        $("#mobile_vlid_error").show().text(" ");
	        existMobile = null;
	        blackMobile = null;
        }
        return emailResult && mobileResult;
	};
	//手机号码失去焦点
	var mobileBlur = usernameBlur;
	//登录密码失去焦点
	var passwordBlur = function(){
		if($("#password").val()!=$.trim($("#password").val())){
        	$("#forget_username_span").show().text(error_message.password_contain_bank);
			$("#password").addClass("info_error");
			return false;
		}
		if($.trim($("#password").val()).length ==0){
			$("#forget_username_span").show().text(error_message.password_bank);
			$("#password").addClass("info_error");
			return false;
		}else if($.trim($("#password").val()).length < 6){
			$("#forget_username_span").show().text(error_message.password_mix);
			$("#password").addClass("info_error");
			return false;
		}else if(pwdLevel($("#password").val()) < 1){
			$("#forget_username_span").show().text(error_message.password_simple);
			$("#password").addClass("info_error");
			return false;
		}else{
			$("#forget_username_span").show().text(' ');
			$("#password").removeClass("info_error");
			return true;
		}
	};
	//确认密码失去焦点
	var repasswordBlur = function(){
		if($("#repassword").val() != $("#password").val() ){
			$("#repassword_username_span").show().text(error_message.password_no_equals);
			$("#repassword").addClass("info_error");
			return false;
		}
		if($("#repassword").val()!=$.trim($("#repassword").val())){
        	$("#repassword_username_span").show().text(error_message.password_contain_bank);
			$("#repassword").addClass("info_error");
			return false;
		}
		if($.trim($("#repassword").val()).length ==0){
			$("#repassword_username_span").show().text(error_message.repassword_bank);
			$("#repassword").addClass("info_error");
			return false;
		}else{
			if($("#repassword").val().length != $.trim($("#password").val()).length ){
				$("#repassword_username_span").show().text(error_message.password_no_equals);
				$("#repassword").addClass("info_error");
				return false;
			}else{
				$("#repassword_username_span").show().text(' ');
				$("#repassword").removeClass("info_error");
				return true;
			}
		}
	};
	//验证码失去焦点
	var validcodeBlur = function(){
		  if(!vlid){
		  		if($("#validcode").val().length <= 0){
		  			$("#span_verifyCode").show().text(error_message.validate_bank);
					$("#validcode").addClass("info_error");
		  		}else{
		  			$("#span_verifyCode").show().text(error_message.validate_error);
					$("#validcode").addClass("info_error");
					$("#verifyCodeId").attr("src","getKaptcha3?random="+Math.random());
				}
				return false;
		  }
	};
	
    $('.js_mmjs_validation').submit( function(){
      if (MYvalidate2()){
    	//判断手机是否存在
  		if(isMobileExist()){
  			clearTime();
  			return false;
  		}
  		//判断邮箱存在
  		if(isEmailExist()){
  			return false;
  		}
  		
  		if (isMobileBlank()) {
  			return false;
  		}
  		
  		if (isEmailBlank()) {
  			return false;
  		}

		if($.trim($("#mobileValid").val()).length > 0){
			//检查手机号码长度
			if($.trim($("#mobileValid").val()).length != 6){
				$("#mobile_vlid_error").show().text(error_message.mobile_validate_equals);
				$("#mobile_vlid_error").addClass("info_error");
					return false;
			}
			if(!phonevlid){
			 	mobileValidFunction();
			}
			if($.trim($("#mobileValid").val()).length > 0 && !phonevlid){
				$("#mobile_vlid_error").show().text(error_message.validate_error);
				$("#mobile_vlid_error").addClass("info_error");
				$("#verifyCodeId").attr("src","getKaptcha3?random="+Math.random());
				return false;
			}
		}
  
		  return true;
      }else{
    	  return false;
      }
    });
  
 // 提交注册step1
	$('#regist_submit_ok').off("click").on("click", function(event) {
		 if (MYvalidate()){
			 registStepOne().done(function(result){
					if(result.message){
						if("1"==result.message){
							window.location.href = "index.html";
						}else{
							$.sobox.alert("提示",result.message);
						}
					}else{
						$("#two_mobile").html($("#mobile").val());
						$(".regist_smscfm_login").show();
						$(".step1").hide();
						$("#verifyCodeId").attr("src","getKaptcha3?random="+Math.random());
					}
				});
		 }
		 return false;
	});

	
	   /**
	    * 判断
	    * @returns
	    */
	   function registStepOne(){
	  		return $.ajax({
	  			type:"get",
	 			url:"dobindOtherStepOne.html",
	 			data:$(".js_mmjs_validation").serialize()
	 			}).fail(function(){
						$.sobox.alert("提示","检验用户失败请刷新页面！");
				});
	  }
    //点击“验证”文字验证
//	$(".js_verify_mobile").click(function(){
//		mobileValidFunction();
//		}
//	);
	//关闭窗口
	$("#two_close").click(function(){
		$(".regist_smscfm_login").hide();
		$(".step1").show();
		$("#two_mobile").html("");
		$("#mobile_vlid_error").show().text("");
		$("#mobile_vlid_error").removeClass("info_error");
	});
	//手机验证
	var mobileValidFunction = function(){
		if($.trim($("#mobile").val()).length == 0 ){
			return true;
		}
		var uc_login_authcode = $("#mobileValid");
		var mobile_regexp = /^[1][34578]\d{9}$/;
		if(!mobile_regexp.test($.trim($("#mobile").val()))){
			$("#mobile").parent().find(".validation_marked_info").show().html(error_message.mobile_error);
			$("#mobile").addClass("info_error");
			phonevlid = false;
			return false;
		}
		
		if(uc_login_authcode.val().length <= 0){
			uc_login_authcode.parent().find(".validation_marked_info").show().html(error_message.validate_bank);
			uc_login_authcode.addClass("info_error");
			phonevlid = false;
			return false;
		}
		if($("#mobileValid").val().length > 0 && $("#mobile").val().length > 0){
			if(uc_login_authcode.val().length <= 0){
				uc_login_authcode.parent().find(".validation_marked_info").show().html(error_message.mobile_validate_bank);
				uc_login_authcode.addClass("info_error");
				phonevlid = false;
				return false;
			}else if(uc_login_authcode.val().length != 6){
				uc_login_authcode.parent().find(".validation_marked_info").show().html(error_message.mobile_validate_equals);
				uc_login_authcode.addClass("info_error");
				phonevlid = false;
				return false;
			}else{
				var temp = true;
	    		//判断是否存在
	    		if(isMobileExist()){
	          		clearTime();
	          		temp =  false;
	    		}else{
	    			$.get("getPhoneValidCode",{random:Math.random(),"mobile":$("#mobile").val()},function(result){
					 	if(result.success){
					    	if(result.data==uc_login_authcode.val()){
					    		uc_login_authcode.removeClass("info_error");
					    		uc_login_authcode.parent().find(".validation_marked_info").show().html("");
					    		phonevlid = true;
					    		temp =  true;
					    	}else{
					    		uc_login_authcode.parent().find(".validation_marked_info").show().html(error_message.mobile_validate_error);
					    		uc_login_authcode.addClass("info_error");
					    		phonevlid = false;
					    		temp =  false;
					    	}
					    }else{
					    	uc_login_authcode.parent().find(".validation_marked_info").show().html(result.message);
					    	uc_login_authcode.addClass("info_error");
					    	phonevlid = false;
					    	temp =  false;
					    }
				    	
				  	});
	    		}
				 
			  return temp;
		   }
	    }
	};

  	//判断手机是否存在
  	var isMobileExist = function(){
		
			if(existMobile != null){
				$("#mobileinfo").show().text(error_message.mobile_exist);
				$("#mobile").addClass("info_error");
				
				//清空手机验证码错误信息
				$("#mobileValid").removeClass("info_error");
	          	$("#mobile_vlid_error").show().text(" ");
	          	
				return true;
			}
		
		return false;
	}
  	 //判断邮箱黑名单
  	var isMobileBlank = function(){
		if(blackMobile != null){
			$("#mobileinfo").show().text(error_message.black);
			$("#mobile").addClass("info_error");
			
			//清空手机验证码错误信息
			$("#mobileValid").removeClass("info_error");
          	$("#mobile_vlid_error").show().text(" ");
          	
			return true;
		}
		return false;
	}
  	
  //判断邮箱是否存在
  	var isEmailExist = function(){
		if(existEmail != null){
			$("#shop_login_username").addClass("info_error");
			$("#two_err_info").show().text(error_message.username_exist);
			return true;
		}
		return false;
	}
  	 //判断邮箱黑名单
  	var isEmailBlank = function(){
		if(blackEmail != null){
			$("#shop_login_username").addClass("info_error");
			$("#two_err_info").show().text(error_message.black);
			return true;
		}
		return false;
	}
  	
  	//异步验证邮箱存在
  	var isSyncEmailExist = function(){
  		$.get("isExistEmail",
  				{random:Math.random(),"email":$("#shop_login_username").val()},
  				function(result){
		  			if(result.data == "1"){
		  				existEmail = $("#shop_login_username").val();
	  					$("#shop_login_username").addClass("info_error");
	  					$("#two_err_info").show().text(error_message.username_exist);
		  			}else{
		  				//检查用户是否在黑名单中
		  				existEmail = null;
				      	checkUserInBlackList($("#shop_login_username").val()).done(function (blackList){
					      	 if(!blackList.success){
					      		blackEmail = 1;
					      		$("#shop_login_username").addClass("info_error");
			  					$("#two_err_info").show().text(blackList.message);
					      	 } else {
					      		blackEmail = null;
				  				$("#shop_login_username").removeClass("info_error");
			  					$("#two_err_info").show().text(' ');
					      	 }
	  			      	 });	
		  			}
	  	});
  	}
  	//异步验证手机存在
  	var isSyncMobileExist = function(){
  		$.get("isExistMobile",
  				{random:Math.random(),"mobile":$("#mobile").val()},
  				function(result){
		  			if(result.data == "1"){
		  				existMobile = $("#mobile").val();
	  					$("#mobileinfo").show().text(error_message.mobile_exist);
	  					$("#mobile").addClass("info_error");
	  					
	  					//清空手机验证码错误信息
	  					$("#mobileValid").removeClass("info_error");
	  		          	$("#mobile_vlid_error").show().text(" ");
		  			}else{
		  				existMobile = null;		  		
				      	checkUserInBlackList($("#mobile").val()).done(function (blackList){
					      	 if(!blackList.success){
					      		blackMobile = 1;
			  					$("#mobileinfo").show().text(blackList.message);
			  					$("#mobile").addClass("info_error");
					      	 } else {
					      		blackMobile = null;
					      		$("#mobileinfo").show().text(' ');
			  					$("#mobile").removeClass("info_error");
					      	 }
	  			      	 });
		  			}
	  	});
  	}

	//倒计时显示验证码
    $(".js_send_verify").click(function () {
    	var mobile_regexp = /^[1][34578]\d{9}$/;
    	if($.trim($('#mobile').val()).length <= 0){
    		$("#mobileinfo").show().text("手机号不能为空");
          	$("#mobile").addClass("info_error");
    		return false;
    	}else if(!mobile_regexp.test($.trim($("#mobile").val()))){
			$("#mobileinfo").show().text(error_message.mobile_error);
          	$("#mobile").addClass("info_error");
			return false;
		}else{
			$("#mobile").removeClass("info_error");
    		$("#mobileinfo").text(" ");
    	}
    	//发送短信验证
		$.get("sendMobileSmsVerify.html",{"mobile":$('#mobile').val()}, function(result){
	     	if(result.success){
	     		var _self = $(".js_send_verify");
		        var v = _self.text();
		        var verifyText = $(".js_verify_time");
		
		        _self.hide();
		        //$(".js_show_verify").show();
		        verifyText.show();
		        
		        timeDown({
		          begin: function(second) {
		            //_self.text(second + "秒后重新发送").attr("disabled", true);
		            verifyText.text(second + "秒后重新发送");
		          },
		          end: function () {
		            //_self.text(v).attr("disabled", false);
		            verifyText.hide();
		            _self.show();
		          }
		        },60);
	     	}else{
	     		$("#mobileinfo").show().text(result.message);
          		$("#mobile").addClass("info_error");
	     		//已注册的手机号保存
	     		if(result.message==error_message.mobile_exist){
	     			existMobile = result.message;
	     		}else{
	     			existMobile = null;
	     		}
	     	}
		});
  
        
          
          
      });

    
    //刷新验证码
    $("#js_reflash_verifycode").click(function(){
    	$("#verifyCodeId").attr("src","getKaptcha3?random="+Math.random());
    });
    
    //清除后台错误
    $("#shop_login_username").blur(function(){
         $("#bandError").html(" ");
    });
    $("#mobile").blur(function(){
    	$("#bandError").html(" ");
    });

  })(jQuery);

var outId;
function timeDown(obj, second) {
      if (second <= 0) {
        obj.end();
        return;
      }
      obj.begin(second);
      outId = setTimeout(function () {timeDown(obj, second - 1)}, 1000);
}

function clearTime(){
	var _self = $(".js_send_verify");
	var verifyText = $(".js_verify_time");
	verifyText.show();
	verifyText.hide();
	_self.show();
	window.clearTimeout(outId);       
}

/**检验用户是否存在于黑名单中*/
function checkUserInBlackList(userName){
		return $.ajax({
			type:"get",
	   	url:"checkUserInBlackList.html",
	   	data:"userName="+userName
	}).fail(function(){
		//$.sobox.alert("提示","检验用户失败请刷新页面！");
		});
}