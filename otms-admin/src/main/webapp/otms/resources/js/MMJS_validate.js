jQuery.fn.MMJS_getEID = function(){
    var EID = '';
    this.each(function(){
        var $this = jQuery(this);
        EID = $this.data('EID');
        if ( !EID ){
            $this.data('EID','');
            for( var k in $this[0] ){
                if ( /jQuery([\d]+)/.test(k) ){
                    EID = k + '_' + $this[0][k];
                    $this.data('EID',EID);
                    $this.addClass(EID);
                }
            }
        }
        return;
    });
    return EID;
}

/* ************* jQuery.fn.MMJS_validation *****************
 jQuery.fn.MMJS_validation
 表单验证：
 验空 .jsv_required
 验邮箱 .jsv_email
 验相等 .jsv_equal_*
 验证手机 .jsv_cellphone
 验证纯数字 .jsv_digit
 验证数字(允许数字和点) .jsv_number

 <form class="js_mmjs_validation">

 <tr>
 <th scope="row">E-mail</th>
 <td class="js_mmjs_validation_fe_wrap">
 <input type="text" title="" class="fe_text jsv_required jsv_email" title="error_info_1|error_info_2" name="email">
 <span class="js_validation_marked_info"></span>
 </td>
 </tr>

 </form>


 .info_error{
 color:#fff;
 }



 //无AJAX验证示例
 jQuery(function(){
 jQuery('.js_mmjs_validation').MMJS_validation().each(function(){
 jQuery(this).submit( function(){
 if ( !jQuery(this).MMJS_validate() ){
 return false;
 }else{
 return true;
 }
 } );
 });
 });





 //AJAX验证示例
 jQuery(function(){
 jQuery('.js_mmjs_validation').MMJS_validation().each(function(){
 var $_root_form = jQuery(this);

 jQuery(this).submit( function(){

 if ( !jQuery(this).MMJS_validate() ){
 return false;
 }else{
 //ajax check user_account
 if ( !$_root_form.find('[name=user_account]').MMJS_validation_ajax( 'identifying_email.php',
 function( str ){
 if ( str == 'no_exist' ){

 return true;
 }else{
 return '用户名已存在';
 }
 },
 {
 'type':'post'
 }
 ) ){
 return false;
 }

 // if no ajax check fail, then submit
 return true;
 }
 } );
 });
 });
 </script>




 *********************************************************** */
jQuery.fn.MMJS_validation = function(){
    return this.each(function(){
        var $form = jQuery(this);
        var fe_list = [];


        var fe_validation_list = [];
        $form.find('input,textarea,select').each(function(){
            var $fe = jQuery(this);

            var fe_class = $fe.attr('class');
            if ( !fe_class ) return;

            var class_name_da = $fe.attr('class').split(/\s/);

            var validation_list = [];

            for ( var i=0,l=class_name_da.length;i<l;i++ ){
                if ( class_name_da[i]=='jsv_lazy' ){
                    validation_list.push( {'rule':'lazy'} );
                }
                if ( class_name_da[i]=='jsv_required' ){
                    validation_list.push( {'rule':'required'} );
                }
                if ( class_name_da[i]=='jsv_email' ){
                    validation_list.push( {'rule':'email'} );
                }
                if ( class_name_da[i]=='jsv_phone' ){
                    validation_list.push( {'rule':'phone'} );
                }
                if ( class_name_da[i]=='jsv_cellphone' ){
                    validation_list.push( {'rule':'cellphone'} );
                }
                if ( class_name_da[i]=='jsv_digit' ){
                    validation_list.push( {'rule':'digit'} );
                }
                if ( class_name_da[i]=='jsv_number' ){
                    validation_list.push( {'rule':'number'} );
                }
                var m =/jsv_equal_([\w]+)/.exec(class_name_da[i])
                if ( m && m.length ){
                    validation_list.push( {'rule':'equal','meta':m[1]} );
                }
                var m =/jsv_minlength_([\d]+)/.exec(class_name_da[i])
                if ( m && m.length ){
                    validation_list.push( {'rule':'minlength','meta':m[1]} );
                }
            }

            if ( validation_list.length ){
                var error_info = $fe.attr('title');
                if ( $fe.data('error_info') ){
                    var error_info = $fe.data('error_info');
                }
                fe_list.push($fe);
                $fe.data( 'mmjs_validation_error_info',error_info );
                $fe.data( 'mmjs_validation_rules',validation_list );
            }

        });

        for( var i=0,l=fe_list.length;i<l;i++ ){
            if ( !fe_list[i].data('error_info') ){
                fe_list[i].data('error_info',fe_list[i].attr('title'));
                fe_list[i].attr('title','');
            }
        }

    });
}

jQuery.fn.MMJS_validate = function( can_be_lazy ){
    var validated = true;
    var $form = jQuery(this);
    var $fe = $form.find('input,textarea,select');

    var $global_notice = $form.find('.js_mmjs_validation_global_notice');

    var can_be_lazy = can_be_lazy ? true : false;

    var equal_first = {};

    var mark_info_by_name = {};
    var mark_info_by_wrap = {};

    //validate each form element
    $fe.each(function(){
        var $fe_item = jQuery(this);

        //get the form element's wrap element ,which will show the error info in the bottom of it.


        var $fe_item_parent = $fe_item.parents('.js_mmjs_validation_fe_wrap').first();

        var fe_name = $fe_item.attr('name');
        mark_info_by_name[fe_name] = mark_info_by_name[fe_name] ? mark_info_by_name[fe_name] : {};

        //EID is refer to the "Element ID", which use the jQuery element identify technology. It require the "MMJS_getEID" extension.
        //The EID is used to identify the specific wrap element, since the jQuery Object or DOM Object can not use as a key in an Object.
        var wrap_EID = $fe_item_parent.MMJS_getEID();
        mark_info_by_wrap[wrap_EID] = mark_info_by_wrap[wrap_EID] ? mark_info_by_wrap[wrap_EID] : {};

        //get the inited rule of the form element
        var rule = $fe_item.data( 'mmjs_validation_rules' );

        //regist the form element's focuseout/change event ONCE.
        var fe_event_registed = $fe.attr('mmjs_validation_fe_event_registed');
        if ( !fe_event_registed ){
            $fe.focusout(function(){
                $form.MMJS_validate( true );
            }).change(function(){
                $form.MMJS_validate( true );
            });
            $fe.attr('mmjs_validation_fe_event_registed',true);
        }

        // if the form element has a validate rule, then will start validation

        if ( rule && $fe_item.is(':visible') ){
            //parse the error info ( divided by "|" and indexed as the order of the validation class )
            var error_info = $fe_item.data( 'mmjs_validation_error_info' ) || '';
            var error_info_da = error_info.split('|');

            //global var of wether this form element is marked as "invalid" or not.
            var marked = false;
            var marked_info = '';

            // get the value of the form element ( if the checkbox or radio have the same name, then it will validate as a group.
            // but the validation will excute every time when pass the form element - though it will get the same result. )
            var val = '';
            if ( $fe_item.is('[type=checkbox]') ){
                val = [];
                $form.find( '[name="' + $fe_item.attr('name') + '"]:checked' ).each(function(){
                    val.push( jQuery(this).val() );
                });
            }else if( $fe_item.is('[type=radio]') ){
                val = $form.find( '[name="' + $fe_item.attr('name') + '"]:checked' ).val();
            }else{
                val = $fe_item.val();
            }
            val = jQuery.trim(val);

            // examine the value rule by rule.
            // if the element is marked( not pass the earlier rule ), then the remaining rules will not examine.
            for( var i_rule=0,l_rule=rule.length;i_rule<l_rule;i_rule++ ){
                if ( !marked ){
                    var rule_method = rule[i_rule].rule;
                    var rule_meta = rule[i_rule].meta;

                    if( rule_method == 'lazy' && can_be_lazy ){
                        break;
                    }

                    switch( rule_method ){
                        case 'required':
                            if( !val ){
                                marked = true;
                                marked_info = error_info_da[i_rule];
                            }
                            break;
                        case 'email':
                            var email_regexp = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                            if( val && !email_regexp.test(val) ){
                                marked = true;
                                marked_info = error_info_da[i_rule];
                            }
                            break;
                        case 'phone':
                            var phone_regexp = /^(0\d{2,3})-(\d{7,8})(-(\d{2,}))?$/;
                            if( val && !phone_regexp.test(val) ){
                                marked = true;
                                marked_info = error_info_da[i_rule];
                            }
                            break;
                        case 'cellphone':
                            var cellphone_regexp = /^1[\d]{10}$/;
                            if( val && !cellphone_regexp.test(val) ){
                                marked = true;
                                marked_info = error_info_da[i_rule];
                            }
                            break;
                        case 'digit':
                            var digit_regexp = /^[\d]+$/;
                            if( val && !digit_regexp.test(val) ){
                                marked = true;
                                marked_info = error_info_da[i_rule];
                            }
                            break;
                        case 'number':
                            var number_regexp = /^[\d]+([\.][\d]+){0,1}$/;
                            if( val && !number_regexp.test(val) ){
                                marked = true;
                                marked_info = error_info_da[i_rule];
                            }
                            break;
                        case 'equal':
                            if ( typeof equal_first[rule_meta] == 'undefined' ){
                                equal_first[rule_meta] = val;
                            }else if( val != equal_first[rule_meta] ){
                                marked = true;
                                marked_info = error_info_da[i_rule];
                            }
                            break;
                        case 'minlength':
                            var min_length = parseInt(rule_meta);
                            if ( val.length < min_length ){
                                marked = true;
                                marked_info = error_info_da[i_rule];
                            }
                            break;
                    }
                }

                mark_info_by_name[fe_name][marked_info]=marked_info;
                mark_info_by_wrap[wrap_EID][marked_info]=marked_info;

                var $mark_info = $fe_item_parent.find('.js_validation_marked_info').removeClass('info_notice').removeClass('info_success').addClass('info_error');
                $fe_item_parent.removeClass('wrap_info_notice').removeClass('wrap_info_success').addClass('wrap_info_error');

                if ( !$mark_info.length ){
                    var $mark_info = jQuery( '<span class="info_error js_validation_marked_info"></span>' );

                    var $error_holder = $fe_item_parent.find('.js_mmjs_validation_error_holder');
                    if ( $error_holder.length ){
                        $error_holder.append( $mark_info );
                    }else{
                        $fe_item_parent.append( $mark_info );
                    }
                }

                if( marked ){
                    validated = false;
                    var marked_info_da = [];
                    for ( var k_info in mark_info_by_wrap[wrap_EID] ){
                        if ( k_info ){
                            marked_info_da.push(k_info);
                        }
                    }
                    $mark_info.html( marked_info_da.join('<br />') ).show();
                    $fe_item.removeClass('info_notice').removeClass('info_success').addClass('info_error');
                    $fe_item_parent.removeClass('wrap_info_notice').removeClass('wrap_info_success').addClass('wrap_info_error');
                }else{
                    $mark_info.text( '' ).hide();
                    $fe_item.removeClass('info_notice').removeClass('info_success').removeClass('info_error');
                    $fe_item_parent.removeClass('wrap_info_notice').removeClass('wrap_info_success').removeClass('wrap_info_error');
                }

            }
        }
    });

    if ( $global_notice.length ){
        var global_notice_da = [];
        for( var name in mark_info_by_name ){
            for( var notice in mark_info_by_name[name] ){
                global_notice_da.push(notice);
            }
        }
        if ( global_notice_da ){
            $global_notice.html( global_notice_da.join('<br />') ).addClass('info_error').show();
        }else{
            $global_notice.html( '' ).removeClass('info_error').show();
        }

    }


    return validated;

}


//ajax validation
/*
 获取选定表单元素的name和value发送到url指定的api接口，获取的返回字符串发送给check_callback生成出错字符串或者返回true提交表单。
 _ajax_options指定特殊的ajax参数。
 */
jQuery.fn.MMJS_validation_ajax = function( url,check_callback,_ajax_options ){
    var $fe = jQuery(this).eq(0);
    var $wrap = $fe.parents('.js_mmjs_validation_fe_wrap').eq(0);
    var $marked_info = $wrap.find('.js_validation_marked_info');
    var name = $fe.attr('name');
    var value = $fe.val();
    var ajax_options = _ajax_options || {};

    var checked_value = $fe.data( 'MMJS_validation_ajax_checked_value' );
    if ( checked_value == value ){
        return true;
    }

    var data = {};
    data[name] = value;

    ajax_options['url'] = url;
    ajax_options['data'] = data;
    ajax_options['complete'] = function(jqXHR, textStatus){
        switch(textStatus){
            case 'success':
                var check_result = check_callback(jqXHR.responseText);
                if( typeof check_result == 'string' ){
                    $marked_info.text(check_result).show();
                }else if( typeof check_result == 'boolean' && check_result == true ){
                    $fe.data( 'MMJS_validation_ajax_checked_value',value );
                    $fe.eq(0).submit();
                    $marked_info.hide();
                }
                break;
            default:

                break;
        }
    };

    jQuery.ajax(ajax_options);
    return false;
}
