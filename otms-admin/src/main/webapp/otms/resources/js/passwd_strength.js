/**
 * Created by yintao on 14/12/3.
 */
function pwdLevel(value) {
    var pattern_1 = /^.*([\W_])+.*$/i;
    var pattern_2 = /^.*([a-zA-Z])+.*$/i;
    var pattern_3 = /^.*([0-9])+.*$/i;
    var level = 0;
    if (value.length > 10) {
        level++;
    }
    if (pattern_1.test(value)) {
        level++;
    }
    if (pattern_2.test(value)) {
        level++;
    }
    if (pattern_3.test(value)) {
        level++;
    }
    if (level > 3) {
        level = 3;
    }
    return level;
}

function pwdStrength(pwd,element) {
    var value = pwd.val();
    if (value.length >= 6) {
        pwd.removeClass('focus');
        element.empty();
        element.show();
        var level = pwdLevel(value);
        switch (level) {
            case 1:
                element.removeClass().addClass("strengthA");
                break;
            case 2:
                element.removeClass().addClass("strengthB");
                break;
            case 3:
                element.removeClass().addClass("strengthC");
                break;
            default:
                break;
        }
    } else {
        element.hide();
    }
}