/**
 * Created by 家旺 on 15-6-8.
 */
;
$(function(){
    $(".icon-arrow-left").parent().click(function(){
        if($.isNotBlank($(this).attr("href"))){
            window.location.href=$(this).attr("href");
        }else{
            window.history.go(-1);
        }
    });
    //省市区联动
    $("#provinceId").change(function(){
        $("#cityId").empty();
        $("#regionId").empty();
        $("#cityId").append($('<option value="0">市...</option>'));
        $("#regionId").append($('<option value="0">县/ 区...</option>'));
        $(this).getRegion( $("#cityId"),$("#defCityId").val());
    });
    $("#cityId").change(function(){
        $("#regionId").empty();
        $("#regionId").append($('<option value="0">县/ 区...</option>'));
        $(this).getRegion($("#regionId"),$("#defRegionId").val());
    });
    $("#regionId").change(function(){

    });
});
(function($) {
    $.fn.getRegion = function(obj,isDefault) {
        if($(this).val()!="0"){
            $.ajaxExt("/mfilter/appointment/region/"+$(this).val(),function(result){
                for(var i=0;i<result.length;i++){
                    var selected = "";
                    if(isDefault==result[i].id || isDefault==result[i].name){
                        selected = 'selected="selected"';
                    }
                    $(obj).append($('<option value="'+result[i].id+'" '+selected+'>'+result[i].regionName+'</option>'));
                }
                $(obj).change()});
        }
    };
})(jQuery);
$.ajaxExt = function(url, opts,callback) {
    if(typeof opts==="function"){
        callback = opts;
    }else if(!$.isNotBlank(callback)){
        callback = function(){

        };
    }
    var def = {
        async : true,
        url:url,
        dataType:"json",
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            if(XMLHttpRequest.status!="200"){
                $.message({type:"autoInfo",message:"系统异常，请稍后重试"});
                $(".cover_layer").remove();
            }
        },
        success:callback
        }
    if(callback === opts){
        opts = def;
    }
    opts = $.extend(true, def, opts);
    $.ajax(opts);
};
/*判断是否为空*/
$.isNotBlank = function(value) {
    if (value != undefined && value != "undefined" && value != null
        && value != "null" && value != "") {
        return true;
    }
    return false;
};
$.showErr = function(message) {
    var inf = "错误!" + message;
    console.log(inf);
    $.message({type:"info",message:inf});
};
//type Info、Question、AutoInfo
$.message = function(opts) {
    var def = {
        type : "info",
        message : "操作成功!",
        callback: function(){

        }
    };
    opts = $.extend(true,def, opts);
    eval(opts.type+"Dialog"+"('"+opts.message+"',"+opts.callback+")");

};

function questionDialog(message, callback) {
    $("body").append("<div class='cover_layer'></div>");
    $("body")
        .append(
            "<div class='dialog01'><div class='dia01_msg'>"
                + message
                + "</div><div class='dia_buttons'><a href='#' class='dia_cancel'>取消</a><a href='#' class='dia_submit'>确定</a></div></div>");
    var h = $(".dialog01").height() / 2;
    $(".dialog01").css("margin-top", -h + "px");
    $(".dia_cancel").click(function() {
        $(".dialog01").hide().remove();
        $(".cover_layer").hide().remove();
        return false;
    });

    $(".dia_submit").click(function() {
        $(".dialog01").hide().remove();
        $(".cover_layer").hide().remove();
        callback();
        return false;
    });
    return false;
}
// ///////////////////////////////////////////////////
function infoDialog(message,callback) {
    $("body").append("<div class='cover_layer'></div>");
    $("body")
        .append(
            "<div class='dialog01'><div class='dia01_msg'>"+message+"</div><div class='dia_buttons'><a href='#' class='dia_submit'>确定</a></div></div>");
    var h = $(".dialog01").height() / 2;
    $(".dialog01").css("margin-top", -h + "px");

    $(".dia_submit").click(function() {
        $(".dialog01").hide().remove();
        $(".cover_layer").hide().remove();
        callback();
        return false;
    });
    return false;
}
// ///////////////////////////////////////////

function autoInfoDialog(message,callback) {
    if (!$(".dialog03").length) {
        $("body").append("<div class='dialog03' style='font-size: 13px;'>"+message+"</div>");
    }else{
        $(".dialog03").remove();
        $("body").append("<div class='dialog03' style='font-size: 13px;'>"+message+"</div>");
    }
    setTimeout(function(){$(".dialog03").remove()},1000);
    callback();
    return false;
}

//下拉加载
$.scrollLoad = function(callback){
    var totalheight = 0;
    $(window).scroll(function(){
        var srollPos = $(window).scrollTop();    //滚动条距顶部距离(页面超出窗口的高度)
        totalheight = parseFloat($(window).height()) + parseFloat(srollPos);
        if(srollPos!=0 && ($(document).height()-50) <= totalheight) {
            callback();
        }
    });
};

//校验手机号码
function testPhone(str) {
    if (!(/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(str))) {
        return true;
    } else if (str.length != 11) {
        return true;
    } else {
        return false;
    }
}