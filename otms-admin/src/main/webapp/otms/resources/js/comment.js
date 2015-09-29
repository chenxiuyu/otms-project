/**
 * Created by zhaozhx on 14-5-13.
 */
$(function(){
    $("[name=uploadImg]").multiupload();

    $('.cm_grey').on('click',function(){
        $('#sharepics').load($(this).attr('ajaxUrl'));
    })
    $('.jp-next').on('click',function(){
        $('#sharepics').load($(this).attr('ajaxUrl'));
    })

    $('.dd-commit').click(function(){
        var dl = $(this).closest("dl");

        var comment = dl.find('textarea').val();//评价、使用心得
        var anonymityFlag = dl.find('input[name="anonymityFlag"]').is(":checked") == true?1:0;//匿名评价
        var start = dl.find('div[class=ratescore]').children('input').val() == undefined?-1:dl.find('div[class=ratescore]').children('input').val();//综合评分
        var appendStart = '';//星级评分

        var impression = '';//大家印象、最佳用途
        var impressionEveryCustom = '';//自定义大家印象
        var impressionBestCustom = '';//自定义最佳用途
        var filedId = '';//上传图片

        var productId = dl.find('input[name="productId"]').val();
        var orderProductId = dl.find('input[name="orderProductId"]').val();

        var startEle = dl.find('dd[class="clearboth mlft_25"]');
        if(startEle && startEle.length > 0){
            for(var i = 0; i < startEle.length; i++){
                appendStart += $(startEle[i]).children().children().find('input[type="hidden"]').val() + ',';
            }
        }

        var impressionEveryEle = dl.find('span[name="every"][class="s-tags s-tagged"]');
        if(impressionEveryEle && impressionEveryEle.length > 0){
            for(var i = 0; i < impressionEveryEle.length; i++){
                impression += $(impressionEveryEle[i]).attr('data_id') + ',';
            }
        }
        var impressionEveryCustomEle = dl.find('dd[name="everydd"]').children().find('input');
        if(impressionEveryCustomEle && impressionEveryCustomEle.length > 0){
            for(var i = 0; i < impressionEveryCustomEle.length; i ++){
                impressionEveryCustom += $(impressionEveryCustomEle[i]).val() + ',';
            }
        }

        var impressionBest = dl.find('span[name="best"][class="s-tags s-tagged"]');
        if(impressionBest && impressionBest.length > 0){
            for(var i = 0; i < impressionBest.length; i++){
                impression += $(impressionBest[i]).attr('data_id') + ',';
            }
        }
        var impressionBestCustomEle = dl.find('dd[name="bestdd"]').children().find('input');
        if(impressionBestCustomEle && impressionBestCustomEle.length > 0){
            for(var i = 0; i < impressionBestCustomEle.length; i ++){
                impressionBestCustom += $(impressionBestCustomEle[i]).val() + ',';
            }
        }

        var filedIdEle = dl.find('.ul-showoff').find('input');
        if(filedIdEle && filedIdEle.length > 0){
            for(var i = 0; i < filedIdEle.length; i++){
                filedId += $(filedIdEle[i]).val() + ',';
            }
        }

        var tmp = '';
        if(-1 != start){
            tmp = '评价内容';
        }else{
            tmp = '使用心得'
        }
        if('' == comment || '其他买家需要你的帮助，写下您的评价吧...最多300字' == comment){
            //$.sobox.alert('提示', '请填写' + tmp);
            $.sobox.pop({
                title : '提示',
                content : '请填写' + tmp,
                btn:[{text : '确定',callback:function(){
                    dl.find('textarea').focus();
                }}]
            });

            return;
        }

        $.ajax({
            type:'post',
            url: ehaier.domainUrl.memberBaseDomain+'/saveComments',
            dataType: 'json',
            data:
                'comment='+comment+
                '&anonymityFlag='+anonymityFlag+
                '&impression='+impression+
                '&impressionEveryCustom='+impressionEveryCustom+
                '&impressionBestCustom=' +impressionBestCustom+
                '&orderProductId=' + orderProductId+
                '&productId=' + productId+
                '&start=' + start +
                '&appendStart=' + appendStart +
                '&filedId=' + filedId +
                "&"+getCSRFTokenParam(),
            cache:false,
            success:function(data){
                if (data && null != data.data && data.data == true) {
                    window.location.href=ehaier.domainUrl.memberBaseDomain + '/comment.html';
                }else{
                    refrushCSRFToken(data.csrfToken);
                    $.sobox.alert('提示', data.message);
                }
            }
        });

    });

    $('.ul-showoff').on('click', 'li.li-showoff', function() {
      var totalIndex = $(this).closest('.dl-comment').find('li.li-showoff').length - 1;
      var totalCount = Number($(this).closest('.dl-comment').find('input[name="fileIndex"]').val());

      if (totalIndex <= 0) {
        totalIndex = 0;
      } else {
        totalIndex--;
      }

      $(this).closest('.dl-comment').find('.s-picnum').html('' + totalIndex + '/10');
      $(this).closest('.dl-comment').find('input[name="fileIndex"]').val(--totalCount);
      $(this).remove();
    });

    if(showDlId && showDlId.length > 0){
        var el = $(showDlId).first();
        var elOffset = el.offset().top;
        var elHeight = el.height();
        var windowHeight = $(window).height();
        var offset;

        if (elHeight < windowHeight) {
            offset = elOffset - ((windowHeight / 2) - (elHeight / 2));
        }
        else {
            offset = elOffset;
        }
        var speed = 700;
        $('html, body').animate({scrollTop:offset}, speed);
    }

})

function getCSRFTokenParam(){
    var cSRFTokenParam = 'CSRFToken=';
    cSRFTokenParam += $("input[name='CSRFToken']").val();
    cSRFTokenParam += '&CSRFMemKey=';
    cSRFTokenParam += $("input[name='CSRFMemKey']").val();
    return cSRFTokenParam;
}

function refrushCSRFToken(csrfToken){
    $("input[name='CSRFToken']").val(csrfToken);
}