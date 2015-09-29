function DateDiff(sDate1, sDate2){  
    var aDate, oDate1, oDate2, iDays
    aDate = sDate1.split('-');
    oDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]);
    aDate = sDate2.split('-');
    oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]);
    iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 /24);
    return iDays
}

/**
 * Function      : Erase space
 * @param        : value
 * @return       : 
 */
 function trimmed(value)
 {
     value = value.replace(/^\s+/, "");  // remove leading white spaces
     value = value.replace(/\s+$/g, ""); // remove trailing while spaces
     return value;
 }
/**
 * Function:绑定日历控件
 * @param:warpSet 控件
 * @param:options 具体参照my97的设置，如"el", "vel", "weekMethod", "lang", "skin", "dateFmt"
 */
function bindCalendar(warpSet, options) {
	warpSet.my97(options);
}