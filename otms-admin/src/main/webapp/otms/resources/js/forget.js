/* sobox 2.0 */
!function(a,b){a.sobox={maskIndex:0,showMask:function(c){var d=this,e=a(".so-openmask"),f=a(b).height();return e.length?d.maskIndex++:(e=a('<div class="so-openmask"></div>'),a("body").append(e),d.maskIndex=1),e.height(c?f+20:0),e.css("z-index",1e3+10*d.maskIndex),e},show:function(b,c,d){var e=this,f=a(b.obj),g=e.showMask(c);return e.setPos(b),b.onlyOne&&a("body").data("soonlyone",!0),f.css("z-index",1002+10*e.maskIndex).fadeIn(),f.find(".s-close").bind("click",function(){e.hide(f)}),d&&d(),g},hide:function(b,c){var d=this,e=a(".so-openmask");a(b).fadeOut("fast",function(){a("select").show(),c&&c()}),d.maskIndex--,e.css("z-index",1e3+10*d.maskIndex),0==d.maskIndex&&e.remove(),a(b).find(".s-close").unbind("click")},drag:function(c,d){function g(a){null==a&&(a=window.event),e.css({opacity:"0.4",left:a.clientX-posX+"px",top:a.clientY-posY+"px"})}var e=a(c),f=a(d);f.mousedown(function(c){c||(c=window.event),posX=c.clientX-parseInt(e.css("left")),posY=c.clientY-parseInt(e.css("top")),a(b).mousemove(function(a){g(a)})}),a(b).mouseup(function(){a(b).unbind("mousemove"),e.css({opacity:"1"})})},setPos:function(c){var e,f,g,h,i,j,k,l,m,n;switch(c=a.extend({mode:"center",obj:null,pos:[0,0],offset:[0,0]},c),e=a(c.obj),f=Math.floor(e.height()/2),g=Math.floor(e.width()/2),h=a(window).scrollTop(),i=a(window).height(),j=c.pos[0],k=c.pos[1],l=c.offset[0],m=c.offset[1],e.css({position:"fixed"}),"undefined"==typeof b.body.style.maxHeight&&(n=e.find("select"),a("select").not(n).hide()),c.mode){case"win":e.css({left:j+l,top:k+m}),"undefined"==typeof b.body.style.maxHeight&&e.css({position:"absolute",top:h+k+m});break;case"doc":e.css({position:"absolute",left:j+l,top:k+m});break;case"tc":e.css({left:"50%",top:m,marginLeft:-g+l}),"undefined"==typeof b.body.style.maxHeight&&e.css({position:"absolute",top:h+m});break;case"bc":e.css({left:"50%",bottom:m,marginLeft:-g+l}),"undefined"==typeof b.body.style.maxHeight&&e.css({position:"absolute",top:h+m+i});break;default:e.css({top:"50%",left:"50%",marginTop:-f-10+m,marginLeft:-g+l}),"undefined"==typeof b.body.style.maxHeight&&e.css({position:"absolute",top:h+i/2})}},pop:function(b){function j(i){var j,l,m;b=a.extend(b,i||{}),b.showTitle?e.append(f):g.addClass("s-sopop-single-close"),e.append(g).append(h),b.height&&"iframe"!=b.type&&e.css("height",b.height+"px"),e.css({visibility:b.visibility?"visible":"hidden"}),"content"==b.type&&h.html(b.content),"target"==b.type&&(j=a(b.target).show(),h.append(j)),"iframe"==b.type&&(l=a('<iframe src="'+b.iframe+'" width="100%" height="'+b.height+'" frameborder="0" scrolling="auto"></iframe>'),h.html(l)),"ajax"==b.type&&h.load(b.ajax.url,b.ajax.data,function(){c.setPos({mode:b.posType,obj:e,pos:b.pos,offset:b.offset}),b.ajax.callback&&b.ajax.callback()}),b.btn.length>0&&(m=a('<p class="p-so-popBtn"></p>'),a.each(b.btn,function(){var b=a.extend({cls:null,text:"确定",link:"#",removePop:!0,callback:function(){}},this),c=a('<a class="a-sopop-btn" href="'+b.link+'"><span class="s-sopop-btn">'+b.text+"</span></a>");null!==b.cls&&c.addClass(b.cls),c.bind("click",function(){return b.callback&&b.callback(k),b.removePop&&k(),"#"===b.link?!1:!0}),m.append(c)}),e.append(m)),a("body").append(e),b.showTitle&&b.drag&&(f.addClass("h2-sopop-move"),c.drag(e,f)),b.beforePop(e,f,g,h),d=c.show({mode:b.posType,obj:e,pos:b.pos,offset:b.offset,onlyOne:b.onlyOne},b.showMask,b.onPop(k)),g.bind("click",function(){k()}),b.maskClick&&d.bind("click",function(){k()})}function k(d){b=a.extend(b,d||{}),c.hide(e),a("body").removeData("soonlyone"),null!=b.target&&a(b.target).appendTo("body").hide(),e.remove(),b.closePop()}var d,e,f,g,h,i,c=this;return b=a.extend({type:"content",target:null,content:null,iframe:null,ajax:{url:null,data:null,callback:function(){}},posType:"center",pos:[0,0],offset:[0,0],cls:null,width:400,height:null,defaultShow:!0,visibility:!0,title:"提示",showTitle:!0,showMask:!0,onlyOne:!1,drag:!0,maskClick:!0,btn:[],beforePop:function(){},onPop:function(){},closePop:function(){}},b||{}),e=a('<div class="so-popbox '+(b.cls?b.cls:"")+'" style="width:'+b.width+'px;display:none;"></div>'),f=a('<h2 class="h2-sopop"><span class="s-sopop-title">'+b.title+"</span></h2>"),g=a('<span class="s-sopop-close">[关闭]</span>'),h=a('<div class="so-popbox-cont"></div>'),i=a("body").data("soonlyone"),b.defaultShow&&!i&&j(),{wrap:e,opt:b,removePop:k,showPop:j}},alert:function(a,b,c){var d=this;d.pop({cls:"so-popAlert",title:a,width:360,content:b,btn:[{text:"确定",callback:function(){c&&c()}}]})},confirm:function(a,b,c,d){var e=this;e.pop({cls:"so-popConfirm",title:a,width:360,content:b,btn:[{text:"确定",callback:function(){c&&c()}},{text:"取消",cls:"a-sopop-cancel",callback:function(){d&&d()}}]})},tip:function(b){var d,c=this;b=a.extend({cls:"so-popTip",showTitle:!1,posType:"tc",showMask:!1,width:360,stayTime:5e3,offset:[0,12]},b||{}),d=c.pop(b),b.stayTime>0&&setTimeout(function(){d.removePop()},b.stayTime)},loading:function(b){var d,c=this;return b=a.extend({type:"content",cls:"so-loading",showTitle:!1,maskClick:!1,width:80,height:36,content:"",stayTime:0},b||{}),d=c.pop(b),b.stayTime>0&&setTimeout(function(){d.removePop()},b.stayTime),{open:d.showPop,close:d.removePop}}},a.fn.soIframePop=function(b){var c=a.extend({type:"iframe",targetTag:"href",splitString:"#soIframe?",width:800,height:480,showTitle:!1},b||{}),d=[];return this.each(function(){var g,h,b=a(this),e=b.attr(c.targetTag).split(c.splitString),f=e[0];par=e[1]?e[1].split("&"):"",g={},a.each(par,function(){var a=this.split("=");g[a[0]]=a[1]}),c=a.extend(c,g||{}),c.showTitle="true"==c.showTitle?1:+c.showTitle,c.iframe=f,c.defaultShow=!1,h=a.sobox.pop(c),d.push(h),b.click(function(){return h.showPop(),a(this).data("iframePop",h),!1})}),d},a.fn.soSidePop=function(b){var c=a(this),d=b.event||"click";return c.bind(d,function(c){var d=a.extend({showMask:!1,posType:"doc",pos:[c.pageX,c.pageY],offset:[10,10],onlyOne:!0,returnFalse:!0},b||{});return sidepop=a.sobox.pop(d),d.returnFalse?!1:void 0}),c},a.fn.soOverTip=function(b){var c=a(this),d=a.extend({cls:"so-overTip",showMask:!1,posType:"doc",offset:[10,10],showTitle:!1,onlyOne:!0},b||{}),e=null;return c.mouseenter(function(b){d.pos=[b.pageX,b.pageY],e=a.sobox.pop(d)}).mouseleave(function(){e.removePop()}),c}}(jQuery,document);

jQuery(function(){
    var reg_mobile = /^[1][34578]\d{9}$/;
    var forget2loginName=$("#forget2loginName").val();

    if(reg_mobile.test(forget2loginName)){
        $("#js_phone_passwd").fadeIn();
    }else{
        $("#js_mail_result").fadeIn();
    }
    //表单默认初始化 forget_password.jsp
    $(".js_dval_ipt").each(function(){
        var $this = $(this);
        var dval = $this.val();
        $this.focus(function(){
            var cval = $(this).val();
            if((/[\u4e00-\u9fa5]+/).test(cval)){
                $(this).val("");
            }
        });
    });
    //找回密码方式 forget_password_select.jsp
    $(".js_get_way").on("mousedown",function(){
        var $this = $(this);
        var $parent = $this.parent();
        $this.addClass("on");
        $parent.find("input[type='radio']").attr("checked",true);
        $parent.siblings().find("a").removeClass("on");
        $parent.siblings().find("input[type='radio']").attr("checked",false);
    });

    $('#forget_submit_btn').on("mousedown",function() {
        $('#forget_submit_btn').hide();
        $('#already_submit_btn').show();
        var forget_username = $('#forget_username').val();
        var forget_verify   = $('#forget_verify').val();
        var usernameFlag = "false";
        var verifyFlag   = "false";
        if($.trim(forget_username)!=""&&forget_username!="手机号/邮箱"){
            var mobile = reg_mobile;
            var email =  /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if(email.test(forget_username)||(forget_username.length==11 && mobile.test(forget_username))){
                usernameFlag = "true";
                $('#account_error').html("<i class='icon-font icon-ttpodicon yes_green'></i>");
            }else{
                $('#account_error').html("<i class='icon-font icon-guanbi close_red'></i>输入的手机号或邮箱格式错误");
            }
        }else{
            $('#account_error').html("<i class='icon-font icon-guanbi close_red'></i>请输入手机号或邮箱");
        }
        if($.trim(forget_verify)==""){
            $('#valid_code_error').html("<i class='icon-font  icon-guanbi close_red'></i>");
        }else{
            verifyFlag = "true";
        }
        if(usernameFlag=="true"&&verifyFlag=="true"){
            $('#forgetform').submit();
        }else{
            $('#forget_submit_btn').show();
            $('#already_submit_btn').hide();
        }
    });

    $("#forget_username").on("blur",function(){
        var forget_username = $.trim($('#forget_username').val());
        if(forget_username!="" && forget_username!="手机号/邮箱"){
            var mobile = reg_mobile;
            var email =  /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if(email.test(forget_username)||(forget_username.length==11 && mobile.test(forget_username))){
                $.ajax({
                    type: "GET",
                    url: "isLoginNameExist",
                    data:"loginName="+forget_username+"&random="+Math.random(),
                    dataType: "json",
                    success: function(data){
                        if(!data.success){
                            $('#account_error').html(data.message);
                        }else{
                            $('#account_error').html("");
                        }
                    }
                });
            }else{
                $('#account_error').html("<i class='icon-font  icon-guanbi close_red'></i>输入的邮箱或手机格式错误");
            }
            //去除用户输入账户前后的空格
            $('#forget_username').val(forget_username);
        } else {
            $('#forget_username').val("手机号/邮箱");
            $('#account_error').html("<i class='icon-font  icon-guanbi close_red'></i>请输入手机号或邮箱");
        }
    });

    $("#forget_verify").on("keyup",function(){
        var forget_verify  = $.trim($('#forget_verify').val());
        if(forget_verify==""){
            $('#valid_code_error').html("<i class='icon-font  icon-guanbi close_red'></i>");
        }else if(forget_verify.length==4){
            $.ajax({
                type: "GET",
                url: "isValidCodeCorrect",
                data:"validCode="+forget_verify+"&random="+Math.random(),
                dataType: "json",
                success: function(data){
                    if(!data.success){
                        $('#valid_code_error').html("<i class='icon-font  icon-guanbi close_red'></i>");
                        refreshVerifyCode();
                    }else{
                        $('#valid_code_error').html("<i class='icon-font icon-ttpodicon yes_green'></i>");
                    }
                }
            });
        }
    });

    $("#forget_verify").on("blur",function(){
        var forget_verify  = $.trim($('#forget_verify').val());
        if(forget_verify==""){
            $('#valid_code_error').html("<i class='icon-font  icon-guanbi close_red'></i>");
        }else if(forget_verify.length>=4){
            $.ajax({
                type: "GET",
                url: "isValidCodeCorrect",
                data:"validCode="+forget_verify+"&random="+Math.random(),
                dataType: "json",
                success: function(data){
                    if(!data.success){
                        $('#valid_code_error').html("<i class='icon-font  icon-guanbi close_red'></i>");
                        refreshVerifyCode();
                    }else{
                        $('#valid_code_error').html("<i class='icon-font icon-ttpodicon yes_green'></i>");
                    }
                }
            });
        }
    });

    $("#send_validcode").on("mousedown",function(){
        //  $("#js_get_passwd_form").hide();
        var type = $("input[type='radio']:checked").val();

        if (type=="email") {
            var CSRFMemKey = $('#CSRFMemKey').val();
            var CSRFToken = $('#CSRFToken').val();
            $.ajax({
                type: "GET",
                url: "sendEmailForFindPassword",
                data:"CSRFMemKey="+CSRFMemKey + "&CSRFToken=" + CSRFToken +"&random="+Math.random(),
                dataType: "json",
                success: function(data){
                    if(!data.success){
                        window.location.href = data.data['loginUrl'];
                    }else{
                        $('#CSRFMemKey').val(data.data['memKey']);
                        $('#CSRFToken').val(data.data['token']);
                        $("#js_mail_result").fadeIn();
                    }
                }
            });
        } else if (type=="phone") {
            $("#js_phone_passwd").fadeIn();
        }

    });
    $("#send_phonevalidcode").on("click",function(){
        if(sending=="false"){
            $("#phone_code").fadeIn();
            time();
            var CSRFMemKey = $('#CSRFMemKey').val();
            var CSRFToken = $('#CSRFToken').val();
            $.ajax({
                type: "GET",
                url: "sendSmsVerifyForget",
                data:"CSRFMemKey="+CSRFMemKey + "&CSRFToken=" + CSRFToken +"&random="+Math.random(),
                dataType: "json",
                success: function(data){
                    if(data.success){
                        $('#CSRFMemKey').val(data.data['memKey']);
                        $('#CSRFToken').val(data.data['token']);
                    }else{
                        if(data.data['loginUrl']!=''){
                            window.location.href = data.data['loginUrl'];
                        }else{
                            //操作频繁，休息下一小时后再获取吧
                            if(data.message.indexOf("频繁") >= 0){
                                sending = "false";
                                clearTimeout(t);
                                $('#timeSpan').html("");
                            }
                            $.sobox.alert("提示",data.message);
                        }
                    }
                }
            });
        }
    });
    $("#valid_phonecode").on("mousedown",function(){
        var forget_verify = $.trim($('#forget_verify').val());
        var CSRFMemKey = $('#CSRFMemKey').val();
        var CSRFToken = $('#CSRFToken').val();

        $("#valid_phonecode").hide();
        $("#validing").show();
        $.ajax({
            type: "GET",
            url: "mobileVerify",
            data: "smsVerifyCode=" + forget_verify + "&CSRFMemKey=" + CSRFMemKey + "&CSRFToken=" + CSRFToken + "&random=" + Math.random(),
            dataType: "json",
            success: function (data) {
                if (data.success) {
                    window.location.href = "member_forget_3.html?loginType=mobile&verifyCode=" + forget_verify;
                } else {
                    if (data.data['gotoOtherUrl'] == 'false') {
                        $('#CSRFMemKey').val(data.data['memKey']);
                        $('#CSRFToken').val(data.data['token']);
                        $('#errorMessage').html("<i class='icon-font  icon-guanbi close_red'></i>" + data.message);
                        $("#valid_phonecode").show();
                        $("#validing").hide();
                        sending = "false";
                        clearTimeout(t);
                        $('#timeSpan').html("");
                    } else {
                        window.location.href = data.data['loginUrl'];
                    }
                }
            }
        });

    });

    $('#password_submit_btn').on("mousedown",function(){
        var  new_password = $('#new_password').val();
        var  confirm_password = $('#confirm_password').val();
        if(checkPassword()&&checkConfirmPassword()){
            if(confirm_password==new_password){
                $('#forgetform').submit();
            }else{
//    			$('#forget_new_span').html("");
                $('#forget_confirm_span').html("<i class='icon-font  icon-guanbi close_red'></i>您输入的新密码和确认密码不一致，请重新输入!");
            }
        }
    });

    $('#new_password').on("keyup",function(){
        checkPassword();
    });
    $('#new_password').on("blur",function(){
        checkPassword();
    });
    //登录密码
    $("#new_password").keyup(function(){
        pwdStrength($("#new_password"),$("#mobileStrengthPic"));
    });

    $('#confirm_password').on("blur",function(){
        var  new_password = $('#new_password').val();
        var  confirm_password = $('#confirm_password').val();
        if(checkConfirmPassword()){
            if(confirm_password==new_password){
                $('#forget_confirm_span').html("<i class='icon-font icon-ttpodicon yes_green'></i>");
            }else{
                $('#forget_confirm_span').html("<i class='icon-font  icon-guanbi close_red'></i>您输入的新密码和确认密码不一致，请重新输入!");
            }
        }
    });

});

function checkPassword(){
    var new_password = $('#new_password').val();
    if(new_password == ""){
        $('#forget_new_span').html("<i class='icon-font  icon-guanbi close_red'></i>请输入密码");
        return false;
    }else if(new_password.length < 6){
        $('#forget_new_span').html("<i class='icon-font  icon-guanbi close_red'></i>密码不能少于6位");
        return false;
    }else if($.trim(new_password)!=new_password){
        $('#forget_new_span').html("<i class='icon-font  icon-guanbi close_red'></i>密码前后不能包含空格");
        return false;
    }else if(pwdLevel(new_password) < 1){
        $('#forget_new_span').html("<i class='icon-font  icon-guanbi close_red'></i>密码过于简单");
        return false;
    }else{
        $('#forget_new_span').html("<i class='icon-font icon-ttpodicon yes_green'></i>");
    }
    //密码安全等级
    if(new_password.length >= 6){
        $(".wcode").show();
        var pwdSafeLevel = pwdLevel(new_password);
        switch (pwdSafeLevel) {
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
    }
    return true;
}

function checkConfirmPassword(){
    var confirm_password = $('#confirm_password').val();
    if(confirm_password == ""){
        $('#forget_confirm_span').html("<i class='icon-font  icon-guanbi close_red'></i>请输入密码");
        return false;
    }else if(confirm_password.length < 6){
        $('#forget_confirm_span').html("<i class='icon-font  icon-guanbi close_red'></i>密码不能少于6位");
        return false;
    }else if($.trim(confirm_password)!=confirm_password){
        $('#forget_confirm_span').html("<i class='icon-font  icon-guanbi close_red'></i>密码前后不能包含空格");
        return false;
    }else{
        $('#forget_confirm_span').html("<i class='icon-font icon-ttpodicon yes_green'></i>");
    }
    return true;
}

var time_limit = 90;
var sending = "false";
var wait= time_limit;
var t;
function time() {
    if (this.wait == 0) {
        $(".send").show();
        $(".sendt").hide();
        wait = time_limit;
    } else {
        $(".send").hide();
        $(".sendt").show();
        wait--;
        $(".sendt").text(+wait+'秒后重新发送');
        setTimeout(function() {
            time();
        },1000)
    }

}


function refreshVerifyCode(){
    setTimeout(function(){
        $("#verifyCodeId").attr("src","getKaptcha3?random="+Math.random());
    },1);
}
function showMessage(){
    $('#account_error').html("${verifyLoginMessage!''}");
    $('#valid_code_error').html("${verifyCodeMessage!''}");
}