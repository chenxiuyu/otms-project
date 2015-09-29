 $("#js_submit").click(function(){
	 var $label= $("#errorMessage");
	 
	 //var label=document.getElementById("errorMessage");
	 var userName = $("#shop_login_username").val();
	 var password = $("#shop_login_password").val();
	 var validcode = $("#verifycode").val();
	 if(userName ==""){
		 $label.text("请输入您的用户名！");
		 $("#erroricon").show();
		 return false;
	 }else{
		 $label.text("");
		 $("#erroricon").hide();
	 }
	 if(password ==""){
		 $label.text("请输入密码！");
		 $("#erroricon").show();
		 return false;
	 }else{
		 $label.text("");
		 $("#erroricon").hide();
	 }
	 if(password.length<6){
		 $label.text("用户密码不能少于6位！");
		 $("#erroricon").show();
		 return false;
	 }else{
		 $label.text("");
		 $("#erroricon").hide();
	 }
	 var ajaxUrl = memberDomain + "/ajaxDoLogin";
	 $.ajax({
		 type:"get",
		 url:ajaxUrl,
		 data:{'username':userName,'password':password,'validcode':validcode},
		 dataType: "jsonp",
		 success:function (result){
			 if(result.message!=null){
				 $label.text(result.message);
				 $("#erroricon").show();
				if (result.data["validSign"]=="true") {
						$("#verifyId").show();
						//$(".valcode_holder").attr("src","${domainUrlUtil.MEMBER_DOMAIN}/getKaptcha3?random="+Math.random());
				}
				 return false;
			 }else{
				 $label.text("");
				 $("#erroricon").hide();
				 var ajaxPop = $('body').data('ajaxPop');
					if (ajaxPop){
						ajaxPop.removePop();
						$('body').removeData('ajaxPop');
					}
/*				 $.sobox.alert("提示","您已登录成功");*/
				 setTimeout(function () { window.location.reload(); },1500);
			 }
			 //alert(result.message);
			 
				//$.sobox.alert("提示","您已登录成功");
				
				//var c = 'clientX:'+e.clientX+' , clientY:'+e.clientY;
				//$.sobox.alert('提示','我是sobox提示框<br />初始坐标是<span class="blue"> '+c+'</span><br />我的默认自定义class为<b class="red">"so-popAlert"</b>，<br />宽度<b class="orange">320px</b>，可以试着拖动我的标题...');
				//$.sobox.alert("提示","您已登录成功");
//				$.sobox.pop({
//					onlyOne:true,
//					content:"您已登录成功！",
//					maskClick:false,
//					closePop:function(){
//						window.location.reload();
//					},
//					btn:[
//					{
//						text:'确定',
//						removePop:true,
//						callback:function(){
//							window.location.reload();
//						}
//					}
//					]
//				});
			
				
				
		
			 }
	 });
 });
 
 //用户名获得焦点
 //密码获得焦点
 //用户名失去焦点
 //密码失去焦点