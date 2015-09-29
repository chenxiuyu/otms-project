/* sobox 2.0 */
!function(a,b){a.sobox={maskIndex:0,showMask:function(c){var d=this,e=a(".so-openmask"),f=a(b).height();return e.length?d.maskIndex++:(e=a('<div class="so-openmask"></div>'),a("body").append(e),d.maskIndex=1),e.height(c?f+20:0),e.css("z-index",1e3+10*d.maskIndex),e},show:function(b,c,d){var e=this,f=a(b.obj),g=e.showMask(c);return e.setPos(b),b.onlyOne&&a("body").data("soonlyone",!0),f.css("z-index",1002+10*e.maskIndex).fadeIn(),f.find(".s-close").bind("click",function(){e.hide(f)}),d&&d(),g},hide:function(b,c){var d=this,e=a(".so-openmask");a(b).fadeOut("fast",function(){a("select").show(),c&&c()}),d.maskIndex--,e.css("z-index",1e3+10*d.maskIndex),0==d.maskIndex&&e.remove(),a(b).find(".s-close").unbind("click")},drag:function(c,d){function g(a){null==a&&(a=window.event),e.css({opacity:"0.4",left:a.clientX-posX+"px",top:a.clientY-posY+"px"})}var e=a(c),f=a(d);f.mousedown(function(c){c||(c=window.event),posX=c.clientX-parseInt(e.css("left")),posY=c.clientY-parseInt(e.css("top")),a(b).mousemove(function(a){g(a)})}),a(b).mouseup(function(){a(b).unbind("mousemove"),e.css({opacity:"1"})})},setPos:function(c){var e,f,g,h,i,j,k,l,m,n;switch(c=a.extend({mode:"center",obj:null,pos:[0,0],offset:[0,0]},c),e=a(c.obj),f=Math.floor(e.height()/2),g=Math.floor(e.width()/2),h=a(window).scrollTop(),i=a(window).height(),j=c.pos[0],k=c.pos[1],l=c.offset[0],m=c.offset[1],e.css({position:"fixed"}),"undefined"==typeof b.body.style.maxHeight&&(n=e.find("select"),a("select").not(n).hide()),c.mode){case"win":e.css({left:j+l,top:k+m}),"undefined"==typeof b.body.style.maxHeight&&e.css({position:"absolute",top:h+k+m});break;case"doc":e.css({position:"absolute",left:j+l,top:k+m});break;case"tc":e.css({left:"50%",top:m,marginLeft:-g+l}),"undefined"==typeof b.body.style.maxHeight&&e.css({position:"absolute",top:h+m});break;case"bc":e.css({left:"50%",bottom:m,marginLeft:-g+l}),"undefined"==typeof b.body.style.maxHeight&&e.css({position:"absolute",top:h+m+i});break;default:e.css({top:"50%",left:"50%",marginTop:-f-10+m,marginLeft:-g+l}),"undefined"==typeof b.body.style.maxHeight&&e.css({position:"absolute",top:h+i/2})}},pop:function(b){function j(i){var j,l,m;b=a.extend(b,i||{}),b.showTitle?e.append(f):g.addClass("s-sopop-single-close"),e.append(g).append(h),b.height&&"iframe"!=b.type&&e.css("height",b.height+"px"),e.css({visibility:b.visibility?"visible":"hidden"}),"content"==b.type&&h.html(b.content),"target"==b.type&&(j=a(b.target).show(),h.append(j)),"iframe"==b.type&&(l=a('<iframe src="'+b.iframe+'" width="100%" height="'+b.height+'" frameborder="0" scrolling="auto"></iframe>'),h.html(l)),"ajax"==b.type&&h.load(b.ajax.url,b.ajax.data,function(){c.setPos({mode:b.posType,obj:e,pos:b.pos,offset:b.offset}),b.ajax.callback&&b.ajax.callback()}),b.btn.length>0&&(m=a('<p class="p-so-popBtn"></p>'),a.each(b.btn,function(){var b=a.extend({cls:null,text:"确定",link:"#",removePop:!0,callback:function(){}},this),c=a('<a class="a-sopop-btn" href="'+b.link+'"><span class="s-sopop-btn">'+b.text+"</span></a>");null!==b.cls&&c.addClass(b.cls),c.bind("click",function(){return b.callback&&b.callback(k),b.removePop&&k(),"#"===b.link?!1:!0}),m.append(c)}),e.append(m)),a("body").append(e),b.showTitle&&b.drag&&(f.addClass("h2-sopop-move"),c.drag(e,f)),b.beforePop(e,f,g,h),d=c.show({mode:b.posType,obj:e,pos:b.pos,offset:b.offset,onlyOne:b.onlyOne},b.showMask,b.onPop(k)),g.bind("click",function(){k()}),b.maskClick&&d.bind("click",function(){k()})}function k(d){b=a.extend(b,d||{}),c.hide(e),a("body").removeData("soonlyone"),null!=b.target&&a(b.target).appendTo("body").hide(),e.remove(),b.closePop()}var d,e,f,g,h,i,c=this;return b=a.extend({type:"content",target:null,content:null,iframe:null,ajax:{url:null,data:null,callback:function(){}},posType:"center",pos:[0,0],offset:[0,0],cls:null,width:400,height:null,defaultShow:!0,visibility:!0,title:"提示",showTitle:!0,showMask:!0,onlyOne:!1,drag:!0,maskClick:!0,btn:[],beforePop:function(){},onPop:function(){},closePop:function(){}},b||{}),e=a('<div class="so-popbox '+(b.cls?b.cls:"")+'" style="width:'+b.width+'px;display:none;"></div>'),f=a('<h2 class="h2-sopop"><span class="s-sopop-title">'+b.title+"</span></h2>"),g=a('<span class="s-sopop-close">[关闭]</span>'),h=a('<div class="so-popbox-cont"></div>'),i=a("body").data("soonlyone"),b.defaultShow&&!i&&j(),{wrap:e,opt:b,removePop:k,showPop:j}},alert:function(a,b,c){var d=this;d.pop({cls:"so-popAlert",title:a,width:360,content:b,btn:[{text:"确定",callback:function(){c&&c()}}]})},confirm:function(a,b,c,d){var e=this;e.pop({cls:"so-popConfirm",title:a,width:360,content:b,btn:[{text:"确定",callback:function(){c&&c()}},{text:"取消",cls:"a-sopop-cancel",callback:function(){d&&d()}}]})},tip:function(b){var d,c=this;b=a.extend({cls:"so-popTip",showTitle:!1,posType:"tc",showMask:!1,width:360,stayTime:5e3,offset:[0,12]},b||{}),d=c.pop(b),b.stayTime>0&&setTimeout(function(){d.removePop()},b.stayTime)},loading:function(b){var d,c=this;return b=a.extend({type:"content",cls:"so-loading",showTitle:!1,maskClick:!1,width:80,height:36,content:"",stayTime:0},b||{}),d=c.pop(b),b.stayTime>0&&setTimeout(function(){d.removePop()},b.stayTime),{open:d.showPop,close:d.removePop}}},a.fn.soIframePop=function(b){var c=a.extend({type:"iframe",targetTag:"href",splitString:"#soIframe?",width:800,height:480,showTitle:!1},b||{}),d=[];return this.each(function(){var g,h,b=a(this),e=b.attr(c.targetTag).split(c.splitString),f=e[0];par=e[1]?e[1].split("&"):"",g={},a.each(par,function(){var a=this.split("=");g[a[0]]=a[1]}),c=a.extend(c,g||{}),c.showTitle="true"==c.showTitle?1:+c.showTitle,c.iframe=f,c.defaultShow=!1,h=a.sobox.pop(c),d.push(h),b.click(function(){return h.showPop(),a(this).data("iframePop",h),!1})}),d},a.fn.soSidePop=function(b){var c=a(this),d=b.event||"click";return c.bind(d,function(c){var d=a.extend({showMask:!1,posType:"doc",pos:[c.pageX,c.pageY],offset:[10,10],onlyOne:!0,returnFalse:!0},b||{});return sidepop=a.sobox.pop(d),d.returnFalse?!1:void 0}),c},a.fn.soOverTip=function(b){var c=a(this),d=a.extend({cls:"so-overTip",showMask:!1,posType:"doc",offset:[10,10],showTitle:!1,onlyOne:!0},b||{}),e=null;return c.mouseenter(function(b){d.pos=[b.pageX,b.pageY],e=a.sobox.pop(d)}).mouseleave(function(){e.removePop()}),c}}(jQuery,document);
//email 标示符]
var checkEmail = false;
var emailFlag = false;
var emailPassword = false;
var emailRepassword = false;
var emailVerifyCode = false;
var checkEmailVerifyCode = false;
//mobile 标示符
var checkMobile = false;
var mobile = false;
var mobilePassword = false;
var mobileRepassword  = false;
var mobileVerifyCode1 = false; //用户手机接收到的6位验证码
var checkVerifyCode1 = false;  //验证成功与否标示符
var mobileVerifyCode = false;
//登录用户名 标示符
var checkUser = false;
//
var frozenNumber = "";
var frozenMobileFlag = true;
var frozenEmail="";
var frozenEmailFlag = true;
var wait=120;
var secs =5; 
(function($) {
    //点击发送手机验证码
    /**
     *检查登录用户名
     */
    function checkUserExists(userName){
    	var userExistsFlag = true;
    	var $label= $("#usererror");
        //var label=document.getElementById("usererror");
        var reg = /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/;
        var reg1 = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if(userName==""){
        	$label.text("用户名不能为空");
              $("#usererror").addClass("fsize12 close_red");
              $("#usericon").removeClass("icon-font icon-ttpodicon yes_green");
              $("#usericon").addClass("icon-font icon-guanbi fsize12 close_red");
              $("#userInput").removeClass("gbreen");
              $("#userInput").addClass("wred");
             userExistsFlag = false;
            return false;
        }else if(!reg.test(userName)&&(!reg1.test(userName))){
        	$label.text("不得含有特殊字符");
            $("#usererror").addClass("fsize12 close_red");
            $("#usericon").removeClass("icon-font icon-ttpodicon yes_green");
            $("#usericon").addClass("icon-font icon-guanbi fsize12 close_red");
            $("#userInput").removeClass("gbreen");
            $("#userInput").addClass("wred");
            userExistsFlag = false;
            return false;
        }else if(userName.length>25){
        	$label.text("用户名太长");
            $("#usererror").addClass("fsize12 close_red");
            $("#usericon").removeClass("icon-font icon-ttpodicon yes_green");
            $("#usericon").addClass("icon-font icon-guanbi fsize12 close_red");
            $("#userInput").removeClass("gbreen");
            $("#userInput").addClass("wred");
            userExistsFlag = false;
            return false;
        }else if(userName.length<5){
        	$label.text("用户名太短");
            $("#usererror").addClass("fsize12 close_red");
            $("#usericon").removeClass("icon-font icon-ttpodicon yes_green");
            $("#usericon").addClass("icon-font icon-guanbi fsize12 close_red");
            $("#userInput").removeClass("gbreen");
            $("#userInput").addClass("wred");
            userExistsFlag = false;
            return false;
        }else{
        	
        	var surl="checkUserNameExist.html";
        	  $.ajax({
                  url: surl,
                  type:"get",
                  dataType:"json",
                  async:false,
                  data:{"userName":userName,random:Math.random()},
                  error:function(XMLHttpRequest, textStatus, errorThrown){
                	  $label.text("检查异常，刷新页面");
                  	$("#usererror").addClass("fsize12 close_red");
                  	$("#usericon").removeClass("icon-font icon-ttpodicon yes_green");
                      $("#usericon").addClass("icon-font icon-guanbi fsize12 close_red");
                      $("#userInput").removeClass("gbreen");
                      $("#userInput").addClass("wred");
                      userExistsFlag = false;
                      return false;
                  },
                  success:function(data){
                      if(data.success){
                    	  $label.text("");
                        $("#usericon").removeClass("icon-font icon-guanbi fsize12 close_red");
                        $("#usericon").addClass("icon-font icon-ttpodicon yes_green");
                        $("#userInput").removeClass("wred");
                        $("#userInput").removeClass("gbreen");
                        userExistsFlag = true;
                          return true;
                      }else{
                    	  $label.text("该用户名/手机/邮箱已被注册！");
                          $("#usericon").removeClass("icon-font icon-ttpodicon yes_green");
                          $("#usericon").addClass("icon-font icon-guanbi fsize12 close_red");
                          $("#usererror").addClass("fsize12 close_red");
                          $("#userInput").removeClass("gbreen");
                          $("#userInput").addClass("wred");
                          userExistsFlag = false;
                          return false;
                      }
                  }

              });
        	  return userExistsFlag;
        }   
      return userExistsFlag;
    }





    /**
     *检查邮箱是否存在
     */
    function checkEmailExists(userName){
        checkEmail = false;
        if(frozenEmail != $.trim($("#emailInput").val())){
            frozenEmailFlag = true;
        }
        if(!frozenEmailFlag){
            checkEmail = false;
            return;
        }
        //
        $("#emailInput").removeClass("info_error");
        $("#emailErrorShow").html("");
        var surl="checkUserNameExist.html";
        if(userName==""){
            $("#emailInput").addClass("info_error");
            $("#emailErrorShow").html("请输入邮箱");
            checkEmail = false;
            return false;
        }
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if(!reg.test(userName)){
            $("#emailInput").addClass("info_error");
            $("#emailErrorShow").html("邮箱格式不正确");
            checkEmail = false;
            return false;
        }

        $.ajax({
            url: surl,
            type:"get",
            dataType:"json",
            data:{'userName':userName,random:Math.random()},
            async:false,
            error:function(XMLHttpRequest, textStatus, errorThrown){
                checkEmail = false;
            },
            success:function(data){
                if(data.success){
                    $("#emailInput").removeClass("info_error");
                    $("#emailErrorShow").html("");
                    //检查用户是否在黑名单中
                    checkUserInBlackList(userName).done(function (blackList){
                        if(!blackList.success){
                            $("#emailInput").addClass("info_error");
                            $("#emailErrorShow").show().html(blackList.message);
                            checkEmail = false;
                            return false;
                        }
                    });

                    checkEmail = true;
                    return true;
                }else{
                    //存在
                    $("#emailInput").addClass("info_error");
                    $("#emailErrorShow").show().html("邮箱已存在");
                    checkEmail = false;
                    return false;
                }
            }

        });
    }

    //验证验证码
    function validateUserVerifyCode(){
    	var verifyCodeFlag = true;
    	var $verifyCode = $.trim($("#validcode").val());
        //验证验证码
        if($.trim($("#validcode").val())==""){
        	$("#validicon").removeClass("icon-font icon-ttpodicon yes_green");
            $("#validicon").addClass("icon-font icon-guanbi fsize12 close_red");
            $("#validcode").removeClass("gbreen");
            $("#validcode").addClass("wred");
            verifyCodeFlag = false;
            return false;
        }else{
        	
            validateVerifyCode($verifyCode).done(function(result){
                if (result && result.success){
					$("#validicon").removeClass("icon-font icon-guanbi fsize12 close_red");
		            $("#validicon").addClass("icon-font icon-ttpodicon yes_green");
		            $("#validcode").removeClass("gbreen");
   		            $("#validcode").removeClass("wred");
		            verifyCodeFlag = true;
		            return true;
                }else{
                	$("#validicon").removeClass("icon-font icon-ttpodicon yes_green");
                	$("#validicon").addClass("icon-font icon-guanbi fsize12 close_red");
    				refreshEmailVerifyCode();
    				 $("#validcode").removeClass("gbreen");
    		         $("#validcode").addClass("wred");
    				verifyCodeFlag = false;
    				return false;
                }
            });
            return verifyCodeFlag;
        	

        }
        return verifyCodeFlag;
    }

    /**
     * ajax验证码
     */
    function validateVerifyCode(verifyCode) {
        return $.ajax({
            type: "get",
            dataType: "json",
            url: "checkVerifyCode.html",
            async: false,
            data: {'t':new Date().getTime(),'verifycode': verifyCode}
        }).fail(function(){
            mobileVerifyCode = false;
            emailVerifyCode = false; //标志位
           // $.sobox.alert("提示","请求错误，请刷新页面");;
        });
    }

    //手机--验证码
    function validateMobileVerifyCode(){
        mobileVerifyCode = false;
        var $verifyCode = $.trim($("#validMobilecode").val());
        //验证邮箱验证码
        if($.trim($("#validMobilecode").val())==""){
            $("#validMobilecode").addClass("info_error");
            $("#span_mobile_verifyCode").show().html("验证码不能为空");
            mobileVerifyCode = false;
            return;
        }else{
            validateVerifyCode($verifyCode).done(function(result){
                if (result && result.success){
                    $("#validMobilecode").removeClass("info_error");
                    $("#span_mobile_verifyCode").show().html("");
                    mobileVerifyCode = true;
                }else{
                    $("#validMobilecode").addClass("info_error");
                    $("#span_mobile_verifyCode").show().html("验证码错误");
                    refreshMobileVerifyCode();
                    mobileVerifyCode = false; //标志位
                }
            });

            return;
        }
    }

    //-------------------------------------------------------------------------------//


    //validate  password
    function validatePassword(){
    	
    	var $label= $("#passwderror");
        if($("#password").val()==""){
        	$label.text("密码不能为空");
            $("#passwderror").addClass("fsize12 close_red");
            $("#passwdicon").removeClass("icon-font icon-ttpodicon yes_green");
            $("#passwdicon").addClass("icon-font icon-guanbi fsize12 close_red");
            $("#password").removeClass("gbreen");
            $("#password").addClass("wred");
            return false;
        }else if($("#password").val().length<6||$("#password").val()!=$.trim($("#password").val())){
        	$label.text("密码不能少于6位且前后不能包含空格");
            $("#passwderror").addClass("fsize12 close_red");
            $("#passwdicon").removeClass("icon-font icon-ttpodicon yes_green");
            $("#passwdicon").addClass("icon-font icon-guanbi fsize12 close_red");
            $("#password").removeClass("gbreen");
            $("#password").addClass("wred");
            return false;
        }else if(($("#password").val().length) < 2){
        	$label.text("密码过于简单");
            $("#passwderror").addClass("fsize12 close_red");
            $("#passwdicon").removeClass("icon-font icon-ttpodicon yes_green");
            $("#passwdicon").addClass("icon-font icon-guanbi fsize12 close_red");
            $("#password").removeClass("gbreen");
            $("#password").addClass("wred");
            return false;
        }else{
        	var value = $("#password").val();
        	var level = pwdLevel(value);
            if (value.length >= 6) {
            	$(".wcode").show();
                var level = pwdLevel(value);
                switch (level) {
                    case 1:
                    	$("#nuo").removeClass().addClass("wcodeor");
                    	$("#zhong").removeClass("wcodeor");
                    	$("#qiang").removeClass("wcodeor");
                        //element.removeClass().addClass("strengthA");
                        break;
                    case 2:
                    	$("#nuo").removeClass("wcodeor");
                    	$("#zhong").removeClass().addClass("wcodeor");
                    	$("#qiang").removeClass("wcodeor");
                       // element.removeClass().addClass("strengthB");
                        break;
                    case 3:
                    	$("#nuo").removeClass("wcodeor");
                    	$("#zhong").removeClass("wcodeor");
                    	$("#qiang").removeClass().addClass("wcodeor");
                       // element.removeClass().addClass("strengthC");
                        break;
                    default:
                        break;
                }
            } else {
            	$(".wcode").hide();
            }
            $label.text("");
            $("#passwdicon").removeClass("icon-font icon-guanbi fsize12 close_red");
            $("#passwdicon").addClass("icon-font icon-ttpodicon yes_green");
            $("#password").removeClass("gbreen");
            $("#password").removeClass("wred");
            return true;
        }
    }

    //validate  repassword
    function validateRepassword(){
    	var $label= $("#repasswderror");
        if($.trim($("#repassword").val())==""){
        	$label.text("密码不匹配");
            $("#repasswderror").addClass("fsize12 close_red");
            $("#repasswdicon").removeClass("icon-font icon-ttpodicon yes_green");
            $("#repasswdicon").addClass("icon-font icon-guanbi fsize12 close_red");
            $("#repassword").removeClass("gbreen");
            $("#repassword").addClass("wred");
            return false;
        }else if($("#repassword").val()!=$("#password").val()){
        	$label.text("密码不匹配");
            $("#repasswderror").addClass("fsize12 close_red");
            $("#repasswdicon").removeClass("icon-font icon-ttpodicon yes_green");
            $("#repasswdicon").addClass("icon-font icon-guanbi fsize12 close_red");
            $("#repassword").removeClass("gbreen");
            $("#repassword").addClass("wred");
            return false;
        }else{
        	$label.text("");
//            label.innerText="";
            $("#repasswdicon").removeClass("icon-font icon-guanbi fsize12 close_red");
            $("#repasswdicon").addClass("icon-font icon-ttpodicon yes_green");
            $("#repassword").removeClass("gbreen");
            $("#repassword").removeClass("wred");
            return true;
        }
    }


    ////////////////////////////////////////
    //判断用户名不能为空
    $("#userInput").on("blur",function(){
        checkUserExists($.trim($(this).val()));
    });
    
    //用户获得焦点后信息
    $("#userInput").focus(function(){
    	var $label= $("#usererror");
    	$("#usererror").removeClass("icon-font icon-guanbi fsize12 close_red");
   	    $("#usericon").removeClass("icon-font icon-ttpodicon yes_green icon-guanbi fsize12 close_red");
   	    $("#userInput").addClass("gbreen");
   	    $("#userInput").removeClass("wred");
   	    $label.text("用户名支持5-25位字母数字下划线和汉字，可以是邮箱手机");
    	 
    });
    $("#password").focus(function(){
    	var $label= $("#passwderror");
    	$("#passwdicon").removeClass("icon-font icon-guanbi fsize12 close_red");
    	$("#passwdicon").removeClass("icon-font icon-ttpodicon yes_green");
    	$("#password").addClass("gbreen");
    	$("#password").removeClass("wred");
   	    $label.text("");  	 
    });
    $("#repassword").focus(function(){
    	var $label= $("#repasswderror");
    	$("#repasswdicon").removeClass("icon-font icon-guanbi fsize12 close_red");
    	$("#repasswdicon").removeClass("icon-font icon-ttpodicon yes_green");
    	$("#repassword").addClass("gbreen");
    	$("#repassword").removeClass("wred");
   	    $label.text("");  	 
    });
    $("#yourPhone").focus(function(){
    	var $label= $("#phonenull");
    	$("#phoneicon").removeClass("icon-font icon-ttpodicon yes_green");
    	$("#phoneicon").removeClass("icon-font icon-guanbi fsize12 close_red");
    	$("#yourPhone").addClass("gbreen");
    	$("#yourPhone").removeClass("wred");
   	    $label.text("");  	 
    });
    $("#verifycode").focus(function(){
    	var $label= $("#phoneVerifyCode");
    	$("#phoneVerifyIcon").removeClass("icon-font icon-ttpodicon yes_green");
    	$("#phoneVerifyIcon").removeClass("icon-font icon-guanbi fsize12 close_red");
    	$("#verifycode").addClass("gbreen");
    	$("#verifycode").removeClass("wred");
   	    $label.text("");  	 
    });
    $("#validcode").focus(function(){
    	$("#validicon").removeClass("icon-font icon-ttpodicon yes_green");
    	$("#validicon").removeClass("icon-font icon-guanbi fsize12 close_red");
    	$("#validcode").addClass("gbreen");
    	$("#validcode").removeClass("wred"); 
    });
    $("#yourPhone").on("blur",function(){
    	$("#yourPhone").removeClass("gbreen");
    	$("#yourPhone").removeClass("wred"); 
    });
    $("#verifycode").on("blur",function(){
    	$("#verifycode").removeClass("gbreen");
    	$("#verifycode").removeClass("wred"); 
    });
    //判断密码
    $("#password").on("blur",function(){
        validatePassword ();
    });
    //判断重复密码
    $("#repassword").on("blur",function(){
        validateRepassword();
    });
    //验证码
    $("#validcode").on("blur",function(){
        validateUserVerifyCode();
    });

    //普通用户注册验证手机是否存在
    function validPhoneExist(phone){
    	var $label= $("#phonenull");
     	var surl="checkUserNameExist.html";
    	var phoneflag =true;
  	  $.ajax({
            url: surl,
            type:"get",
            dataType:"json",
            async:false,
            data:{"userName":phone,random:Math.random()},
            error:function(XMLHttpRequest, textStatus, errorThrown){
            	$label.text("检查异常，刷新页面");
            	$("#phonenull").addClass("fsize12 close_red");
            	$("#phoneicon").removeClass("icon-font icon-ttpodicon yes_green");
                $("#phoneicon").addClass("icon-font icon-guanbi fsize12 close_red");
                $("#yourPhone").removeClass("gbreen");
                $("#yourPhone").addClass("wred");
                phoneflag = false;
                return false;
            },
            success:function(data){
                if(data.success){
                  $label.text("");
                  $("#phoneicon").removeClass("icon-font icon-guanbi fsize12 close_red");
                  $("#phoneicon").addClass("icon-font icon-ttpodicon yes_green");
                  $("#yourPhone").removeClass("gbreen");
                  $("#yourPhone").removeClass("wred");
                  phoneflag = true;
                    return true;
                }else{
                	 $label.text("该手机已被注册！");
                    $("#phoneicon").removeClass("icon-font icon-ttpodicon yes_green");
                    $("#phoneicon").addClass("icon-font icon-guanbi fsize12 close_red");
                    $("#phonenull").addClass("fsize12 close_red");
                    $("#yourPhone").removeClass("gbreen");
                    $("#yourPhone").addClass("wred");
                    phoneflag = false;
                    return false;
                }
            }
        });
  	  return phoneflag;
    }
    //第二步手机号码验证
    function secondValidPhone(){
    	var $label= $("#phonenull");
    	var phone = $("#yourPhone").val();
    	var reg = /^[1][34578]\d{9}$/;
    	if(phone==""){
            $("#phonenull").addClass("fsize12 close_red");
            $("#phoneicon").removeClass("icon-font icon-ttpodicon yes_green");
            $("#phoneicon").addClass("icon-font icon-guanbi fsize12 close_red"); 
            $("#yourPhone").removeClass("gbreen");
            $("#yourPhone").addClass("wred");
            return false;
    	}else if(!reg.test(phone)){
    		$label.text("手机输入错误，请重新输入");
            $("#phonenull").addClass("fsize12 close_red");
            $("#phoneicon").removeClass("icon-font icon-ttpodicon yes_green");
            $("#phoneicon").addClass("icon-font icon-guanbi fsize12 close_red"); 
            $("#yourPhone").removeClass("gbreen");
            $("#yourPhone").addClass("wred");
            return false;
    	}else if(!validPhoneExist(phone)){
    		return false;

    	}else{
    		$label.text("");
          $("#phoneicon").removeClass("icon-font icon-guanbi fsize12 close_red");
          $("#phoneicon").addClass("icon-font icon-ttpodicon yes_green");
          $("#yourPhone").removeClass("gbreen");
          $("#yourPhone").removeClass("wred");
          return true;
    	}
    }
    //第二步手机验证码验证
    function phoneVerifyCode(){
    	var $label= $("#phoneVerifyCode");
    	var phone = $("#verifycode").val();
    	if(phone==""){
    		$label.text("手机验证码不能为空");
    		//label.innerText="手机验证码不能为空";
            $("#phoneVerifyCode").addClass("fsize12 close_red");
            $("#phoneVerifyIcon").removeClass("icon-font icon-ttpodicon yes_green");
            $("#phoneVerifyIcon").addClass("icon-font icon-guanbi fsize12 close_red");
            $("#verifycode").removeClass("gbreen");
            $("#verifycode").addClass("wred");
            return false;
    	}else if(isNaN(phone)){
    		$label.text("验证码格式不正确");
    		//label.innerText="验证码格式不正确";
    		$("#phoneVerifyCode").addClass("fsize12 close_red");
            $("#phoneVerifyIcon").removeClass("icon-font icon-ttpodicon yes_green");
            $("#phoneVerifyIcon").addClass("icon-font icon-guanbi fsize12 close_red"); 
            $("#verifycode").removeClass("gbreen");
            $("#verifycode").addClass("wred");
            return false;
    	}
    	$label.text("");
    	//label.innerText="";
        $("#phoneVerifyIcon").removeClass("icon-font icon-guanbi fsize12 close_red");
        $("#phoneVerifyIcon").addClass("icon-font icon-ttpodicon yes_green");
        $("#verifycode").removeClass("gbreen");
        $("#verifycode").removeClass("wred");
    	return true;
    }
   


    $("#userSubmit").on("click",function(){

        var reg = /^[1][34578]\d{9}$/;
        var reg1 = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        //用户名

        var inputValue= $.trim($("#userInput").val());

        if(!checkUserExists($.trim($("#userInput").val()))){ //验证用户是否存在
            return false;
        }
        if(!validatePassword()){ //验证密码
            return false;
        }
        if(!validateRepassword()){//验证重复密码
            return false;
        }
        if(!validateUserVerifyCode()){//验证验证码
            return false;
        }
        //if()
        if (reg.test(inputValue)) {//手机登录
            $("#sourceType").val("pcmobile");
            $("#source").val("pcmobile");
            $(".send").hide();
            registStepOne().done(function(result){
                if(result.message){
                    if("1"==result.message){
                    	}else{
                    }
                }else{
                	$("#yourPhone").attr("readonly","readonly")//
                	$("#yourPhone").attr("disabled",false);
                    $("#zhuce").hide();
                    $("#yanzheng").show();
                    $("#yourPhone").val(inputValue);

                    // 120秒后重发短信 2015.6.4
                    waittime();
                }
            });
        }else if (reg1.test(inputValue)) {//邮箱登录
            $("#sourceType").val("email");
            $("#source").val("email");
            return two_step_email();
        }else{
        	$(".send").show();
        	$('input').removeAttr("readonly");
            $("#sourceType").val("username");//普通用户登录
            $("#source").val("username");
            $("#zhuce").hide();
            $("#yanzheng").show();
        }
        return;


    });


    //第二步提交
    $("#regist_submit_ok").on("click",function(){
    	//验证手机号
    	if(!secondValidPhone()){
    		return false;
    	}
    	//验证验证码格式
    	if(!phoneVerifyCode()){
    		return false;
    	}
    	//后台验证验证码是否正确
    	if(!checkMobileVerity){
    		return false;
    	}
    	
        return two_step();
    });
    //邮箱立即注册方法
      function two_step_email(){
    	  $("#submits").hide();
    	  $("#submitsIng").show();
	        $.post(
          "register",$("#shop_phone_login_form").serialize(),function(data){       	
              if(data.success){
                  window.location.href = "regsuccess.html";
                  return true;
              }else{
            	  $("#submits").show();
            	  $("#submitsIng").hide();
                  return false;
              }
          },"json"
      );
      }
     
    /**
     * 注册第二步
     */
    function two_step(){
    	var $label= $("#phoneVerifyCode");
    	checkMobileVerity($.trim($("#verifycode").val()),$("#yourPhone").val()).done(function(data){
    		if(!data.message){
		        $.post(
		                "register",$("#shop_phone_login_form").serialize(),function(data){
		                	
		                    if(data.success){
		                        window.location.href = "regsuccess.html";
		                        return true;
		                    }else{
		                        return false;
		                    }
		                },"json"
		            );
				}else{
					$label.text("验证码不正确");
			        $("#phoneVerifyCode").addClass("fsize12 close_red");
			        $("#phoneVerifyIcon").removeClass("icon-font icon-ttpodicon yes_green");
			        $("#phoneVerifyIcon").addClass("icon-font icon-guanbi fsize12 close_red");
			        $("#verifycode").removeClass("gbreen");
			        $("#verifycode").addClass("wred");
					return false;
				}
		});


    }
    ////////////////////////////////

    /**
     *点击验证的时候验证手机接收到的验证码
     *验证手机验证码
     */
    function confirmCode(){
        checkVerifyCode1 = false;
        if(frozenNumber == $("#phoneInput").val()){
            frozenMobileFlag = true;
        }
        if(!frozenMobileFlag){
            checkVerifyCode1 = false;
            $.sobox.alert("提示","此手机号已被锁定，请联系管理员");
        }else{
            $.ajax({
                type:"get",
                url:"checkMobileVerify.html",
                data:"mobileVerifyCode="+$("#mobileVerifyCode").val()+"&random="+Math.random(),
                success:function(data){
                    if(data.success){
                        $("#mobileVerifyCode").removeClass("info_error");
                        $("#mobileVerifyCodeError").html("");
                        checkVerifyCode1 = true;
                    }else{
                        $("#mobileVerifyCode").addClass("info_error");
                        $("#mobileVerifyCodeError").show().html(data.message!=null?data.message:"验证失败!");
                        checkVerifyCode1 = false;
                        return false;
                    }
                }
            });
        }

    }
    
})(jQuery);

function timeDown(obj, second) {
    if (second <= 0) {
        obj.end();
        return;
    }
    obj.begin(second);
    setTimeout(function () {timeDown(obj, second - 1)}, 1000);
}
/**刷新email验证码*/
function refreshEmailVerifyCode(){
    var imgSrc = $("#verifyCodeId");
    setTimeout(function(){
        imgSrc.prop("src",'getKaptcha3?'+new Date());
    },1);
}
/**刷新email验证码*/
function refreshMobileVerifyCode(){
    var imgSrc = $("#verifyMobileCodeId");
    setTimeout(function(){
        imgSrc.prop("src",'getKaptcha3?'+new Date());
    },1);
}

/**点击验证的时候验证手机接收到的验证码*/
function checkMobileVerity(verifyCode,mobile){
	var $label= $("#phoneVerifyCode");
	var mobileVerityFlag = true;
    return $.ajax({
            type:"get",
            url:"checkMobileVerify.html",
            data:"mobileVerifyCode="+verifyCode+"&mobile="+mobile+"&random="+Math.random()}
    ).fail(function(){
    	$label.text("手机验证码不能为空");
        $("#phoneVerifyCode").addClass("fsize12 close_red");
        $("#phoneVerifyIcon").removeClass("icon-font icon-ttpodicon yes_green");
        $("#phoneVerifyIcon").addClass("icon-font icon-guanbi fsize12 close_red");
        mobileVerityFlag = false;    
        return false;
        });
    return mobileVerityFlag;
}

/**
 * 判断
 * @returns
 */
function registStepOne(){
    return $.ajax({
        type:"get",
        url:"registerStepOne",
        data:$("#shop_phone_login_form").serialize()
    }).fail(function(){
        alert("检验用户失败请刷新页面！");
    });
}

/**检验用户是否存在于黑名单中*/
function checkUserInBlackList(userName){
    return $.ajax({
        type:"get",
        async:false,
        url:"checkUserInBlackList.html",
        data:"userName="+userName+"&random="+Math.random()
    }).fail(function(){
        alert("检查黑名单失败");
    });
}
/**发送短信验证码 */
$("#send").on("click",function(){
	var $label= $("#phonenull");
	var phone = $("#yourPhone").val();
	var reg = /^[1][34578]\d{9}$/;
	if(phone==""){
		$label.text("手机号码不能为空");
        $("#phonenull").addClass("fsize12 close_red");
        $("#phoneicon").removeClass("icon-font icon-ttpodicon yes_green");
        $("#phoneicon").addClass("icon-font icon-guanbi fsize12 close_red"); 
        return false;
	}else if(!reg.test(phone)){
		$label.text("手机输入错误，请重新输入");
        $("#phonenull").addClass("fsize12 close_red");
        $("#phoneicon").removeClass("icon-font icon-ttpodicon yes_green");
        $("#phoneicon").addClass("icon-font icon-guanbi fsize12 close_red"); 
        return false;
	}
     	var surl="checkUserNameExist.html";
    	var phoneflag =true;
  	  $.ajax({
            url: surl,
            type:"get",
            dataType:"json",
            async:false,
            data:{"userName":phone,random:Math.random()},
            error:function(XMLHttpRequest, textStatus, errorThrown){
            	$label.text("检查异常，刷新页面");
            	$("#phonenull").addClass("fsize12 close_red");
            	$("#phoneicon").removeClass("icon-font icon-ttpodicon yes_green");
                $("#phoneicon").addClass("icon-font icon-guanbi fsize12 close_red");
                phoneflag = false;
                return false;
            },
            success:function(data){
 
                if(data.success){
                	$label.text("");
             	    $("#phoneicon").removeClass("icon-font icon-guanbi fsize12 close_red");
             	    $("#phoneicon").addClass("icon-font icon-ttpodicon yes_green");
             	    //给后台手机号码赋值
             	    
             	    $("#mobile").val( $("#yourPhone").val());
             	    $(".send").hide();
             	    waittime();
               	 //发送短信
            		registStepOne().done(function(result){
            	    });
            	   
                }else{
                	$label.text("该手机已被注册！");
                    $("#phoneicon").removeClass("icon-font icon-ttpodicon yes_green");
                    $("#phoneicon").addClass("icon-font icon-guanbi fsize12 close_red");
                    $("#phonenull").addClass("fsize12 close_red");
                    phoneflag = false;
                    return false;
                }
            }
        });
 
});
function waittime(){
    if (this.wait == 0) {
        $(".send").show();
        $(".sendt").hide();
        this.wait = 120;
    } else {
        $(".sendt").show();
        wait--;
        $(".sendt").text(+wait+'秒后重新发送');
        setTimeout(function() {
            waittime();
        },1000)
    }
}
//五秒自动跳转
function countDown(){  
	var $label= $("#aotoSkip");
	 if(secs-->1){
		 $label.text(secs);
	     setTimeout("countDown()",1000);     
	     }     
	 else{
	    location.href=loginBaseUrl+"/login.html";
	     }     
	}     

   
   