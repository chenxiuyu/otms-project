/* sobox 2.0 */
!function(a,b){a.sobox={maskIndex:0,showMask:function(c){var d=this,e=a(".so-openmask"),f=a(b).height();return e.length?d.maskIndex++:(e=a('<div class="so-openmask"></div>'),a("body").append(e),d.maskIndex=1),e.height(c?f+20:0),e.css("z-index",1e3+10*d.maskIndex),e},show:function(b,c,d){var e=this,f=a(b.obj),g=e.showMask(c);return e.setPos(b),b.onlyOne&&a("body").data("soonlyone",!0),f.css("z-index",1002+10*e.maskIndex).fadeIn(),f.find(".s-close").bind("click",function(){e.hide(f)}),d&&d(),g},hide:function(b,c){var d=this,e=a(".so-openmask");a(b).fadeOut("fast",function(){a("select").show(),c&&c()}),d.maskIndex--,e.css("z-index",1e3+10*d.maskIndex),0==d.maskIndex&&e.remove(),a(b).find(".s-close").unbind("click")},drag:function(c,d){function g(a){null==a&&(a=window.event),e.css({opacity:"0.4",left:a.clientX-posX+"px",top:a.clientY-posY+"px"})}var e=a(c),f=a(d);f.mousedown(function(c){c||(c=window.event),posX=c.clientX-parseInt(e.css("left")),posY=c.clientY-parseInt(e.css("top")),a(b).mousemove(function(a){g(a)})}),a(b).mouseup(function(){a(b).unbind("mousemove"),e.css({opacity:"1"})})},setPos:function(c){var e,f,g,h,i,j,k,l,m,n;switch(c=a.extend({mode:"center",obj:null,pos:[0,0],offset:[0,0]},c),e=a(c.obj),f=Math.floor(e.height()/2),g=Math.floor(e.width()/2),h=a(window).scrollTop(),i=a(window).height(),j=c.pos[0],k=c.pos[1],l=c.offset[0],m=c.offset[1],e.css({position:"fixed"}),"undefined"==typeof b.body.style.maxHeight&&(n=e.find("select"),a("select").not(n).hide()),c.mode){case"win":e.css({left:j+l,top:k+m}),"undefined"==typeof b.body.style.maxHeight&&e.css({position:"absolute",top:h+k+m});break;case"doc":e.css({position:"absolute",left:j+l,top:k+m});break;case"tc":e.css({left:"50%",top:m,marginLeft:-g+l}),"undefined"==typeof b.body.style.maxHeight&&e.css({position:"absolute",top:h+m});break;case"bc":e.css({left:"50%",bottom:m,marginLeft:-g+l}),"undefined"==typeof b.body.style.maxHeight&&e.css({position:"absolute",top:h+m+i});break;default:e.css({top:"50%",left:"50%",marginTop:-f-10+m,marginLeft:-g+l}),"undefined"==typeof b.body.style.maxHeight&&e.css({position:"absolute",top:h+i/2})}},pop:function(b){function j(i){var j,l,m;b=a.extend(b,i||{}),b.showTitle?e.append(f):g.addClass("s-sopop-single-close"),e.append(g).append(h),b.height&&"iframe"!=b.type&&e.css("height",b.height+"px"),e.css({visibility:b.visibility?"visible":"hidden"}),"content"==b.type&&h.html(b.content),"target"==b.type&&(j=a(b.target).show(),h.append(j)),"iframe"==b.type&&(l=a('<iframe src="'+b.iframe+'" width="100%" height="'+b.height+'" frameborder="0" scrolling="auto"></iframe>'),h.html(l)),"ajax"==b.type&&h.load(b.ajax.url,b.ajax.data,function(){c.setPos({mode:b.posType,obj:e,pos:b.pos,offset:b.offset}),b.ajax.callback&&b.ajax.callback()}),b.btn.length>0&&(m=a('<p class="p-so-popBtn"></p>'),a.each(b.btn,function(){var b=a.extend({cls:null,text:"确定",link:"#",removePop:!0,callback:function(){}},this),c=a('<a class="a-sopop-btn" href="'+b.link+'"><span class="s-sopop-btn">'+b.text+"</span></a>");null!==b.cls&&c.addClass(b.cls),c.bind("click",function(){return b.callback&&b.callback(k),b.removePop&&k(),"#"===b.link?!1:!0}),m.append(c)}),e.append(m)),a("body").append(e),b.showTitle&&b.drag&&(f.addClass("h2-sopop-move"),c.drag(e,f)),b.beforePop(e,f,g,h),d=c.show({mode:b.posType,obj:e,pos:b.pos,offset:b.offset,onlyOne:b.onlyOne},b.showMask,b.onPop(k)),g.bind("click",function(){k()}),b.maskClick&&d.bind("click",function(){k()})}function k(d){b=a.extend(b,d||{}),c.hide(e),a("body").removeData("soonlyone"),null!=b.target&&a(b.target).appendTo("body").hide(),e.remove(),b.closePop()}var d,e,f,g,h,i,c=this;return b=a.extend({type:"content",target:null,content:null,iframe:null,ajax:{url:null,data:null,callback:function(){}},posType:"center",pos:[0,0],offset:[0,0],cls:null,width:400,height:null,defaultShow:!0,visibility:!0,title:"提示",showTitle:!0,showMask:!0,onlyOne:!1,drag:!0,maskClick:!0,btn:[],beforePop:function(){},onPop:function(){},closePop:function(){}},b||{}),e=a('<div class="so-popbox '+(b.cls?b.cls:"")+'" style="width:'+b.width+'px;display:none;"></div>'),f=a('<h2 class="h2-sopop"><span class="s-sopop-title">'+b.title+"</span></h2>"),g=a('<span class="s-sopop-close">[关闭]</span>'),h=a('<div class="so-popbox-cont"></div>'),i=a("body").data("soonlyone"),b.defaultShow&&!i&&j(),{wrap:e,opt:b,removePop:k,showPop:j}},alert:function(a,b,c){var d=this;d.pop({cls:"so-popAlert",title:a,width:360,content:b,btn:[{text:"确定",callback:function(){c&&c()}}]})},confirm:function(a,b,c,d){var e=this;e.pop({cls:"so-popConfirm",title:a,width:360,content:b,btn:[{text:"确定",callback:function(){c&&c()}},{text:"取消",cls:"a-sopop-cancel",callback:function(){d&&d()}}]})},tip:function(b){var d,c=this;b=a.extend({cls:"so-popTip",showTitle:!1,posType:"tc",showMask:!1,width:360,stayTime:5e3,offset:[0,12]},b||{}),d=c.pop(b),b.stayTime>0&&setTimeout(function(){d.removePop()},b.stayTime)},loading:function(b){var d,c=this;return b=a.extend({type:"content",cls:"so-loading",showTitle:!1,maskClick:!1,width:80,height:36,content:"",stayTime:0},b||{}),d=c.pop(b),b.stayTime>0&&setTimeout(function(){d.removePop()},b.stayTime),{open:d.showPop,close:d.removePop}}},a.fn.soIframePop=function(b){var c=a.extend({type:"iframe",targetTag:"href",splitString:"#soIframe?",width:800,height:480,showTitle:!1},b||{}),d=[];return this.each(function(){var g,h,b=a(this),e=b.attr(c.targetTag).split(c.splitString),f=e[0];par=e[1]?e[1].split("&"):"",g={},a.each(par,function(){var a=this.split("=");g[a[0]]=a[1]}),c=a.extend(c,g||{}),c.showTitle="true"==c.showTitle?1:+c.showTitle,c.iframe=f,c.defaultShow=!1,h=a.sobox.pop(c),d.push(h),b.click(function(){return h.showPop(),a(this).data("iframePop",h),!1})}),d},a.fn.soSidePop=function(b){var c=a(this),d=b.event||"click";return c.bind(d,function(c){var d=a.extend({showMask:!1,posType:"doc",pos:[c.pageX,c.pageY],offset:[10,10],onlyOne:!0,returnFalse:!0},b||{});return sidepop=a.sobox.pop(d),d.returnFalse?!1:void 0}),c},a.fn.soOverTip=function(b){var c=a(this),d=a.extend({cls:"so-overTip",showMask:!1,posType:"doc",offset:[10,10],showTitle:!1,onlyOne:!0},b||{}),e=null;return c.mouseenter(function(b){d.pos=[b.pageX,b.pageY],e=a.sobox.pop(d)}).mouseleave(function(){e.removePop()}),c}}(jQuery,document);


/*补完邮箱*/
!function(a){a.fn.extend({soEndMail:function(b){var b=a.extend({mail:["163.com","qq.com","126.com","sina.com","sohu.com","yahoo.com.cn","hotmail.com","21cn.com","tom.com","yeah.net","gmail.com","yahoo.cn","263.net","msn.com","foxmail.com","haier.com","yahoo.com","sogou.com","eyou.com","139.com","sina.com.cn"],listWrap:null},b||{});return this.each(function(){var c=a(this),d=b.mail,e=a(b.listWrap),f=-1,g="";c.keyup(function(b){var j,k,l,m,n,h=a.trim(a(this).val()),i=b.keyCode;if(g!=h&&(f=-1,g=h),/^[0-9a-zA-Z_-]{1,31}@[_.0-9a-zA-Z-]{0,31}$/.test(h)){if(j=h.split("@")[0],k=h.split("@")[1],l=a.map(d,function(a){var b=new RegExp("^"+k);return b.test(a)?a:null}),0==l)return e.empty().hide(),void 0;m="",a.each(l,function(a,b){m+='<li class="li-soMailList"><a href="#">'+j+"@"+b+"</a></li>"}),e.html(m).show()}else e.empty().hide();n=e.find("li").length,n>0&&38==i&&(f=f>0?f-1:0,e.find("li").eq(f).addClass("li-now")),n>0&&40==i&&(f=n-1>f?f+1:n-1,e.find("li").eq(f).addClass("li-now")),n>0&&13==i&&(c.val(e.find("li").eq(-1==f?0:f).text()),e.empty().hide(),f=-1)}),a(document).on("click",function(){e.empty().hide()}),a(document).on("click",b.listWrap+" .li-soMailList",function(){return c.val(a(this).text()),e.empty().hide(),f=-1,!1})}),this}})}(jQuery);

(function($){
	var LOGIN = {
		init: function () {
			this.domElem();
			this.events();
			this.validate();
			this.changeValidate();
		},
		domElem: function () {
			this.self = $('#shop_login_form');
			this.username = this.self.find('input[name="username"]');
			this.password = this.self.find('input[name="password"]');
			this.checkbox = this.self.find('input[name="remPas"]');
			this.validcode = this.self.find('input[name="validcode"]');
			this.capsLock = this.self.find('.js-capsLock');
			this.avoidLogin = this.self.find('.js_c_radio');
			this.submitBtn = this.self.find('.js_submit');
		},
		events: function () {
			var that = this;

			$(window).keydown(function(e) {
				if (e.keyCode === 13) {
					that.submitBtn.click();
				}
			});

			that.password.keypress(function(e) {
				if (that.checkCapsLock(e)) {
					that.capsLock.show();
				} else {
					that.capsLock.hide();
				}
			});

			that.avoidLogin.click(function() {
				if ($(this).hasClass('on')) {
					$(this).removeClass('on');
					that.checkbox.prop('checked', false);
				} else {
					$(this).addClass('on');
					that.checkbox.prop('checked', true);
				}
			});
		},
		checkCapsLock: function (event) {
			var capsLockKey = event.keyCode ? event.keyCode : event.which;
			var shifKey = event.shiftKey ? event.shiftKey:((capsLockKey == 16) ? true : false);

			if (((capsLockKey >= 65 && capsLockKey <= 90) && !shifKey)||((capsLockKey >= 97 && capsLockKey <= 122) && shifKey)) {
				return true;
			} else {
				return false;
			}
		},
		validate: function () {
			var that = this;
			var flag = true;

			var error_message = {
				'username_blank':'请输入登录名',
				'username_min_length':'用户名长度不能低于5个字符',
				'username_max_length':'用户名长度不能超出26个字符',
				'password_blank':'请输入密码',
				'password_min_length':'密码不能少于6位',
				'validate_blank':'请输入验证码',
				'validate_equals':'验证码必须4位',
				'validate_error':'验证码错误',
				'validate_get_error':'获取验证码错误'
			};

			that.username.focus(function() {
				$(this).parent().addClass('form_row_focus');
			});

			that.username.blur(function() {
				var value = $.trim($(this).val());
				$(this).parent().removeClass('form_row_focus');
				if (value.length === 0) {
					$(this).parent().addClass('form_row_error');
					$(this).parent().find('.validation_marked_info').html(error_message.username_blank);
					flag = false;
				} else if (value.length > 25) {
					$(this).parent().addClass('form_row_error');
					$(this).parent().find('.validation_marked_info').html(error_message.username_max_length);
					flag = false;
//				} else if (value.length < 5) {
//					$(this).parent().addClass('form_row_error');
//					$(this).parent().find('.validation_marked_info').html(error_message.username_min_length);
//					flag = false;
				} else {
					$(this).parent().removeClass('form_row_error');
					$(this).parent().find('.validation_marked_info').html('');
					flag = true;
				}
			});

			that.password.focus(function() {
				$(this).parent().addClass('form_row_focus');
			});

			that.password.blur(function() {
				var value = $.trim($(this).val());
				$(this).parent().removeClass('form_row_focus');
				if (value.length === 0) {
					$(this).parent().addClass('form_row_error');
					$(this).parent().find('.validation_marked_info').html(error_message.password_blank);
					flag = false;
				} else if (value.length < 6) {
					$(this).parent().addClass('form_row_error');
					$(this).parent().find('.validation_marked_info').html(error_message.password_min_length);
					flag = false;
				} else {
					$(this).parent().removeClass('form_row_error');
					$(this).parent().find('.validation_marked_info').html('');
					flag = true;
				}
			});

			if (that.validcode.length) {
				that.validcode.focus(function() {
					$(this).parent().addClass('form_row_focus');
				});

				that.validcode.blur(function() {
					var value = $.trim($(this).val());

					$(this).parent().removeClass('form_row_focus');
					if (value.length === 0) {
						$(this).parent().addClass('form_row_error');
						$(this).parent().find('.validation_marked_info').html(error_message.validate_blank);
                        flag = false;
					} else if (value.length < 4) {
						$(this).parent().addClass('form_row_error');
						$(this).parent().find('.validation_marked_info').html(error_message.validate_equals);
                        flag = false;
					} else {
						$.get("getValidCode", {
						  random: Math.random(),
						  validcode: value
						}, function(result) {
						  if (result.success) {
						  	$(this).parent().remove('form_row_error');
						   	$(this).parent().find('.validation_marked_info').html('');
						   	flag = true;
						  } else {
						    that.refreshValidate();
						    $(this).parent().find('.validation_marked_info').html(error_message.validate_error);
						    flag = false;
						  }
						});
					}
				});
			}

			that.submitBtn.click(function() {
				setTimeout(function(){
					that.self.submit();
				},0);
			});

			that.self.submit(function() {
				that.username.blur();
				that.password.blur();
                that.validcode.blur();
				if (flag) {
                    that.submitBtn.find('b').html('登 录 中...')
				} else {
                    return false;
                }
			});
		},
		changeValidate: function () {
			var that = this;
			$("#changValidate").click(function(){
				that.refreshValidate();
			});
		},
		refreshValidate: function () {
			setTimeout(function(){
				$("#verifyCodeId").attr("src","getKaptcha3?random="+Math.random());
			},1);
		}
	};

	LOGIN.init();
}(jQuery));