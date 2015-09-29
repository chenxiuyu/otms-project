/*function area*/
var ehaier = ehaier || {};
var miniCart = {};
miniCart = new MMJS.Cart();

/* sobox 2.0 */
!function(a,b){a.sobox={maskIndex:0,showMask:function(c){var d=this,e=a(".so-openmask"),f=a(b).height();return e.length?d.maskIndex++:(e=a('<div class="so-openmask"></div>'),a("body").append(e),d.maskIndex=1),e.height(c?f+20:0),e.css("z-index",1e3+10*d.maskIndex),e},show:function(b,c,d){var e=this,f=a(b.obj),g=e.showMask(c);return e.setPos(b),b.onlyOne&&a("body").data("soonlyone",!0),f.css("z-index",1002+10*e.maskIndex).fadeIn(),f.find(".s-close").bind("click",function(){e.hide(f)}),d&&d(),g},hide:function(b,c){var d=this,e=a(".so-openmask");a(b).fadeOut("fast",function(){a("select").show(),c&&c()}),d.maskIndex--,e.css("z-index",1e3+10*d.maskIndex),0==d.maskIndex&&e.remove(),a(b).find(".s-close").unbind("click")},drag:function(c,d){function g(a){null==a&&(a=window.event),e.css({opacity:"0.4",left:a.clientX-posX+"px",top:a.clientY-posY+"px"})}var e=a(c),f=a(d);f.mousedown(function(c){c||(c=window.event),posX=c.clientX-parseInt(e.css("left")),posY=c.clientY-parseInt(e.css("top")),a(b).mousemove(function(a){g(a)})}),a(b).mouseup(function(){a(b).unbind("mousemove"),e.css({opacity:"1"})})},setPos:function(c){var e,f,g,h,i,j,k,l,m,n;switch(c=a.extend({mode:"center",obj:null,pos:[0,0],offset:[0,0]},c),e=a(c.obj),f=Math.floor(e.height()/2),g=Math.floor(e.width()/2),h=a(window).scrollTop(),i=a(window).height(),j=c.pos[0],k=c.pos[1],l=c.offset[0],m=c.offset[1],e.css({position:"fixed"}),"undefined"==typeof b.body.style.maxHeight&&(n=e.find("select"),a("select").not(n).hide()),c.mode){case"win":e.css({left:j+l,top:k+m}),"undefined"==typeof b.body.style.maxHeight&&e.css({position:"absolute",top:h+k+m});break;case"doc":e.css({position:"absolute",left:j+l,top:k+m});break;case"tc":e.css({left:"50%",top:m,marginLeft:-g+l}),"undefined"==typeof b.body.style.maxHeight&&e.css({position:"absolute",top:h+m});break;case"bc":e.css({left:"50%",bottom:m,marginLeft:-g+l}),"undefined"==typeof b.body.style.maxHeight&&e.css({position:"absolute",top:h+m+i});break;default:e.css({top:"50%",left:"50%",marginTop:-f-10+m,marginLeft:-g+l}),"undefined"==typeof b.body.style.maxHeight&&e.css({position:"absolute",top:h+i/2})}},pop:function(b){function j(i){var j,l,m;b=a.extend(b,i||{}),b.showTitle?e.append(f):g.addClass("s-sopop-single-close"),e.append(g).append(h),b.height&&"iframe"!=b.type&&e.css("height",b.height+"px"),e.css({visibility:b.visibility?"visible":"hidden"}),"content"==b.type&&h.html(b.content),"target"==b.type&&(j=a(b.target).show(),h.append(j)),"iframe"==b.type&&(l=a('<iframe src="'+b.iframe+'" width="100%" height="'+b.height+'" frameborder="0" scrolling="auto"></iframe>'),h.html(l)),"ajax"==b.type&&h.load(b.ajax.url,b.ajax.data,function(){c.setPos({mode:b.posType,obj:e,pos:b.pos,offset:b.offset}),b.ajax.callback&&b.ajax.callback()}),b.btn.length>0&&(m=a('<p class="p-so-popBtn"></p>'),a.each(b.btn,function(){var b=a.extend({cls:null,text:"确定",link:"#",removePop:!0,callback:function(){}},this),c=a('<a class="a-sopop-btn" href="'+b.link+'"><span class="s-sopop-btn">'+b.text+"</span></a>");null!==b.cls&&c.addClass(b.cls),c.bind("click",function(){return b.callback&&b.callback(k),b.removePop&&k(),"#"===b.link?!1:!0}),m.append(c)}),e.append(m)),a("body").append(e),b.showTitle&&b.drag&&(f.addClass("h2-sopop-move"),c.drag(e,f)),b.beforePop(e,f,g,h),d=c.show({mode:b.posType,obj:e,pos:b.pos,offset:b.offset,onlyOne:b.onlyOne},b.showMask,b.onPop(k)),g.bind("click",function(){k()}),b.maskClick&&d.bind("click",function(){k()})}function k(d){b=a.extend(b,d||{}),c.hide(e),a("body").removeData("soonlyone"),null!=b.target&&a(b.target).appendTo("body").hide(),e.remove(),b.closePop()}var d,e,f,g,h,i,c=this;return b=a.extend({type:"content",target:null,content:null,iframe:null,ajax:{url:null,data:null,callback:function(){}},posType:"center",pos:[0,0],offset:[0,0],cls:null,width:400,height:null,defaultShow:!0,visibility:!0,title:"提示",showTitle:!0,showMask:!0,onlyOne:!1,drag:!0,maskClick:!0,btn:[],beforePop:function(){},onPop:function(){},closePop:function(){}},b||{}),e=a('<div class="so-popbox '+(b.cls?b.cls:"")+'" style="width:'+b.width+'px;display:none;"></div>'),f=a('<h2 class="h2-sopop"><span class="s-sopop-title">'+b.title+"</span></h2>"),g=a('<span class="s-sopop-close">[关闭]</span>'),h=a('<div class="so-popbox-cont"></div>'),i=a("body").data("soonlyone"),b.defaultShow&&!i&&j(),{wrap:e,opt:b,removePop:k,showPop:j}},alert:function(a,b,c){var d=this;d.pop({cls:"so-popAlert",title:a,width:360,content:b,btn:[{text:"确定",callback:function(){c&&c()}}]})},confirm:function(a,b,c,d){var e=this;e.pop({cls:"so-popConfirm",title:a,width:360,content:b,btn:[{text:"确定",callback:function(){c&&c()}},{text:"取消",cls:"a-sopop-cancel",callback:function(){d&&d()}}]})},tip:function(b){var d,c=this;b=a.extend({cls:"so-popTip",showTitle:!1,posType:"tc",showMask:!1,width:360,stayTime:5e3,offset:[0,12]},b||{}),d=c.pop(b),b.stayTime>0&&setTimeout(function(){d.removePop()},b.stayTime)},loading:function(b){var d,c=this;return b=a.extend({type:"content",cls:"so-loading",showTitle:!1,maskClick:!1,width:80,height:36,content:"",stayTime:0},b||{}),d=c.pop(b),b.stayTime>0&&setTimeout(function(){d.removePop()},b.stayTime),{open:d.showPop,close:d.removePop}}},a.fn.soIframePop=function(b){var c=a.extend({type:"iframe",targetTag:"href",splitString:"#soIframe?",width:800,height:480,showTitle:!1},b||{}),d=[];return this.each(function(){var g,h,b=a(this),e=b.attr(c.targetTag).split(c.splitString),f=e[0];par=e[1]?e[1].split("&"):"",g={},a.each(par,function(){var a=this.split("=");g[a[0]]=a[1]}),c=a.extend(c,g||{}),c.showTitle="true"==c.showTitle?1:+c.showTitle,c.iframe=f,c.defaultShow=!1,h=a.sobox.pop(c),d.push(h),b.click(function(){return h.showPop(),a(this).data("iframePop",h),!1})}),d},a.fn.soSidePop=function(b){var c=a(this),d=b.event||"click";return c.bind(d,function(c){var d=a.extend({showMask:!1,posType:"doc",pos:[c.pageX,c.pageY],offset:[10,10],onlyOne:!0,returnFalse:!0},b||{});return sidepop=a.sobox.pop(d),d.returnFalse?!1:void 0}),c},a.fn.soOverTip=function(b){var c=a(this),d=a.extend({cls:"so-overTip",showMask:!1,posType:"doc",offset:[10,10],showTitle:!1,onlyOne:!0},b||{}),e=null;return c.mouseenter(function(b){d.pos=[b.pageX,b.pageY],e=a.sobox.pop(d)}).mouseleave(function(){e.removePop()}),c}}(jQuery,document);

/*soChange*/
;(function($){$.fn.extend({"soChange":function(o){o=$.extend({thumbObj:null,botPrev:null,botNext:null,changeType:'fade',thumbNowClass:'now',thumbOverEvent:true,slideTime:1000,autoChange:true,clickFalse:true,overStop:true,changeTime:5000,delayTime:300},o||{});var _self=$(this);var thumbObj;var size=_self.size();var nowIndex=1;var index;var startRun;var delayRun;function fadeAB(){if(nowIndex!=index){if(o.thumbObj){$(o.thumbObj).removeClass(o.thumbNowClass).eq(index).addClass(o.thumbNowClass)};if(o.slideTime<=0){_self.eq(nowIndex).hide();_self.eq(index).show()}else if(o.changeType=='fade'){_self.eq(nowIndex).fadeOut(o.slideTime);_self.eq(index).fadeIn(o.slideTime)}else{_self.eq(nowIndex).slideUp(o.slideTime);_self.eq(index).slideDown(o.slideTime)};nowIndex=index;}};function runNext(){index=(nowIndex+1)%size;fadeAB()};_self.hide().eq(1).show();if(o.thumbObj){thumbObj=$(o.thumbObj);thumbObj.removeClass(o.thumbNowClass).eq(1).addClass(o.thumbNowClass);thumbObj.click(function(){index=thumbObj.index($(this));fadeAB();if(o.clickFalse){return false}});if(o.thumbOverEvent){thumbObj.hover(function(){index=thumbObj.index($(this));delayRun=setTimeout(fadeAB,o.delayTime)},function(){clearTimeout(delayRun)})}};if(o.botNext){$(o.botNext).click(function(){if(_self.queue().length<1){runNext()};return false})};if(o.botPrev){$(o.botPrev).click(function(){if(_self.queue().length<1){index=(nowIndex+size-1)%size;fadeAB()};return false})};if(o.autoChange){startRun=setInterval(runNext,o.changeTime);if(o.overStop){_self.hover(function(){clearInterval(startRun);},function(){startRun=setInterval(runNext,o.changeTime)})}}}})})(jQuery);

/*raty*/ 
;(function(b){var a={init:function(c){return this.each(function(){a.destroy.call(this);this.opt=b.extend(true,{},b.fn.raty.defaults,c);var e=b(this),g=["number","readOnly","score","scoreName"];a._callback.call(this,g);if(this.opt.precision){a._adjustPrecision.call(this);}this.opt.number=a._between(this.opt.number,0,this.opt.numberMax);this.opt.path=this.opt.path||"";if(this.opt.path&&this.opt.path.slice(this.opt.path.length-1,this.opt.path.length)!=="/"){this.opt.path+="/";}this.stars=a._createStars.call(this);this.score=a._createScore.call(this);a._apply.call(this,this.opt.score);var f=this.opt.space?4:0,d=this.opt.width||(this.opt.number*this.opt.size+this.opt.number*f);if(this.opt.cancel){this.cancel=a._createCancel.call(this);d+=(this.opt.size+f);}if(this.opt.readOnly){a._lock.call(this);}else{e.css("cursor","pointer");a._binds.call(this);}if(this.opt.width!==false){e.css("width",d);}a._target.call(this,this.opt.score);e.data({settings:this.opt,raty:true});});},_adjustPrecision:function(){this.opt.targetType="score";this.opt.half=true;},_apply:function(c){if(c&&c>0){c=a._between(c,0,this.opt.number);this.score.val(c);}a._fill.call(this,c);if(c){a._roundStars.call(this,c);}},_between:function(e,d,c){return Math.min(Math.max(parseFloat(e),d),c);},_binds:function(){if(this.cancel){a._bindCancel.call(this);}a._bindClick.call(this);a._bindOut.call(this);a._bindOver.call(this);},_bindCancel:function(){a._bindClickCancel.call(this);a._bindOutCancel.call(this);a._bindOverCancel.call(this);},_bindClick:function(){var c=this,d=b(c);c.stars.on("click.raty",function(e){c.score.val((c.opt.half||c.opt.precision)?d.data("score"):this.alt);if(c.opt.click){c.opt.click.call(c,parseFloat(c.score.val()),e);}});},_bindClickCancel:function(){var c=this;c.cancel.on("click.raty",function(d){c.score.removeAttr("value");if(c.opt.click){c.opt.click.call(c,null,d);}});},_bindOut:function(){var c=this;b(this).on("mouseleave.raty",function(d){var e=parseFloat(c.score.val())||undefined;a._apply.call(c,e);a._target.call(c,e,d);if(c.opt.mouseout){c.opt.mouseout.call(c,e,d);}});},_bindOutCancel:function(){var c=this;c.cancel.on("mouseleave.raty",function(d){b(this).attr("src",c.opt.path+c.opt.cancelOff);if(c.opt.mouseout){c.opt.mouseout.call(c,c.score.val()||null,d);}});},_bindOverCancel:function(){var c=this;c.cancel.on("mouseover.raty",function(d){b(this).attr("src",c.opt.path+c.opt.cancelOn);c.stars.attr("src",c.opt.path+c.opt.starOff);a._target.call(c,null,d);if(c.opt.mouseover){c.opt.mouseover.call(c,null);}});},_bindOver:function(){var c=this,d=b(c),e=c.opt.half?"mousemove.raty":"mouseover.raty";c.stars.on(e,function(g){var h=parseInt(this.alt,10);if(c.opt.half){var f=parseFloat((g.pageX-b(this).offset().left)/c.opt.size),j=(f>0.5)?1:0.5;h=h-1+j;a._fill.call(c,h);if(c.opt.precision){h=h-j+f;}a._roundStars.call(c,h);d.data("score",h);}else{a._fill.call(c,h);}a._target.call(c,h,g);if(c.opt.mouseover){c.opt.mouseover.call(c,h,g);}});},_callback:function(c){for(i in c){if(typeof this.opt[c[i]]==="function"){this.opt[c[i]]=this.opt[c[i]].call(this);}}},_createCancel:function(){var e=b(this),c=this.opt.path+this.opt.cancelOff,d=b("<img />",{src:c,alt:"x",title:this.opt.cancelHint,"class":"raty-cancel"});if(this.opt.cancelPlace=="left"){e.prepend("&#160;").prepend(d);}else{e.append("&#160;").append(d);}return d;},_createScore:function(){return b("<input />",{type:"hidden",name:this.opt.scoreName}).appendTo(this);},_createStars:function(){var e=b(this);for(var c=1;c<=this.opt.number;c++){var f=a._getHint.call(this,c),d=(this.opt.score&&this.opt.score>=c)?"starOn":"starOff";d=this.opt.path+this.opt[d];b("<img />",{src:d,alt:c,title:f}).appendTo(this);if(this.opt.space){e.append((c<this.opt.number)?"&#160;":"");}}return e.children("img");},_error:function(c){b(this).html(c);b.error(c);},_fill:function(d){var m=this,e=0;for(var f=1;f<=m.stars.length;f++){var g=m.stars.eq(f-1),l=m.opt.single?(f==d):(f<=d);if(m.opt.iconRange&&m.opt.iconRange.length>e){var j=m.opt.iconRange[e],h=j.on||m.opt.starOn,c=j.off||m.opt.starOff,k=l?h:c;if(f<=j.range){g.attr("src",m.opt.path+k);}if(f==j.range){e++;}}else{var k=l?"starOn":"starOff";g.attr("src",this.opt.path+this.opt[k]);}}},_getHint:function(d){var c=this.opt.hints[d-1];return(c==="")?"":(c||d);},_lock:function(){var d=parseInt(this.score.val(),10),c=d?a._getHint.call(this,d):this.opt.noRatedMsg;b(this).data("readonly",true).css("cursor","").attr("title",c);this.score.attr("readonly","readonly");this.stars.attr("title",c);if(this.cancel){this.cancel.hide();}},_roundStars:function(e){var d=(e-Math.floor(e)).toFixed(2);if(d>this.opt.round.down){var c="starOn";if(this.opt.halfShow&&d<this.opt.round.up){c="starHalf";}else{if(d<this.opt.round.full){c="starOff";}}this.stars.eq(Math.ceil(e)-1).attr("src",this.opt.path+this.opt[c]);}},_target:function(f,d){if(this.opt.target){var e=b(this.opt.target);if(e.length===0){a._error.call(this,"Target selector invalid or missing!");}if(this.opt.targetFormat.indexOf("{score}")<0){a._error.call(this,'Template "{score}" missing!');}var c=d&&d.type=="mouseover";if(f===undefined){f=this.opt.targetText;}else{if(f===null){f=c?this.opt.cancelHint:this.opt.targetText;}else{if(this.opt.targetType=="hint"){f=a._getHint.call(this,Math.ceil(f));}else{if(this.opt.precision){f=parseFloat(f).toFixed(1);}}if(!c&&!this.opt.targetKeep){f=this.opt.targetText;}}}if(f){f=this.opt.targetFormat.toString().replace("{score}",f);}if(e.is(":input")){e.val(f);}else{e.html(f);}}},_unlock:function(){b(this).data("readonly",false).css("cursor","pointer").removeAttr("title");this.score.removeAttr("readonly","readonly");for(var c=0;c<this.opt.number;c++){this.stars.eq(c).attr("title",a._getHint.call(this,c+1));}if(this.cancel){this.cancel.css("display","");}},cancel:function(c){return this.each(function(){if(b(this).data("readonly")!==true){a[c?"click":"score"].call(this,null);this.score.removeAttr("value");}});},click:function(c){return b(this).each(function(){if(b(this).data("readonly")!==true){a._apply.call(this,c);if(!this.opt.click){a._error.call(this,'You must add the "click: function(score, evt) { }" callback.');}this.opt.click.call(this,c,{type:"click"});a._target.call(this,c);}});},destroy:function(){return b(this).each(function(){var d=b(this),c=d.data("raw");if(c){d.off(".raty").empty().css({cursor:c.style.cursor,width:c.style.width}).removeData("readonly");}else{d.data("raw",d.clone()[0]);}});},getScore:function(){var d=[],c;b(this).each(function(){c=this.score.val();d.push(c?parseFloat(c):undefined);});return(d.length>1)?d:d[0];},readOnly:function(c){return this.each(function(){var d=b(this);if(d.data("readonly")!==c){if(c){d.off(".raty").children("img").off(".raty");a._lock.call(this);}else{a._binds.call(this);a._unlock.call(this);}d.data("readonly",c);}});},reload:function(){return a.set.call(this,{});},score:function(){return arguments.length?a.setScore.apply(this,arguments):a.getScore.call(this);},set:function(c){return this.each(function(){var e=b(this),f=e.data("settings"),d=b.extend({},f,c);e.raty(d);});},setScore:function(c){return b(this).each(function(){if(b(this).data("readonly")!==true){a._apply.call(this,c);a._target.call(this,c);}});}};b.fn.raty=function(c){if(a[c]){return a[c].apply(this,Array.prototype.slice.call(arguments,1));}else{if(typeof c==="object"||!c){return a.init.apply(this,arguments);}else{b.error("Method "+c+" does not exist!");}}};b.fn.raty.defaults={cancel:false,cancelHint:"Cancel this rating!",cancelOff:"cancel-off.png",cancelOn:"cancel-on.png",cancelPlace:"left",click:undefined,half:false,halfShow:true,hints:["bad","poor","regular","good","gorgeous"],iconRange:undefined,mouseout:undefined,mouseover:undefined,noRatedMsg:"Not rated yet!",number:5,numberMax:20,path:"",precision:false,readOnly:false,round:{down:0.25,full:0.6,up:0.76},score:undefined,scoreName:"score",single:false,size:16,space:true,starHalf:"star-half.png",starOff:"star-off.png",starOn:"star-on.png",target:undefined,targetFormat:"{score}",targetKeep:false,targetText:"",targetType:"hint",width:undefined};})(jQuery);


/*use*/
ehaier.member = {
	init : function () {
		var that = this;
		if($('.js_cancelBooking').length){
			that._cancelOrder();//取消订单
		}
        if($('.js_applyRefundGoods').length){
            that._applyRefundGoods();//申请退货
        }
        if($('.js_applyRefund').length){
            that._applyRefund();//申请退款
        }
        if($('.js_receivedConfirm').length){
            that._receivedConfirm();//确认收货
        }
        if($('.js_cancelRefundGoods').length){
            that._cancelRefundGoods();//取消申请退货
        }
        if($('.js_cancelRefund').length){
            that._cancelRefund();//取消申请退款
        }
        if($('.myhaier').length){
			that._verifySms();//短信验证码验证				
			that._buyAgain();//再次购买	
			that._bindCoupon();
			that._memberApplyCoupon();
		}
		
		if($('.myorderview').length){
			that._trackOrder();//跟踪订单
			that._trackProduce();//跟踪生产流程
			that._payLink();//继续付款
			that._giftPay();//礼品卡付款
			that._checkShipping();//快递信息查询
			that._buyAgain();//再次购买
		}
		if($('#addressForm').length){
			that._addrValidate();//地址页验证
			that._regionEvent();//地址选择
			that._del_address();//删除地址
			that._add_address();	//新增收货地址
			that._edit_address();	//编辑收货地址
			that._set_defaultaddress();//设置默认地址
			
		}
		if($('.invoiceinfo').length){
			that._invoiceValidate();//验证发票
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
		if($('.myinfo').length){
			that._valiForm();
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
		if($('.historytop').length){
			that._calendarUse();//时间选择
		}
		if($('.myorder').length){
			that._buyAgain();//再次购买
			that._bindCoupon();
			that._memberApplyCoupon();
		}
		if($('.pwform').length){			
			that._pwValidate('#txt-oldpw','#txt-newpw','#txt-repw');//密码验证
		}
		if($('.dl-replybox').length){
			that._delImg();//删除上传分享图片小图
            $('.ratescore').raty({ scoreName: 'entity[score]',score:5,width: 90,starOff: 'http://cdn09.ehaier.com/v4/images/memberv3/s-star-off.png',starOn : 'http://cdn09.ehaier.com/v4/images/memberv3/s-star-on.png'});
            $('.sub-ratescore').raty({ scoreName: 'entity[score]',score:5,width: 120,starOff: 'http://cdn09.ehaier.com/v4/images/memberv3/star-off.png',starOn : 'http://cdn09.ehaier.com/v4/images/memberv3/star-on.png'});
    		that._readScore();//综合评分数字
    		that._placeHolder();//placeholder
    		that._underline();//上传按钮下滑线
		}
		if($('.commented').length){
			that._showReply();//滑出下拉内容框
		
		}
		// if($('.s-replybtn').length){
		// 	that._replyMsg();//回复框
		// }
		if($('.s-tags').length){
			that._selCom();//选择tag
		}
		if($('.s-diytag').length){
			that._diyTag();//自定义评价tag
		}		
		
	},
	//输入手机验证码及验证
	_verifySms:function(){
		$('#verifySms').click(function () {
			$.ajax({
				type: 'post',
				url: '/verifySms',
				data: "verifyCode="+$('#verifyCode').val()+'&'+getCSRFTokenParam(),
				success: function (data) {
					//console.log(typeof(data));
					refrushCSRFToken(data.csrfToken);
					if (data.success == false){
						$.sobox.alert('提示',data.message);
					}else{
						window.location.href="/index.html";
					}
				},
				error: function(data){
					// alert('ddd');
				}
			});
		});
	},
		//发送验证
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
							},90);
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
	//表单验证
	_valiForm : function(){
		var $formPW = $('.myinfo').soValidate({
		submit : function (form) {
			form.submit();
		}
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
	//新增收货地址
	_add_address : function () {
		$('.js_add_address').click(function (evt) {
			evt.preventDefault();
			$('#addressForm').attr("action","/addMemberAddress");
			//添加操作将表单中的ID值清空
			$('.em-errMes').hide();
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
			$('#txt-id').attr("value",$('.ed_fresher').eq(index).attr('ed_id'));
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
			function changeR (){//更改地区
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
		$.sobox.pop({type:'target',title:'编辑收货地址',target:'#addressForm',width:550,cls:'pop-editaddr'});
		});		
	},
	//提交收货地址
	//_submit_address : function(){
		//$('#addressForm').submit(function () {
			//alert( this.action);
			//return false;
		//});
	//},
	//删除地址
	_del_address : function(){
		$('.js_del_address').click(function () {
			var del_url=$(this).attr("href");
			//var del_url='http://www.'+ehaier.tool.domain+'.com'+$(this).attr("href");
			$.sobox.confirm('提示','你确定此操作吗？',function(){
				
				//window.location.href = del_url;
					$('#addressForm').attr("action",del_url);
					$('#addressForm').trigger('submit');
				},function(){		
						
				}); 
			return false;
		});
	},
	
	//设置默认地址
	_set_defaultaddress:function(){
		$('.js_set_default').click(function () {
			//var del_url=$(this).attr("href");
			//var del_url='http://www.'+ehaier.tool.domain+'.com'+$(this).attr("href");
			var address_id = $(this).attr("href");
			$.sobox.confirm('提示','你确定此操作吗？',function(){
				
				$('#addressForm').attr("action",address_id);
				$('#addressForm').trigger('submit');
				},function(){				
					
				}); 
			return false;
		});
		
	},
	//地址页验证
		_addrValidate : function () {
		$('.em-errMes').hide();		
		function nameCheck(){
			var pcode=$('#txt-fresher');
			var pcValue=pcode.val();
			if(($.trim(pcValue).length)<1){
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
			var checx=/^[0-9]\d{5}(?!\d)$/;
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
			if(($.trim(addrValue).length<1)||($.trim(addrValue).length>=50)){
				$('#txt-addr + .em-errMes').show().html('请输入收货地址且地址不能超过50字');
				return false;	
				}else{
					$('#txt-addr + .em-errMes').hide();
					return true;	
				}
		}

		// function isIdCardNo(){
		// 	var checkid = /(^\d{15}$)|(^\d{17}([0-9]|X)$)/;
		// 	var idNum = $('#txt-id');
		// 	var idNumValue = idNum.val().toUpperCase();			
		//    //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。  
		//    if (!checkid.test(idNumValue)){
		//    		$('#txt-id + .em-errMes').show().html('输入的身份证号长度不对，或者号码不符合规定！');
		//        return false;
		//   		}else{
		// 			$('#txt-id + .em-errMes').hide();
		// 			return true;	
		// 			}
		// }
		
		
		$('#txt-fresher').blur(nameCheck);
		$('#txt-contact').blur(teleCheck);
		$('#txt-fresh').blur(pcCheck);
		$('#txt-addr').blur(addrCheck);
		//$('#txt-id').blur(isIdCardNo);
		$('.js_addrSubmit').on('click',function(){
			var actionUrl = $('#addressForm').attr('action').split('?')[0];
				
			if(actionUrl != "/updateAddress" && actionUrl != "/addMemberAddress"){
				window.location.href= $('#addressForm').attr('action');
				return true;
			}
			actionUrl = $('#addressForm').attr('action');
			var provinceVal = $('#provinceId').val();
			var cityVal =  $('#cityId').val();
			var regionVal = $('#regionId').val();
			if(nameCheck()&&teleCheck()&&addrCheck()&&pcCheck()&&provinceVal != 0 && cityVal !=0 &&regionVal!= 0 ){
				var sereData = $('#addressForm').serialize();
				var domain = ehaier.domainUrl.memberBaseDomain;
				//console.log(sereData);
				$.ajax({
					type:'post',
					url:domain+ actionUrl,
					data:sereData,
					dataType : "json",
					async:false,
					beforeSend: function(){
							$('#loading').css("display","block");
							$('#loading').html('<img src="${domainUrlUtil.MEMBER_DOMAIN}/shoppingmall_members/resources/images/loading.gif" width="35" height="35" />')
							},
					success:function(data){
						//console.log(data);
                        //console.log(sereData);
						if(data.success){
							window.location.href=domain + "/memberaddress.html";
						}else{
							refrushCSRFToken(data.csrfToken);
							for(var key in data.data){
								if((typeof data.data[key])!=='undefined'){
									if(data.data.memberNull == 'error'){
										window.location.href= domain +  "/error.html";
									}
									$('[name='+key+']').next('em').html(data['message']).show();
								}
							}
						}
					},
					error:function(d){
						//console.log(d);
						//console.log(sereData);
					}
				})
				//return true;
			}else if(nameCheck()&&teleCheck()&&addrCheck()&&pcCheck()){
			
				//提交时校验省市区
				if(provinceVal == 0 || cityVal == 0 || regionVal == 0){
					$('.se-region + .em-errMes').show().html('请选择地区');
				}
				return false;				
			}else{
			
				return false;
			}
		})
		// $('#addressForm').submit(function(evt){
		// 	evt.preventDefault();
			
		// });	

},
//验证发票地址
_invoiceValidate : function(){
	$('.em-errMes').hide();		
		function nameCheck(){
			var pcode=$('#txt-receiver');
			var pcValue=pcode.val();
			if((pcValue.length)<1){
				$('#txt-receiver + .em-errMes').show().html('请输入收件人姓名');
				return false;	
				}else{
					$('#txt-receiver + .em-errMes').hide();
					return true;	
				}
		}
		function teleCheck(){
			var checx=/^(13|15|18)\d{9}$/;
			var tele=$('#txt-mobile');
			var teleValue=tele.val();
			if(!checx.test(teleValue)){
				$('#txt-mobile + .em-errMes').show().html('请输入正确的11位手机号码');
				return false;					
				}else{
					$('#txt-mobile + .em-errMes').hide()
					return true;
				}
		}
		function pcCheck(){
			var checx=/^[0-9]\d{5}(?!\d)$/;
			var pcode=$('#txt-pcode');
			var pcValue=pcode.val();
			if(!checx.test(pcValue)){
				$('#txt-pcode + .em-errMes').show().html('请输入正确的6位邮政编码');
				return false;					
				}else{
					$('#txt-pcode + .em-errMes').hide();
					return true;	
				}
		}

		function phoneCheck(){
		var checx=/^(\d{3,4}-)\d{7,8}$/;
		var tele = $('#txt-regtele');
		var teleValue=tele.val();
		var pcem = e +'+'+ eme;
		if(!checx.test(teleValue)){
			$('#txt-regtele + .em-errMes').show().html('请输入正确的电话号码，如010-12345678');
			return false;					
			}else{
				$('#txt-regtele + .em-errMes').hide();
					return true;
			}
		}
		
		function addrCheck(){
			var addr=$('#txt-address');
			var addrValue=addr.val()
			if((addrValue.length<1)||(addrValue.length>=50)){
				$('#txt-address + .em-errMes').show().html('请输入收货地址且地址不能超过50字');
				return false;	
				}else{
					$('#txt-address + .em-errMes').hide();
					return true;	
				}
		}

		function cardCheck(){
		var checx=/^\d{16,19}$/;
		var card=$('#txt-bankaccount');
		var cardValue=card.val();
		if(!checx.test(cardValue)){
			$('#txt-bankaccount + .em-errMes').show().html('请输入正确的16-19位银行卡号');
			return false;					
			}else{
				$('#txt-bankaccount + .em-errMes').hide()
				return true;
			}
		}	
		
		
		$('#txt-receiver').blur(nameCheck);
		$('#txt-mobile').blur(teleCheck);
		$('#txt-pcode').blur(pcCheck);
		$('#txt-address').blur(addrCheck);
		$('#txt-regtele').blur(phoneCheck);
		$('#txt-bankaccount').blur(cardCheck);

		
		$('.invoiceinfo').submit(function(){		
		if(nameCheck()&&addrCheck()&&pcCheck()&&teleCheck()&&phoneCheck()&&cardCheck()){
			return true;
			}else{
				return false;
			}
		})	
},
	//密码验证
	_pwValidate : function(op,np,rnp){
	$('.p-item em').addClass('em-errMes').hide();
	//$('.em-errMes').hide();
	$(op).blur(opwCheck);
	$(np).blur(npwCheck);
	$(rnp).blur(reCheck);
	$('.pwform .bt_submit').click(function(){
			if(opwCheck()&&npwCheck()&&reCheck()){
				return true;			
			}else{
				return false;
				}				
			});	
		function opwCheck(){
				var pw=$(op);
				var pwValue=pw.val();
				if((pwValue.length)<6||$.trim(pwValue) != pwValue){
					$(op).siblings('em').show().html('密码不能少于6位且前后不能包含空格');
					return false;					
					}else{
						$(op).siblings('em').hide();
						return true;
					}
			}
		function npwCheck(){
				var npw=$(np);
				var npwValue=npw.val();
				//console.log('------'+npwValue);
				if((npwValue.length)<6||$.trim(npwValue) != npwValue){
					$(np).next('em').show().html('密码不能少于6位且前后不能包含空格');
					return false;					
					}else{
						$(np).next('em').hide();
						return true;
					}
			}
		function reCheck(){
				var npw=$(np);
				var npwValue=npw.val();
				var rpw=$(rnp);
				var rpwValue=rpw.val();
				if(rpwValue!=npwValue){
					$(rnp).next('em').show().html('两次输入密码不一致，请重新输入');					
					return false;					
					}else{
						$(rnp).next('em').hide();
						return true;
					}
			}
	},
	//删除收藏
	_delCollection : function(){
		$('.mycolbtn').click(function(){
			var url='/delmembercolect?productId='+$(this).attr("productId");
			$.sobox.confirm('提示','你确定此操作吗？',function(){
				$("#collectForm").attr("action", url).attr("method", "POST").submit();
				$(this).parents('tr').remove();
				},function(){}); 
		})
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
		                     html+="<tr><td colspan='6'><strong>无消费记录</strong></td> </tr>";
						}else{
							var cardNumber = card.giftCardNumbers.cardNumber;
							var amount = card.giftCardNumbers.amount;
							var balance = card.giftCardNumbers.balance;
							html = "<p class='p-giftinfo'>";
							html+="<span class='mlft_10px'>礼品卡卡号："+cardNumber+"</span>";
							html+="<span class='mlft_10px'>面值：<em>"+"￥"+amount+"</em></span>";
							html+="<span class='mlft_10px'>余额："+"￥"+balance+"</span>";
		                    html+="<span>有效期："+card.giftCardNumbers.cardStartAddTimeStr+"至"+card.giftCardNumbers.cardAddTimeStr+"</span></p>";
		                    
		                    html+=" <table class='uselist'>  <tr>";
		                    html+="<th class='th-innertale'>时间</th>";
		                    html+="<th class='th-innertale'>订单编号</th>";
		                    html+="<th class='th-innertale'>类型</th>";
		                    html+="<th class='th-innertale'>消费金额</th>";
		                    html+="<th class='th-innertale'>是否本人消费</th>";
		                    html+="<th class='th-innertale'>备注</th> </tr>";
		                    // if(data.data){

		                    // }
	                    $.each(data.data,function (k,v) {
                    	
	                    	var type;//类型
	                    	var isSelf;
	                    	if(this.usedType==1){
	                    		type = "减卡内余额";
	                    	}else{
	                    		type = "加卡内余额";
	                    	}
	                    	
	                    	if(this.memberId == this.giftCardNumbers.bindMemberId){
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
						height:400,
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
					if (data.data.flag==true){
						$.sobox.alert('礼品卡绑定',data.data.message,function(){
							//绑定成功后，重新定向到礼品卡列表
						window.location.href="/membergiftcard.html";
						});
						refrushCSRFToken(data.csrfToken);
						
					}else{
						$.sobox.alert('礼品卡绑定',data.data.message);
						refrushCSRFToken(data.csrfToken);
					}
					
					
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
							$.sobox.alert('查看礼品卡余额',data.data.balance);
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
				//console.log(typeof(data));
				if (typeof(data) == "object"){
					$.sobox.alert('提示',data.data.message);
				}
				refrushCSRFToken(data.csrfToken);
			}
		});
		return false;
	});
	},
	//选取日期
	_calendarUse : function(){
	$('#createTimeMin').calendar({btnBar:false});
	$('#createTimeMax').calendar({btnBar:false});
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
	
	//取消订单
		_cancelOrder : function(){
		$('.js_cancelBooking').click(function () {
			var orderSn = $(this).closest('tbody').attr('id');
			var cancelurl = $(this).attr('href');
			$.sobox.pop({
				title : '提示',
				cls : 'delorder',
				content : '订单一旦取消将无法恢复，确定取消吗？',
				btn:[{text : '确定',link:cancelurl,removePop:true,callback:function () {
				$.ajax({
						type:'post',
						data :'orderSn='+orderSn+"&"+getCSRFTokenParam(),
						url:ehaier.domainUrl.memberBaseDomain+'/cancelorder.html',
						beforeSend: function(){
							$('#loading').css("display","block");
							$('#loading').html('<img src="http://cdn09.ehaier.com/v3/images/loading.gif" width="35" height="35" />')
							},
						success: function(data){
							if (data.success) {
								$.sobox.pop({
									title:'提示',
									content:'订单取消成功',
									btn:[{text:'确定'}],
									closePop:function(){												
										window.location.href=ehaier.domainUrl.memberBaseDomain+ehaier.domainUrl.currentRequestUrl;
									}										
								})
															
							}
							else{
								if(data.data != null && data.data.code != null){
									if(data.data.code=='syserror'){									
										window.location.href=ehaier.domainUrl.memberBaseDomain+'/error.html';
									}									
									else {
										$('.p-hint').html(data.message);
										$('.p-hint').slideDown();
										$('#loading').css("display","none");
										$('#loading').html('');						
									}									
								}
								refrushCSRFToken(data.csrfToken);
							}
						}//success						
				})				
				}},
					{text : '取消',cls:'a-cancel'}]
			});
			//return false;
		});
			
		},

    //申请退货
    _applyRefundGoods : function(){
        $('.js_applyRefundGoods').click(function () {
            var orderProductId = $(this).closest('.js_applyRefundGoods').attr('id');
            var applyRefundGoodsurl = $(this).attr('href');
            $.sobox.pop({
                title : '提示',
                cls : 'delorder',
                content : '确定申请退货吗？',
                btn:[{text : '确定',link:applyRefundGoodsurl,removePop:true,callback:function () {
                    $.ajax({
                        type:'post',
                        data :'orderItemId='+orderProductId+"&reason=申请退货"+"&"+getCSRFTokenParam(),
                        url:ehaier.domainUrl.memberBaseDomain+'/orderRefundGood.html',
                        beforeSend: function(){
                            $('#loading').css("display","block");
                            $('#loading').html('<img src="http://cdn09.ehaier.com/v3/images/loading.gif" width="35" height="35" />')
                        },
                        success: function(data){
                            if (data.success) {
                                $.sobox.pop({
                                    title:'提示',
                                    content:'申请退货成功',
                                    btn:[{text:'确定'}],
                                    closePop:function(){
                                        window.location.href=ehaier.domainUrl.memberBaseDomain+ehaier.domainUrl.currentRequestUrl;
                                    }
                                })

                            }
                            else{
                                if(data.data != null && data.data.code != null){
                                    if(data.data.code=='syserror'){
                                        window.location.href=ehaier.domainUrl.memberBaseDomain+'/error.html';
                                    }
                                    else {
                                        $('.p-hint').html(data.message);
                                        $('.p-hint').slideDown();
                                        $('#loading').css("display","none");
                                        $('#loading').html('');
                                    }
                                }
                                refrushCSRFToken(data.csrfToken);
                            }
                        }//success
                    })
                }},
                    {text : '取消',cls:'a-cancel'}]
            });
            //return false;
        });

    },
    //申请退款
    _applyRefund : function(){
    	
        $('.js_applyRefund').click(function () {
            var orderProductId = $(this).closest('.js_applyRefund').attr('id');
            var orderId = $(this).closest('.js_applyRefund').attr('name');
            var applyRefundurl = $(this).attr('href');
            $.sobox.pop({
                title : '提示',
                cls : 'delorder',
                content : '确定申请退款吗？',
                btn:[{text : '确定',link:applyRefundurl,removePop:true,callback:function () {
                    $.ajax({
                        type:'post',
                        data :'orderId='+orderId+'&orderItemId='+orderProductId+"&reason=申请退款"+"&"+getCSRFTokenParam(),
                        url:ehaier.domainUrl.memberBaseDomain+'/orderRefund.html',
                        beforeSend: function(){
                            $('#loading').css("display","block");
                            $('#loading').html('<img src="http://cdn09.ehaier.com/v3/images/loading.gif" width="35" height="35" />')
                        },
                        success: function(data){
                            if (data.success) {
                                $.sobox.pop({
                                    title:'提示',
                                    content:'申请退款成功',
                                    btn:[{text:'确定'}],
                                    closePop:function(){
                                        window.location.href=ehaier.domainUrl.memberBaseDomain+ehaier.domainUrl.currentRequestUrl;
                                    }
                                })

                            }
                            else{
                                if(data.data != null && data.data.code != null){
                                    if(data.data.code=='syserror'){
                                        window.location.href=ehaier.domainUrl.memberBaseDomain+'/error.html';
                                    }
                                    else {
                                        $('.p-hint').html(data.message);
                                        $('.p-hint').slideDown();
                                        $('#loading').css("display","none");
                                        $('#loading').html('');
                                    }
                                }
                                refrushCSRFToken(data.csrfToken);
                            }
                        }//success
                    })
                }},
                    {text : '取消',cls:'a-cancel'}]
            });
            //return false;
        });

    },

    //确认收货
    _receivedConfirm : function(){
        $('.js_receivedConfirm').click(function () {
            var orderSn = $(this).closest('tbody').attr('id');
            var receivedConfirmUrl = $(this).attr('href');
            $.sobox.pop({
                title : '提示',
                cls : 'delorder',
                content : '订单一旦确认收货将无法恢复，确定要确认收货吗？',
                btn:[{text : '确定',link:receivedConfirmUrl,removePop:true,callback:function () {
                    $.ajax({
                        type:'post',
                        data :'orderSn='+orderSn+"&"+getCSRFTokenParam(),
                        url:ehaier.domainUrl.memberBaseDomain+'/receivedConfirm.html',
                        beforeSend: function(){
                            $('#loading').css("display","block");
                            $('#loading').html('<img src="http://cdn09.ehaier.com/v3/images/loading.gif" width="35" height="35" />')
                        },
                        success: function(data){
                            if (data.success) {
                                $.sobox.pop({
                                    title:'提示',
                                    content:'订单确认收货成功',
                                    btn:[{text:'确定'}],
                                    closePop:function(){
                                        window.location.href=ehaier.domainUrl.memberBaseDomain+ehaier.domainUrl.currentRequestUrl;
                                    }
                                })

                            }
                            else{
                                if(data.data != null && data.data.code != null){
                                    if(data.data.code=='syserror'){
                                        window.location.href=ehaier.domainUrl.memberBaseDomain+'/error.html';
                                    }
                                    else {
                                        $('.p-hint').html(data.message);
                                        $('.p-hint').slideDown();
                                        $('#loading').css("display","none");
                                        $('#loading').html('');
                                    }
                                }
                                refrushCSRFToken(data.csrfToken);
                            }
                        }//success
                    })
                }},
                    {text : '取消',cls:'a-cancel'}]
            });
            //return false;
        });

    },

    // 取消退货
    _cancelRefundGoods : function(){
        $('.js_cancelRefundGoods').click(function () {
            var orderProductId = $(this).attr("id");
            var cancelRefundGoodsUrl = $(this).attr('href');
            $.sobox.pop({
                title : '提示',
                cls : 'delorder',
                content : '确定要取消退货吗？',
                btn:[{text : '确定',link:cancelRefundGoodsUrl,removePop:true,callback:function () {
                    $.ajax({
                        type:'post',
                        data :'orderProductId='+orderProductId+"&"+getCSRFTokenParam(),
                        url:ehaier.domainUrl.memberBaseDomain+'/cancelRefundGoods.html',
                        beforeSend: function(){
                            $('#loading').css("display","block");
                            $('#loading').html('<img src="http://cdn09.ehaier.com/v3/images/loading.gif" width="35" height="35" />')
                        },
                        success: function(data){
                            if (data.success) {
                                $.sobox.pop({
                                    title:'提示',
                                    content:'取消退货成功',
                                    btn:[{text:'确定'}],
                                    closePop:function(){
                                        window.location.href=ehaier.domainUrl.memberBaseDomain+ehaier.domainUrl.currentRequestUrl;
                                    }
                                })

                            }
                            else{
                                if(data.data != null && data.data.code != null){
                                    if(data.data.code=='syserror'){
                                        window.location.href=ehaier.domainUrl.memberBaseDomain+'/error.html';
                                    }
                                    else {
                                        $('.p-hint').html(data.message);
                                        $('.p-hint').slideDown();
                                        $('#loading').css("display","none");
                                        $('#loading').html('');
                                    }
                                }
                                refrushCSRFToken(data.csrfToken);
                            }
                        }//success
                    })
                }},
                    {text : '取消',cls:'a-cancel'}]
            });
            //return false;
        });

    },

    // 取消退款
    _cancelRefund : function(){
        $('.js_cancelRefund').click(function () {
            var orderProductId = $(this).attr("id");
            var cancelRefundUrl = $(this).attr('href');
            $.sobox.pop({
                title : '提示',
                cls : 'delorder',
                content : '确定要取消退款吗？',
                btn:[{text : '确定',link:cancelRefundUrl,removePop:true,callback:function () {
                    $.ajax({
                        type:'post',
                        data :'orderProductId='+orderProductId+"&"+getCSRFTokenParam(),
                        url:ehaier.domainUrl.memberBaseDomain+'/cancelRefund.html',
                        beforeSend: function(){
                            $('#loading').css("display","block");
                            $('#loading').html('<img src="http://cdn09.ehaier.com/v3/images/loading.gif" width="35" height="35" />')
                        },
                        success: function(data){
                            if (data.success) {
                                $.sobox.pop({
                                    title:'提示',
                                    content:'取消退款成功',
                                    btn:[{text:'确定'}],
                                    closePop:function(){
                                        window.location.href=ehaier.domainUrl.memberBaseDomain+ehaier.domainUrl.currentRequestUrl;
                                    }
                                })

                            }
                            else{
                                if(data.data != null && data.data.code != null){
                                    if(data.data.code=='syserror'){
                                        window.location.href=ehaier.domainUrl.memberBaseDomain+'/error.html';
                                    }
                                    else {
                                        $('.p-hint').html(data.message);
                                        $('.p-hint').slideDown();
                                        $('#loading').css("display","none");
                                        $('#loading').html('');
                                    }
                                }
                                refrushCSRFToken(data.csrfToken);
                            }
                        }//success
                    })
                }},
                    {text : '取消',cls:'a-cancel'}]
            });
            //return false;
        });

    },
		_buyAgain : function(){
			$(".buy_again").click(function(){
				var _objTR = $(this).closest('tr');
				
				var orderType = _objTR.find("input[name='orderType']").val();
				var _acid = _objTR.find("input[name='acid']").val();
				var _c2bType = _objTR.find("input[name='c2bType']").val();
				var _num = 1;
				var _canSaleFlag = 1;

				var _orderRegionId = _objTR.find("input[name='regionId']").val();
				var _orderCityId = _objTR.find("input[name='cityId']").val();
				var _prodId = _objTR.find("input[name='prodId']").val();
				var $header_curCity = $('.js-choose-city');
				
				var _rankPrice = _objTR.find("input[name='rankPrice']").val();

				if(ehaier.domainUrl.currentRegionId != _orderRegionId){
					var url = ehaier.domainUrl.memberBaseDomain + '/changeRegionJsonp?id='+_prodId+'&regionId='+_orderRegionId;
					$.ajax({
						type:'get',
						dataType:'jsonp',
						url : url,
						cache : false,
						async : false,
						success:function(data){
							
							if (data.success) {
								$header_curCity.html(data.data.currentCityName);
								ehaier.domainUrl.currentRegionId = _orderRegionId;
								ehaier.domainUrl.currCityId = _orderCityId;

								if(orderType == 1){
									var cookieValue="acid:"+_acid+"_num:"+_num+"_canSaleFlag:"+_canSaleFlag + "_c2bType:" + _c2bType;
									$.cookie("ORDER_SHOW_JHJJ_PARAM", cookieValue, { path: '/', domain: ehaier.domainUrl.cookieDomain });
									$.ajax({
										url: ehaier.domainUrl.baseDomain + '/order/isShowSettlement?source=product',
										dataType: 'jsonp',
										success : function (data) {
											//console.log(data.success);
											if (data.success) {
												window.location.href= ehaier.domainUrl.baseDomain + '/order.html?source=product';
											}else{
												if (data.data==0) {
													window.location.href='/';
												}else{
													$.sobox.alert('提示',data.message);
												}
											}	
										}
									});
								}else{				
									var _type = 0; //商品
									
									var post_data = {};
									post_data['num'] = _num;
									post_data['id'] = _prodId;
									post_data['type'] = _type;
									post_data['acid'] = _acid;
									
									if($('#identifier').length&&_rankPrice!=undefined){
									  post_data['identifier'] = $('#identifier').val();
									}
									miniCart.bind('.js_cart');
									miniCart.add(post_data,function(data){
										$('#buyNum').val(data.data.num);
										if (data.success) {
											$.sobox.pop({
												cls:'pop-successCart',
												title:'加入购物车成功',
												content:data.data.msg,
												btn:[{text:'返回会员中心',cls:'a-cancel'},{text:'去购物车结算',callback:function () {
													
													if($('#identifier').length&&_rankPrice!=undefined){
														window.location.href= ehaier.domainUrl.baseDomain + '/ckcart.html';
													}else{
														window.location.href= ehaier.domainUrl.baseDomain + '/cart.html';
													}
															}}]
														});
													}else {
														$.sobox.alert('出错了',data.data.msg);
														return false;
													}
									});
								}	
							}else {
								$.sobox.alert('提示',data.message);
							} 
						}
					});
				}else{
					if(orderType == 1){
						var cookieValue="acid:"+_acid+"_num:"+_num+"_canSaleFlag:"+_canSaleFlag;
						$.cookie("ORDER_SHOW_JHJJ_PARAM", cookieValue, { path: '/', domain: ehaier.domainUrl.cookieDomain });
						$.ajax({
							url: ehaier.domainUrl.baseDomain + '/order/isShowSettlement?source=product',
							dataType: 'jsonp',
							success : function (data) {
								//console.log(data.success);
								if (data.success) {
									window.location.href= ehaier.domainUrl.baseDomain + '/order.html?source=product';
								}else{
									if (data.data==0) {
										window.location.href='/';
									}else{
										$.sobox.alert('提示',data.message);
									}
								}	
							}
						});
					}else{				
						var _type = 0; //商品
						
						var post_data = {};
						post_data['num'] = _num;
						post_data['id'] = _prodId;
						post_data['type'] = _type;
						post_data['acid'] = _acid;
						
						if($('#identifier').length&&_rankPrice!=undefined){
						  post_data['identifier'] = $('#identifier').val();
						}

						miniCart.bind('.js_cart');
						miniCart.add(post_data,function(data){
							$('#buyNum').val(data.data.num);
							if (data.success) {
								$.sobox.pop({
									cls:'pop-successCart',
									title:'加入购物车成功',
									content:data.data.msg,
									btn:[{text:'返回会员中心',cls:'a-cancel'},{text:'去购物车结算',callback:function () {
										if($('#identifier').length&&_rankPrice!=undefined){
											window.location.href= ehaier.domainUrl.baseDomain + '/ckcart.html';
										}else{
											window.location.href= ehaier.domainUrl.baseDomain + '/cart.html';
										}
									}}]
								});
							}else {
								$.sobox.alert('出错了',data.data.msg);
								return false;
							}
						});
					}
				}
				
			
			return false;
			
		});

},
	//跟踪订单
	_trackOrder : function(){
		$('.logisticsblock').addClass('hasit');
		$('.a-showstatusInfo').on('click',function(){
			$('.logisticsblock').show();
			if(!$('.produceblock').hasClass('hasit')){
				$('.producelog').eq(ix).hide(300);
				$('.produceblock').slideUp(300).addClass('hasit');
			}
			var ix = $('.a-showstatusInfo').index($(this));
			if($('.logisticsblock').hasClass('hasit')){//展开
				$('.orderlog').eq(ix).show(300);
				$('.logisticsblock').removeClass('hasit');				
			}else{//关闭
				$('.orderlog').eq(ix).hide(300);
				$('.logisticsblock').slideUp(300).addClass('hasit');				
			}
			return false;
		});
	},

	//跟踪生产流程
	_trackProduce : function(){
		$('.produceblock').addClass('hasit');
		$('.a-showproduceInfo').on('click',function () {
			$('.produceblock').show();
			if(!$('.logisticsblock').hasClass('hasit')){
				$('.orderlog').eq(ix).hide(300);
				$('.logisticsblock').slideUp(300).addClass('hasit');
			}
			var ix = $('.a-showproduceInfo').index($(this));
			if($('.produceblock').hasClass('hasit')){//展开
				$('.producelog').eq(ix).show(300);
				$('.produceblock').removeClass('hasit');				
			}else{//关闭
				$('.producelog').eq(ix).hide(300);
				$('.produceblock').slideUp(300).addClass('hasit');				
			}
			return false;
		});
	},

	//继续付款
	_payLink : function(){
		$('.paylink').click(function () {
			var cmpnId=20000250,actInfo=(new Date()).getTime(), weight=1,tagStr='fukuan'; admBcnActGen(cmpnId,actInfo,weight,tagStr);
		});
	},
	//礼品卡付款
	_giftPay : function(){		
		//console.log(ehaier.domainUrl.isGiftCardOrder == '1')
	if(ehaier.domainUrl.isGiftCardOrder == '1'){
		$('#downloadGiftCard').click(function () {
		var downloadPassword = $('#downloadPassword').val();
		var downloadStr = $('#downloadStr').val();
		$.ajax({
			type : 'get',
			url : ehaier.domainUrl.baseDomain+'/memberorder.php?a=getGiftCard',
			data : {"dowloadStr":downloadStr, "downloadPassword":downloadPassword},
			dataType : 'jsonp',
			success : function (data) {
				var giftCardDetail = $("#giftCardDetail");
				giftCardDetail.empty();
				var tempHtml ='';
				
					var i=1;
					for (key in data.result) {
						tempHtml += '<p><label>'+i + '、' + '卡号：' + data.result[key] + '  密码：' + key+'</label></p>';
						i++;
					}
				
				giftCardDetail.append(tempHtml);
				if (data.message) {
					$.sobox.alert('提示',data.message);
				}
			}
		});
	});
			}
		},
		
	
	//快递信息查询
	_checkShipping : function(){
		$('.logistics a').click(function () {		
			var href = $(this).attr('href');
			//console.log(href);
			$.ajax({
				url : href,
				beforeSend: function(){
					$('#loading').css("display","block");
					$('#loading').html('<img src="<img src="http://cdn09.ehaier.com/v3/images/loading.gif" width="35" height="35" />')
					},
				success : function (data) {
					var data = data.data;
					//console.log(data);
					if (data) {
						var acceptHtml = '<div class="acceptBox">';		
						$.each(data, function(k,v){
							acceptHtml += '<p class="p-accept"><span class="s-time">'+v.acceptTime+'</span><span class="s-address">'+v.acceptAddress+'</span><span class="s-remark">'+v.remark+'</span></p>';
						});
						acceptHtml +='</div>'
					}
					$('#loading').css("display","none");
					$('#loading').html('');	
					$.sobox.pop({
						title : '快递信息',
						width: 550,
						content : acceptHtml,
						btn:[{text:'确定'}]
					});
				}

			});
			return false;
		});
	},

	_delImg : function(){//删除图片
//		$('.s-delpic').mouseover(function(){
//			$(this).parent().css({"background":"#000","opacity":"0.8"});
//			$(this).css({"opacity":"1"})
//		})
//		$('.s-delpic').mouseout(function(){
//			$(this).parent().css("background","none");
//			$(this).css({"opacity":"0"})
//		})
//		$('.dd-showoff').click(function(){
//			$(this).hide(500);
//		})
		
	},

	_showReply:function(){//滑出回复框
		$('.b-down').click(function(){
			var downbox = $(this).closest('.js_head').next('.js_downbox');
			if(downbox.is(':visible')){
				$(this).closest('.js_head').next('.js_downbox').hide(300);
				$(this).css('background-position','70px -663px');
				} else{
					$('.js_downbox').hide(100);
					$("html,body").stop().animate({'scrollTop': $(this).closest('.js_head').next('.js_downbox').offset().top})
					$(this).closest('.js_head').next('.js_downbox').show(500);
					$(this).css('background-position','70px -646px')					
					} 
			
		})
	},
	// _replyMsg:function(){//滑出回复框
	// 	$('.s-replybtn').attr('num','0');
	// 	$('.s-replybtn').click(function(){
	// 		if($(this).attr('num')==0){
	// 			$(this).attr('num','1');
	// 			var replybox = $(this).closest('.dd-replybox');
	// 			replybox.append('<p class="p-textreply"><textarea class="text-reply-box"></textarea><input type="submit" value="回复" class="btn-reply"></p>').slideDown(500);
	// 			$("html,body").stop().animate({'scrollTop': $(this).closest('.commented').offset().top})
	// 			var replyer = replybox.find('.a-replyer').html();
	// 			var replyTo = '回复 '+replyer+'：';
	// 			replybox.find('.text-reply-box').html(replyTo);

	// 		}else{
	// 			$(this).attr('num','0');
	// 			$(this).closest('.dd-replybox').find('.p-textreply').remove();
	// 			}			

	// 	})
	// },
	_selCom : function(){//选择自定义评价tag
		$('.s-tags').click(function(){
			if($(this).hasClass('s-tagged')){
				$(this).removeClass('s-tagged');
			}else{
				$(this).addClass('s-tagged');
//                var hiddenVal = ',' + $(this).attr('data_id');
            }
//            $(this).parent().children('input').attr('value', hiddenVal);
		})
	},
	_diyTag:function(){//自定义评价tag
		$('.s-diytag').click(function(){
            var addtagLeng = $(this).parent().children('.addtag').length;
            if(addtagLeng>=10){
                $.sobox.alert('提示',"最多只能添加10个");
                return;
            }


			$(this).before('<input type="text" maxlength="20" class="addtag" />');
			$('.addtag').keypress(function(event){  
				var keycode = (event.keyCode ? event.keyCode : event.which);  
				if(keycode == '13'){  
					var newTag = $(this).val();
					if(newTag==''){
						$(this).remove();
					}else{
						$(this).before('<span class="s-tags s-tagged" style="cursor:default;">'+newTag+'<em class="em-newtag"></em></span>');
						$(this).remove();
						}
					 
				}  
					$('.em-newtag').click(function(){
					$(this).parent('.s-tags').remove();
				})
			});	
			
			
		});
		
	},
	//综合评分数字
	_readScore:function(){    
    $('.ratescore').children('img').click(function(){
      var mark = $(this).attr('alt');
      $(this).closest('dt').find('.b-sumscore').html(mark);
    })
  },

  //placeholder
  _placeHolder : function(){
  	$('.text-com-box').html('其他买家需要你的帮助，写下您的评价吧...最多300字').css({ color: "#999",'font-size': "12px" });
	$('.text-com-box').focus(function(){
		if($(this).val()=='其他买家需要你的帮助，写下您的评价吧...最多300字')
			{$(this).val('').css('color','#333');}
		
	}).blur(function(){
		if($(this).val().length == 0){
		$(this).val('其他买家需要你的帮助，写下您的评价吧...最多300字').css({ color: "#999", 'font-size': "12px" });
		}
	});
  },
  //上传按钮下划线
  _underline : function(){
  	$('.s-showbtn').mouseover(function(){
  		$(this).find('.txt_white').css('text-decoration','underline');
  	})
  	$('.s-showbtn').mouseout(function(){
  		$(this).find('.txt_white').css('text-decoration','none');
  	})
  },
  //bindcoupon
  _bindCoupon:function(){
  		$('.pink').click(function(){
  			$(this).hide().next('span').show();
  		})
		
	},

	//使用优惠券
	_memberApplyCoupon : function() {
		$('.js_applyCoupon').click(function(){
			var couponSn = $(this).parent('span').find('.text');
			var v = couponSn.val();
			memberUseCoupon({sn:v, id:$(this).attr('id')});

		function memberUseCoupon(data) {
		$.ajax({
			type : 'GET',
			dataType :'json',
			url : ehaier.domainUrl.memberBaseDomain+'/useCoupon',
			data : 'sn='+data.sn+'&id='+data.id,
			async: false,
			beforeSend: function(){
							$('#loading').css("display","block");
							$('#loading').html('<img src="http://cdn09.ehaier.com/v3/images/loading.gif" width="35" height="35" />')
							},
			success : function (data) {
				if (data.success) {
					$('#loading').css("display","none");
					$('#loading').html('');	
					$.sobox.pop({
						title : '提示',
						content : '优惠券使用成功,优惠券金额为:<b class="haierred">' + data.data + '</b>元!',
						cls: 'popAlert',
						btn:[{text : '确定',callback:function () {
							window.location.reload(true);
						}}]
					})
					} else {
						$('#loading').css("display","none");
						$('#loading').html('');	
						$.sobox.pop({
							title:'提示',
							content:data.message,
							btn:[{text:'确定'}]
							})
						}
					}
				});
		
			}
		})
		
	}


}


function getCSRFTokenParam (){
		var cSRFTokenParam = 'CSRFToken=';
		cSRFTokenParam += $("input[name='CSRFToken']").val();
		cSRFTokenParam += '&CSRFMemKey=';
		cSRFTokenParam += $("input[name='CSRFMemKey']").val();
		return cSRFTokenParam;
	  }
function refrushCSRFToken(csrfToken){
		$("input[name='CSRFToken']").val(csrfToken);
		}

/*use*/
$(function () {
	ehaier.member.init();
	//orderSearch();
	ehaier.order.init();
});

/*订单搜索*/
ehaier.order = {
	init: function(){
		if($('.search-keywords').length){
			this._placehoder();
			this._searchSubmit();
		}
		
	},
	_placehoder: function(){ //placehoder 
		var that = this;
		var $orderSearch = $('.search-keywords');
		var $placeHoder = $('.f-placehoder');
		var $val = $orderSearch.val();
		
		if($val == ""){
			$placeHoder.show();
		};

		$orderSearch.blur(function(){
			var curval = $(this).val();
			if(curval == ""){
				$placeHoder.show();
			}
		});

		$placeHoder.on("click",function(event){
			$(this).hide();
			$orderSearch.focus();
		});

		$orderSearch.focus(function(){
			$placeHoder.hide();
		}).blur(function(){
			var curval = $(this).val();
			if(curval !== ""){
				$placeHoder.hide();
			}else{
				$placeHoder.show();
			}
		});
		$orderSearch.keydown(function (e) {
			var ev = document.all ? window.event : e;  
			if(ev.keyCode == 13) {
				var queryInfo = encodeURIComponent($(".search-keywords").val().replace(/^\s+|\s+$/g,""));
				$("#queryInfo").val(queryInfo);
				$('#form_search').submit();
			}
		});
	},
	_searchSubmit: function(){ //订单查询
		var submitBtn = $('#btn_search');
		submitBtn.on('click',function(event){
			var queryInfo = encodeURIComponent($(".search-keywords").val().replace(/^\s+|\s+$/g,""));
			$("#queryInfo").val(queryInfo);
			$('#form_search').submit();
		});
	}
};


