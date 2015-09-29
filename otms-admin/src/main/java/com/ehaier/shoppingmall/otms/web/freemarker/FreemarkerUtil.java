package com.ehaier.shoppingmall.otms.web.freemarker;

import org.springframework.util.StringUtils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;

public class FreemarkerUtil {

    private static Calendar                startTime = new GregorianCalendar();
    private static Calendar                endTime   = new GregorianCalendar();

    static {
        startTime.set(GregorianCalendar.YEAR, 2014);
        startTime.set(GregorianCalendar.MONTH, 7);
        startTime.set(GregorianCalendar.DAY_OF_MONTH, 15);
        startTime.set(GregorianCalendar.HOUR_OF_DAY, 10);
        startTime.set(GregorianCalendar.MINUTE, 0);
        startTime.set(GregorianCalendar.SECOND, 0);

        endTime.set(GregorianCalendar.YEAR, 2014);
        endTime.set(GregorianCalendar.MONTH, 8);
        endTime.set(GregorianCalendar.DAY_OF_MONTH, 19);
        endTime.set(GregorianCalendar.HOUR_OF_DAY, 00);
        endTime.set(GregorianCalendar.MINUTE, 0);
        endTime.set(GregorianCalendar.SECOND, 0);

    }

    public static String formatter920Price(String price) {
        Date now = new Date();
        Date startDate = startTime.getTime();
        Date endDate = endTime.getTime();

        if (now.getTime() >= startDate.getTime() && now.getTime() <= endDate.getTime()) {
            if (price.length() == 3) {
                price = "?" + price.substring(1, price.length());
            } else if (price.length() == 4) {
                price = price.substring(0, 1) + "?" + price.substring(2, price.length());
            }
        }
        return price;
    }

    /**
     * 比较两个日期字符串大小
     * <p>
     *     返回值说明
     *     <li>-2 参数为空</li>
     *     <li>-3 格式错误</li>
     *     <li>-0 日期相等</li>
     *     <li>-1 第一个日期小于第二个日期</li>
     *     <li>1 第一个日期大于第二个日期</li>
     * </p>
     * @param dateStrSource 第一个日期
     * @param dateStrTarget 第二个日期
     * @return int
     */
    public static int isFirstDateBigger(String dateStrSource,String dateStrTarget){
        if(StringUtils.hasText(dateStrSource) ||StringUtils.hasText(dateStrTarget)){
            return -2;
        }
        //转换日期
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date dateSource;
        Date dateTarget;
        try {
            dateSource = format.parse(dateStrSource);
            dateTarget = format.parse(dateStrTarget);
        }catch (ParseException e) {
            return -3;
        }
        return dateSource.compareTo(dateTarget);
    }
}
