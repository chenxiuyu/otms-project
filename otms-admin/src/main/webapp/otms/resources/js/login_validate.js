/*补完邮箱*/

jQuery(function($) {
	//回车登录
	document.onkeydown = function(e){ 
	    var ev = document.all ? window.event : e;
	    if(ev.keyCode==13) {
	    	if($("#logining").is(":hidden")){
	    		$('.js_mmjs_validation').submit();
	    	}
	     }
	}
	           
	var error_message = {
			'username_blank':'请输入登录名',
			'username_max_length':'邮箱不能多于60',
			'password_mix_length':'密码不能少于6位',
			'password_blank':'请输入密码',
			'password_contain_bank':'密码前后不能有空格',
			'validate_blank':'请输入验证码',
			'validate_equals':'验证码必须4位',
			'validate_error':'验证码错误',
			'validate_get_error':'获取验证码错误'
		};
		var showlogin = function(){
				$("#logining").hide();
				$(".js_submit").show();
			};
			
		var showlogining = function(){
				$("#logining").show();
				$(".js_submit").hide();
		};
		
		//隐藏登录中
		showlogin();
		var vlid =false;
//        $('#shop_login_username').bind("blur click",function(event){
        $('#shop_login_username').focus(function(){
            var shop_login_username = jQuery("#shop_login_username");
            $("#shop_login_username").removeClass("wred");
            $("#shop_login_username").addClass("gbreen");
            $("#userIcon").removeClass("gray");
            $("#userIcon").removeClass("Light_red");
            $("#userIcon").addClass("reseda");
            shop_login_username.parent().find(".validation_marked_info").html("&nbsp;");
        });

		$("#shop_login_username").blur(function(){
			var shop_login_username = jQuery("#shop_login_username");
			if(jQuery.trim(shop_login_username.val()).length == 0 ){
				//var email_regexp = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
				//var mobile_regexp = /^1[3|4|5|8][0-9]\d{4,8}$/;
				//if(!email_regexp.test($.trim(shop_login_username.val())) && !mobile_regexp.test($.trim(shop_login_username.val()))){
				//	shop_login_username.parent().find(".validation_marked_info").html(error_message.username_blank);
				//}else{
				//	shop_login_username.parent().find(".validation_marked_info").html("");
				//}
				shop_login_username.parent().find(".validation_marked_info").html(error_message.username_blank);
                $("#shop_login_username").removeClass("gbreen");
                $("#shop_login_username").addClass("wred");
                $("#userIcon").removeClass("gray");
                $("#userIcon").removeClass("reseda");
                $("#userIcon").addClass("Light_red");

			} else if(jQuery.trim(shop_login_username.val()).length >= 60) {
				shop_login_username.parent().find(".validation_marked_info").html(error_message.username_max_length);
                $("#shop_login_username").removeClass("gbreen");
                $("#shop_login_username").addClass("wred");
                $("#userIcon").removeClass("gray");
                $("#userIcon").removeClass("reseda");
                $("#userIcon").addClass("Light_red");
            }else{
				shop_login_username.parent().find(".validation_marked_info").html("&nbsp;");
                $("#shop_login_username").removeClass("wred");
                $("#shop_login_username").removeClass("gbreen");
                $("#userIcon").removeClass("reseda");
                $("#userIcon").removeClass("Light_red");
                $("#userIcon").addClass("gray");
			}
		});
        $("#shop_login_password").focus(function(){
            var shop_login_password = jQuery("#shop_login_password");
            shop_login_password.parent().find(".validation_marked_info").html("&nbsp;");
            $("#shop_login_password").removeClass("wred");
            $("#shop_login_password").addClass("gbreen");
            $("#passwordIcon").removeClass("gray");
            $("#passwordIcon").removeClass("Light_red");
            $("#passwordIcon").addClass("reseda");
        });
		$("#shop_login_password").blur(function(){
			var shop_login_password = jQuery("#shop_login_password");
			if(shop_login_password.val().length < 6){
                if(firstLoadFlg == false){
                    shop_login_password.parent().find(".validation_marked_info").html(error_message.password_mix_length);
                    $("#shop_login_password").removeClass("gbreen");
                    $("#shop_login_password").addClass("wred");
                    $("#passwordIcon").removeClass("gray");
                    $("#passwordIcon").removeClass("reseda");
                    $("#passwordIcon").addClass("Light_red");
                }
            }else if(shop_login_password.val() != $.trim(shop_login_password.val())){
				shop_login_password.parent().find(".validation_marked_info").html(error_message.password_contain_bank);
                $("#shop_login_password").removeClass("gbreen");
                $("#shop_login_password").addClass("wred");
                $("#passwordIcon").removeClass("gray");
                $("#passwordIcon").removeClass("reseda");
                $("#passwordIcon").addClass("Light_red");
            }else{
				shop_login_password.parent().find(".validation_marked_info").html("&nbsp;");
                $("#shop_login_password").removeClass("wred");
                $("#shop_login_password").removeClass("gbreen");
                $("#passwordIcon").removeClass("reseda");
                $("#passwordIcon").removeClass("Light_red");
                $("#passwordIcon").addClass("gray");
			}
		});

    $("#uc_login_authcode").focus(function(){
        $("#uc_login_authcode").removeClass("wred");
        $("#uc_login_authcode").addClass("gbreen");
    });

		if ($("#uc_login_authcode").length > 0 ) {
			$("#uc_login_authcode").blur(function(){
				var uc_login_authcode = jQuery("#uc_login_authcode");
				if($.trim(uc_login_authcode.val()).length <= 0){
					uc_login_authcode.parent().find(".validation_marked_info").html(error_message.validate_blank);
                    $("#uc_login_authcode").removeClass("gbreen");
                    $("#uc_login_authcode").addClass("wred");
					vlid = false;
					return false;
				}else{
					 $.get("getValidCode",{random:Math.random(),validcode:uc_login_authcode.val()},function(result){
					 	if(result.success){
				    		uc_login_authcode.parent().find(".validation_marked_info").html("&nbsp;");
                            $("#uc_login_authcode").removeClass("gbreen");
                            $("#uc_login_authcode").removeClass("wred");
                            vlid = true;
                            $('.js_submit').click(function(){
                               setTimeout(function(){
                                    $('.js_mmjs_validation').submit();
                                });
                            });
					    }else{
                            refreshVerifyCode();
					    	uc_login_authcode.parent().find(".validation_marked_info").html(error_message.validate_error);
                            $("#uc_login_authcode").removeClass("gbreen");
                            $("#uc_login_authcode").addClass("wred");
                            vlid = false;
					    }
				    	
				  	});
			   }
			});
		}
    function refreshVerifyCode(){
        setTimeout(function(){
            $("#verifyCodeId").attr("src","getKaptcha3?random="+Math.random());
        },1);
    }
		
		
		var userv =false;
		var passv = false;
		
		//form表单验证
		$('.js_submit').click(function(){
			setTimeout(function(){
				$('.js_mmjs_validation').submit();
			},0);
		});
		$('.js_mmjs_validation').submit( function(){
			//显示登录中
			showlogining();
			var shop_login_username = jQuery("#shop_login_username");
			if(jQuery.trim(shop_login_username.val()).length > 0 ){
				shop_login_username.parent().find(".validation_marked_info").html("&nbsp;");
				userv = true;
			} else {
				shop_login_username.parent().find(".validation_marked_info").html(error_message.username_blank);
				showlogin();
				userv = false;
			}
					
			var shop_login_password = jQuery("#shop_login_password");
			if($.trim(shop_login_password.val()).length < 6){
				shop_login_password.parent().find(".validation_marked_info").html(error_message.password_mix_length);
				showlogin();
				passv = false;
			}else if(shop_login_password.val() != $.trim(shop_login_password.val())){
				shop_login_password.parent().find(".validation_marked_info").html(error_message.password_contain_bank);
				showlogin();
				passv = false;
			}else if($.trim(shop_login_password.val()).length > 32){
				shop_login_password.parent().find(".validation_marked_info").html(error_message.password_contain_bank);
				showlogin();
				passv = false;
			}else{
				passv = true;
			}

			var uc_login_authcode = jQuery("#uc_login_authcode");
			//判断元素存在
			if ( uc_login_authcode.length > 0 ) {
				if($.trim(uc_login_authcode.val()).length <= 0){
					uc_login_authcode.parent().find(".validation_marked_info").html(error_message.validate_blank);
					showlogin();
					vlid = false;
					return false;
				}
				/*
				else if($.trim(uc_login_authcode.val()).length != 4){
					uc_login_authcode.parent().find(".validation_marked_info").html(error_message.validate_equals);
					showlogin();
					vlid = false;
					return false;
				}
				*/
			}else{
				vlid = true;
			}
			
			//异步验证
			if(!(vlid&&userv&&passv)){
				showlogin();
			}
			return vlid&&userv&&passv;
	        
			});
		
		
		
		//验证码改变
		$("#changValidate").click(function(){
			setTimeout(function(){
				$("#verifyCodeId").attr("src","getKaptcha3?random="+Math.random());
			},1);
		});
});


