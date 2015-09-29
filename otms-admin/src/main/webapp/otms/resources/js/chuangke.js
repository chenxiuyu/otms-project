/*function area*/

var ehaier = ehaier || {};



ehaier.chuangke = {

	init: function(){

		var that = this;



		if($('.valiform-qsheet').length){
			$('.valiform-qsheet').soValidate();
			// $('.js_submit').click(function(){
			// 	var textques = $('.text-ques').val();
			// 	if(textques == '请用不多于500字来阐述你对创客的理解'){
			// 		$('.em-ques').css('display','block');
			// 	}else{
			// 		$('.em-ques').css('display','none');
			// 	}
			// })
			// $('.text-ques').blur(function(){
			// 	var textques = $('.text-ques').val();
			// 	if(textques == '请用不多于500字来阐述你对创客的理解'){
			// 		$('.em-ques').css('display','block');
			// 	}else{
			// 		$('.em-ques').css('display','none');
			// 	}
			// })
			$('.a-qcode').mouseover(function(){
				$(this).addClass('a-qcode-over');
				
				$('.img-wx2w').attr('src',$('.img-wx2w').attr('src3'));
			}).mouseleave(function () {

				$(this).removeClass('a-qcode-over');
			});


		}

		if($('.valiform').length){

			$('.valiform').soValidate();

			

		}

		that._placeHolder('.valiphone','请输入手机号或8位员工号');

		that._placeHolder('.valiid','身份证后六位');

	},

	  _placeHolder : function(a,b){

	  	$(a).html(b).css({ color: "#999",'font-size': "12px" });

		$(a).focus(function(){

			if($(this).val()==b)

				{$(this).val('').css('color','#333');}

			

		}).blur(function(){

			if($(this).val().length == 0){

			$(this).val(b).css({ color: "#999", 'font-size': "12px" });

			}

		});

  }

}

/*use*/

$(function () {

	ehaier.chuangke.init();

});

