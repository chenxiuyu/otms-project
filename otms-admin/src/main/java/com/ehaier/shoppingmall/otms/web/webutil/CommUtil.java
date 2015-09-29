package com.ehaier.shoppingmall.otms.web.webutil;

import java.io.UnsupportedEncodingException;
import java.text.DateFormat;
import java.text.ParsePosition;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.Random;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * 常用方法类
 *                       
 * @Filename: CommUtil.java
 * @Version: 1.0
 * @Author: weiyunjun
 * @Email: weiyunjun@ehaier.com
 *
 */
public class CommUtil {
    public static String       DEFAULT_PATTERN                      = "yyyy-MM-dd hh:mm:ss";
    // 日期式样，年份，例如：2004，2008
    public static final String DATE_FORMAT_YYYY                     = "yyyy";
    // 日期式样，年份和月份，例如：200707，200808
    public static final String DATE_FORMAT_YYYYMM                   = "yyyyMM";
    // 日期式样，年份和月份，例如：2007-07，2008-08
    public static final String DATE_FORMAT_YYYY_MM                  = "yyyy-MM";
    // 日期式样，年月日，例如：20050630，20080808
    public static final String DATE_FORMAT_YYYYMMDD                 = "yyyyMMdd";
    // 日期式样，年月日，用横杠离开，例如：2006-12-25，2008-08-08
    public static final String DATE_FORMAT_YYYY_MM_DD               = "yyyy-MM-dd";
    // 日期式样，年月日时分秒，例如：20001230120000，20080808200808
    public static final String DATE_TIME_FORMAT_YYYYMMDDHHMISS      = "yyyyMMddHHmmss";
    //用来全局控制上一周，本周，下一周的周数变化
    private static int         weeks                                = 0;
    //一月最大天数
    private static int         MaxDate;
    //一年最大天数
    private static int         MaxYear;
    // 日期式样，年月日时分秒，年月日用横杠离开，时分秒用冒号离开，
    // 例如：2005-05-10 23:20:00，2008-08-08 20:08:08
    public static final String DATE_TIME_FORMAT_YYYY_MM_DD_HH_MI_SS = "yyyy-MM-dd HH:mm:ss";
    //特殊字符串正则
    public static final String REGEX_EXCEPCHAR                      = "[`~!@#$%^&*()+=|{}':;',//[//].<>/?~！@#￥%……&*（）——+|{}【】‘；：”“’。，、？\\[\\]_\\n\\t\\b\\f\\r\\u]";

    /**
     * 字符串和数组校验（excel标题信息校验）
     * @param firstLineData
     * @param checkStr
     * @return
     */
    public static boolean checkDataTemplate(String[] firstLineData, String checkStr) {
        boolean flag = false;
        StringBuffer sb = new StringBuffer();
        for (String str : firstLineData) {
            if (sb.length() > 0)
                sb.append(",");
            sb.append(str.trim());
        }
        if (sb.toString().equals(checkStr))
            flag = true;
        return flag;
    }

    /**
     * 获取现在时间
     * 
     * @return返回字符串格式 pattern
     */
    public static String getCurrentDate(String pattern) {
        if (pattern == null)
            pattern = DEFAULT_PATTERN;
        Date currentTime = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat(pattern);
        return formatter.format(currentTime);
    }

    /**
     * 计算当月最后一天,返回字符串
     * 
     */
    public static String getDefaultDay() {
        String str = "";
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Calendar lastDate = Calendar.getInstance();
        lastDate.set(Calendar.DATE, 1);//设为当前月的1号
        lastDate.add(Calendar.MONTH, 1);//加一个月，变为下月的1号
        lastDate.add(Calendar.DATE, -1);//减去一天，变为当月最后一天
        str = sdf.format(lastDate.getTime());
        return str;
    }

    /**
     * 获取当月第一天
     * 
     */
    public static String getFirstDayOfMonth() {
        String str = "";
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Calendar lastDate = Calendar.getInstance();
        lastDate.set(Calendar.DATE, 1);//设为当前月的1号
        str = sdf.format(lastDate.getTime());
        return str;
    }

    /**
     * 获得当前日期与本周日相差的天数
     * 
     */
    private static int getMondayPlus() {
        Calendar cd = Calendar.getInstance();
        // 获得今天是一周的第几天，星期日是第一天，星期二是第二天......
        int dayOfWeek = cd.get(Calendar.DAY_OF_WEEK) - 1; //因为按中国礼拜一作为第一天所以这里减1
        if (dayOfWeek == 1) {
            return 0;
        } else {
            return 1 - dayOfWeek;
        }
    }

    /**
     * 获得本周星期日的日期
     * 
     */
    public static String getCurrentWeekday() {
        weeks = 0;
        int mondayPlus = getMondayPlus();
        GregorianCalendar currentDate = new GregorianCalendar();
        currentDate.add(GregorianCalendar.DATE, mondayPlus + 6);
        Date monday = currentDate.getTime();
        DateFormat df = DateFormat.getDateInstance();
        String preMonday = df.format(monday);
        return preMonday;
    }

    /**
     * 获得指定日期是星期几  
     * @param sdate  格式：YYYY-MM-DD
     * @return
     */
    public static String getWeek(String sdate) {
        // 再转换为时间
        Date date = getStringToDate(sdate, DATE_FORMAT_YYYY_MM_DD);
        Calendar c = Calendar.getInstance();
        c.setTime(date);
        //        int hour = c.get(Calendar.DAY_OF_WEEK);
        // hour中存的就是星期几了，其范围 1~7
        // 1=星期日 7=星期六，其他类推
        return new SimpleDateFormat("EEEE").format(c.getTime());
    }

    /**
     * 获得指定日期的周数 
     * @param sdate  格式：YYYY-MM-DD
     * @return
     */
    public static Integer getWeekNum(String sdate) {
        // 再转换为时间
        Date date = getStringToDate(sdate, DATE_FORMAT_YYYY_MM_DD);
        Calendar c = Calendar.getInstance();
        c.setTime(date);
        int hour = c.get(Calendar.DAY_OF_WEEK);
        // hour中存的就是星期几了，其范围 1~7
        // 1=星期日 7=星期六，其他类推
        return hour;
    }

    /**
     * 根据某年某月 第几周星期几 得到具体日期
     * 如2009年1月 第二周星期三 得到2009-01-14
     * @param year          年份
     * @param month         月份
     * @param weekOfMonth   这个月的第几周
     * @param dayOfWeek     星期几
     * @return
     */
    public static String weekdatetodata(int year, int month, int weekOfMonth, int dayOfWeek) {
        Calendar c = Calendar.getInstance();
        //计算出 x年 y月 1号 是星期几
        c.set(year, month - 1, 1);

        //如果i_week_day =1 的话 实际上是周日  
        int i_week_day = c.get(Calendar.DAY_OF_WEEK);

        int sumDay = 0;
        //dayOfWeek+1 就是星期几（星期日 为 1）
        if (i_week_day == 1) {
            sumDay = (weekOfMonth - 1) * 7 + dayOfWeek + 1;
        } else {
            sumDay = 7 - i_week_day + 1 + (weekOfMonth - 1) * 7 + dayOfWeek + 1;
        }
        //在1号的基础上加上相应的天数
        c.set(Calendar.DATE, sumDay);
        SimpleDateFormat sf2 = new SimpleDateFormat("yyyy-MM-dd");
        return sf2.format(c.getTime());
    }

    /**
     * 根据日期计算属于第几周
     * @param date 格式 yyyy-MM-dd
     * @throws ParseException
     * return 返回0表示异常，或日期为空
     */
    public static int getWeekOfYear(String date, String pattern) {
        if (date == null)
            return 0;
        if (pattern == null)
            pattern = DATE_FORMAT_YYYY_MM_DD;
        try {
            SimpleDateFormat df = new SimpleDateFormat(pattern);
            Calendar cal = Calendar.getInstance();
            cal.setFirstDayOfWeek(Calendar.MONDAY); // 设置每周的第一天为星期一
            //cal.set(Calendar.DAY_OF_WEEK, Calendar.MONDAY);// 每周从周一开始
            cal.setMinimalDaysInFirstWeek(1); // 设置每周最少为1天
            cal.setTime(df.parse(date));
            return cal.get(Calendar.WEEK_OF_YEAR);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return 0;
    }

    /**
     * 判断参数year年份是否是闰年
     * @param year
     * @return
     */
    public static boolean isLeapYear(int year) {
        return (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0);
    }

    /**
     * 获得某月的最后一天
     * @param year
     * @param month
     * @return
     */
    public static int getLastDayOfMonth(int year, int month) {
        if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10
            || month == 12) {
            return 31;
        }
        if (month == 4 || month == 6 || month == 9 || month == 11) {
            return 30;
        }
        if (month == 2) {
            if (isLeapYear(year)) {
                return 29;
            } else {
                return 28;
            }
        }
        return 0;

    }

    /**
     * 返回指定格式的日期字符串
     * 
     * @return返回字符串格式
     */
    public static String getDatetoString(Date date, String pattern) {
        if (date == null)
            return null;
        if (pattern == null)
            pattern = DEFAULT_PATTERN;
        SimpleDateFormat formatter = new SimpleDateFormat(pattern);
        return formatter.format(date);
    }

    /**
     * 返回字符串转日期数据
     * 
     * @return返回字符串格式
     */
    public static Date getStringToDate(String strDate, String pattern) {
        if (strDate == null || strDate.trim().equals(""))
            return null;
        if (pattern == null)
            pattern = DEFAULT_PATTERN;
        SimpleDateFormat formatter = new SimpleDateFormat(pattern);
        ParsePosition pos = new ParsePosition(0);
        return formatter.parse(strDate, pos);
    }

    /**
     * 字符串转码utf-8
     * @param str
     * @param charset
     * @return
     * @throws UnsupportedEncodingException
     */
    public static String encodeUTF8(String str) throws UnsupportedEncodingException {
        if (str == null || str.length() == 0)
            return "";
        return new String(str.getBytes(), "UTF8");
    }

    /**
     * 字符串转码，默认是utf-8
     * @param str
     * @param charset
     * @return
     * @throws UnsupportedEncodingException
     */
    public static String encode(String str, String charset) throws UnsupportedEncodingException {
        if (str == null || str.length() == 0)
            return "";
        charset = charset == null || charset.equals("") ? "UTF8" : charset;
        return new String(str.getBytes(), charset);
    }

    /**
     * 格式化某个日期字符串为指定格式的日期字符串，如yyyy-mm-dd到yyyy年mm月dd日
     * @param date
     * @param parseStyle
     * @return 格式化后的日期字符串
     */
    public static String formatDateStr(String datestr, String parseStyle, String targetFormat) {
        Date tempdate = getStringToDate(datestr, parseStyle);
        return getDatetoString(tempdate, targetFormat);
    }

    /**
     * 日期字符串格式验证，默认分隔符为'-'，默认日期格式为yyyy-mm-dd
     * @param str 校验字符串   为空返回false
     * @param dateSplit 日期分隔符，默认为'-'
     * @return
     */
    public static boolean strDateFormatCheck(String str, String dateSplit) {
        if (str == null || str.trim().equals(""))
            return false;
        //日期正则：包括平年闰年
        dateSplit = dateSplit == null || dateSplit.trim().equals("") ? "-" : dateSplit;
        //        String datereg = "^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$";
        String datereg = "^(?:(?!0000)[0-9]{4}"
                         + dateSplit
                         + "(?:(?:0[1-9]|1[0-2])"
                         + dateSplit
                         + "(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])"
                         + dateSplit
                         + "(?:29|30)|(?:0[13578]|1[02])"
                         + dateSplit
                         + "31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)"
                         + dateSplit + "02" + dateSplit + "29)$";
        Pattern pattern = Pattern.compile(datereg);
        Matcher matcher = pattern.matcher(str);
        return matcher.matches();
    }

    /**
     * 字符串格式验证，
     * @param str 要验证的字符串   为空返回false
     * @param regex 正则表达式   为空返回true
     * <br/>常用：
     * <br/>^[1-9]\d*$　 　 //匹配正整数
     * <br/>^-?[1-9]\d*$　　 //匹配整数
     * <br/>^\w+$　　//匹配由数字、26个英文字母或者下划线组成的字符串
     * <br/>^[A-Za-z0-9]+$　　//匹配由数字和26个英文字母组成的字符串
     * <br/>^-?([1-9]\d*\.\d* |0\.\d*[1-9]\d* |0?\.0+ |0)$　 //匹配浮点数
     * <br/>^\s* |\s*$  //匹配首尾空白字符的正则表达式
     * <br/>[\u4e00-\u9fa5]  //匹配中文字符的正则表达式
     * <br/>^.*[^\\x00-\\xff]+.*$只有中文字符验证
     * <br/>[\\x00-\\xff]+不包括中文的字符
     * <br/>[a-zA-Z_0-9-]+字母数字下划线中划线验证
     * @return
     */
    public static boolean strFormatCheck(String str, String regex) {
        if (regex == null || regex.trim().equals(""))
            return true;
        if (str == null || str.trim().equals(""))
            return false;
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(str);
        return matcher.matches();
    }

    /**
     * 验证字符串有无特殊字符---不能显示的字符 x00-x1f和x7f-xff
     * @param str 验证字符串
     * @return
     */
    public static boolean strExcepCharCheck(String str) {
        if (str == null || str.trim().equals(""))
            return true;
        if (str.replaceAll("[\\x20-\\x7e]+", "").replaceAll("[\u4e00-\u9fa5]+", "").length() > 0) {
            return true;
        }
        return false;
    }

    /**
     * 根据日期计算属于第几周(周四是一周的第一天)
     * @param date 格式 yyyy-MM-dd dispflg:0 返回yyyyww;1 返回yyyy年ww周
     * @throws ParseException
     * return 返回空表示异常，或日期为空
     */
    public static String getWeekOfYear_Sunday(String date, String pattern, String dispflg) {
        if (date == null)
            return "";
        if (pattern == null)
            pattern = DATE_FORMAT_YYYY_MM_DD;
        try {
            SimpleDateFormat df = new SimpleDateFormat(pattern);
            Calendar cal = Calendar.getInstance();
            cal.setFirstDayOfWeek(Calendar.SUNDAY); // 设置每周的第一天为星期日
            //cal.set(Calendar.DAY_OF_WEEK, Calendar.MONDAY);// 每周从周一开始
            cal.setMinimalDaysInFirstWeek(1); // 设置每周最少为1天
            cal.setTime(df.parse(date));
            if (cal.get(Calendar.DAY_OF_WEEK) > 4) {
                cal.add(Calendar.DATE, 7);
            }
            int year = cal.get(Calendar.YEAR);//获得当前年
            int month = cal.get(Calendar.MONTH);//获得当前月
            int week = cal.get(Calendar.WEEK_OF_YEAR);//获得周数
            if (month + 1 == 12 && week == 1) {
                year += 1;//如果当前月是12月并且周数是1，作为明年的第一周
            }
            if (dispflg.equals("0")) {
                return year + "" + (week < 10 ? "0" + week : week);//返回yyyyww格式
            } else if (dispflg.equals("1")) {
                return year + "年" + (week < 10 ? "0" + week : week) + "周";//返回yyyyww格式
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "";
    }

    /**
     * 根据日期计算属于第几周(周日是一周的第一天)
     * @param date 格式 yyyy-MM-dd dispflg:0 返回yyyyww;1 返回yyyy年ww周
     * @throws ParseException
     * return 返回空表示异常，或日期为空
     */
    public static String getWeekOfYear_Sunday_Normal(String date, String pattern, String dispflg) {
        if (date == null)
            return "";
        if (pattern == null)
            pattern = DATE_FORMAT_YYYY_MM_DD;
        try {
            SimpleDateFormat df = new SimpleDateFormat(pattern);
            Calendar cal = Calendar.getInstance();
            cal.setFirstDayOfWeek(Calendar.SUNDAY); // 设置每周的第一天为星期日
            cal.set(Calendar.DAY_OF_WEEK, Calendar.SUNDAY);// 每周从周一开始
            cal.setMinimalDaysInFirstWeek(1); // 设置每周最少为1天
            cal.setTime(df.parse(date));
            int year = cal.get(Calendar.YEAR);//获得当前年
            int month = cal.get(Calendar.MONTH);//获得当前月
            int week = cal.get(Calendar.WEEK_OF_YEAR);//获得周数
            if (month + 1 == 12 && week == 1) {
                year += 1;//如果当前月是12月并且周数是1，作为明年的第一周
            }
            if (dispflg.equals("0")) {
                return year + "" + (week < 10 ? "0" + week : week);//返回"yyyyww"格式
            } else if (dispflg.equals("1")) {
                return year + "年" + (week < 10 ? "0" + week : week) + "周";//返回"yyyy年ww周"格式
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "";
    }

    /**
     * 根据某年第几周 
     * 如2014年第1周 
     * @param yyyyww          年周
     * @return String yyyyww年ww周
     */
    public static String weekTodate(String yyyyww) {
        if (yyyyww == null || yyyyww.equals("")) {
            return "";
        }
        try {
            int year = Integer.parseInt(yyyyww.substring(0, 4));
            int week = Integer.parseInt(yyyyww.substring(4));
            Calendar c = Calendar.getInstance();
            c.setFirstDayOfWeek(Calendar.SUNDAY); // 设置每周的第一天为星期日
            c.setMinimalDaysInFirstWeek(1); // 设置每周最少为1天
            c.set(Calendar.WEEK_OF_YEAR, week); //设置周
            c.set(Calendar.YEAR, year);//设置年
            c.set(Calendar.DAY_OF_WEEK, Calendar.SUNDAY);//本周第一天
            String date = year + "年" + (week < 10 ? "0" + week : week) + "周";
            return date;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "";
    }

    /**
     * 根据某年第几周 得到本周的日期区间
     * 如2014年第1周 得到(12月29日-01月04日)
     * @param yyyyww          年周
     * @return String yyyyww年ww周(MM月dd日-MM月dd日)
     */
    public static String weekTodateday(String yyyyww) {
        if (yyyyww == null || yyyyww.equals("")) {
            return "";
        }
        try {
            int year = Integer.parseInt(yyyyww.substring(0, 4));
            int week = Integer.parseInt(yyyyww.substring(4));
            Calendar c = Calendar.getInstance();
            c.setFirstDayOfWeek(Calendar.SUNDAY); // 设置每周的第一天为星期日
            c.setMinimalDaysInFirstWeek(1); // 设置每周最少为1天
            c.set(Calendar.WEEK_OF_YEAR, week); //设置周
            c.set(Calendar.YEAR, year);//设置年
            c.set(Calendar.DAY_OF_WEEK, Calendar.SUNDAY);//本周第一天
            SimpleDateFormat sf1 = new SimpleDateFormat("MM月dd日");
            String date = year + "年" + (week < 10 ? "0" + week : week) + "周" + "("
                          + sf1.format(c.getTime()) + "-";
            c.set(Calendar.DAY_OF_WEEK, Calendar.SATURDAY);//本周最后一天
            date = date + sf1.format(c.getTime()) + ")";
            return date;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "";
    }

    /**
     * 根据某年第几周 得到本周的开始日期
     * 如201401 得到2014-12-29
     * @param yyyyww          年周
     * @return String yyyy-MM-dd
     */
    public static String weekToStartDateDay(String yyyyww) {
        if (yyyyww == null || yyyyww.equals("")) {
            return "";
        }
        try {
            int year = Integer.parseInt(yyyyww.substring(0, 4));
            int week = Integer.parseInt(yyyyww.substring(4));
            Calendar c = Calendar.getInstance();
            c.setFirstDayOfWeek(Calendar.SUNDAY); // 设置每周的第一天为星期日
            c.setMinimalDaysInFirstWeek(1); // 设置每周最少为1天
            c.set(Calendar.WEEK_OF_YEAR, week); //设置周
            c.set(Calendar.YEAR, year);//设置年
            c.set(Calendar.DAY_OF_WEEK, Calendar.SUNDAY);//本周第一天
            SimpleDateFormat sf1 = new SimpleDateFormat("yyyy-MM-dd");
            String date = sf1.format(c.getTime());
            return date;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "";
    }

    /**
     * 根据某年第几周 得到本周的结束日期
     * 如201401 得到2014-01-04
     * @param yyyyww          年周
     * @return String yyyy-MM-dd
     */
    public static String weekToEndDateDay(String yyyyww) {
        if (yyyyww == null || yyyyww.equals("")) {
            return "";
        }
        try {
            int year = Integer.parseInt(yyyyww.substring(0, 4));
            int week = Integer.parseInt(yyyyww.substring(4));
            Calendar c = Calendar.getInstance();
            c.setFirstDayOfWeek(Calendar.SUNDAY); // 设置每周的第一天为星期日
            c.setMinimalDaysInFirstWeek(1); // 设置每周最少为1天
            c.set(Calendar.WEEK_OF_YEAR, week); //设置周
            c.set(Calendar.YEAR, year);//设置年
            c.set(Calendar.DAY_OF_WEEK, Calendar.SATURDAY);//本周最后一天
            SimpleDateFormat sf1 = new SimpleDateFormat("yyyy-MM-dd");
            String date = sf1.format(c.getTime());
            return date;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "";
    }

    /**
     * 根据某年第几周 得到本周的指定周几的日期
     * 如201401的周三 得到2014-01-01
     * @param yyyyww          年周
     * @return String yyyy-MM-dd
     */
    public static String weekToSetDateDay(String yyyyww, Integer dayofweek) {
        if (yyyyww == null || yyyyww.equals("")) {
            return "";
        }
        try {
            int year = Integer.parseInt(yyyyww.substring(0, 4));
            int week = Integer.parseInt(yyyyww.substring(4));
            Calendar c = Calendar.getInstance();
            c.setFirstDayOfWeek(Calendar.SUNDAY); // 设置每周的第一天为星期日
            c.setMinimalDaysInFirstWeek(1); // 设置每周最少为1天
            c.set(Calendar.WEEK_OF_YEAR, week); //设置周
            c.set(Calendar.YEAR, year);//设置年
            c.set(Calendar.DAY_OF_WEEK, dayofweek);//本周指定天
            SimpleDateFormat sf1 = new SimpleDateFormat("yyyy-MM-dd");
            String date = sf1.format(c.getTime());
            return date;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "";
    }

    /**
     * {@link String}转换为{@link Integer}类型。
     * <p>在转换过程中发生异常，均返回false，value等于null或者为空字符串或者能转换都返回true。
     * @param value 要转换成{@link Integer}值的字符串。
     * @return （能转换：True 不能转换：False）
     */
    public static Boolean canToInt(String value) {
        if (value == null || value.trim().length() <= 0)
            return true;

        // 字符串中包含小数点，Integer.valueOf会报异常，先转换为BigDecimal，返回其整数部分
        if (value.indexOf('.') >= 0) {
            try {
                Double.valueOf(value);
                return true;
            } catch (Exception e) {
                e.printStackTrace();
                return false;
            }
        }

        // 当做整数字符串处理
        try {
            Integer.valueOf(value);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    /**
     * {@link String}转换为{@link Float}类型。
     * <p>在转换过程中发生异常，均返回false，value等于null或者为空字符串或者能转换都返回true。
     * @param value 要转换成{@link Float}值的字符串。
     * @param （能转换：True 不能转换：False）
     * @return 
     */
    public static Boolean canToFloat(String value) {
        if (value == null || value.trim().length() <= 0)
            return true;

        try {
            Float.valueOf(value);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    /**
     * 把Integer类型的参数转换为String类型
     * 如果为null则转化为空串
     * @param Integer类型初始数据
     * @return String类型返回结果
     */
    public static String getStringValue(Integer intValue) {
        String value = "";
        if (intValue != null) {
            value = String.valueOf(intValue);
        }
        return value;
    }

    /**
     * 把object转为String null时转为""
     * @param obj
     * @return
     */
    public static String getStringValue(Object obj) {
        if (obj == null)
            return "";
        return String.valueOf(obj);
    }

    /*
     * 把拆单后的订单号转化成为拆单前的原始单号
     * @param 拆单后的订单号或拆单前的原始单号
     * @return 拆单前的原始单号
     */
    public static String getSourceOrderID(String orderID) {
        int index = orderID.lastIndexOf("-");
        if (index == -1)
            return orderID;
        return orderID.substring(0, index);
    }

    /**
     * 根据日期计算属于第几月
     * @param date 格式 yyyy-MM-dd dispflg:0 返回yyyyww;1 返回yyyy年ww月
     * @throws ParseException
     * return 返回空表示异常，或日期为空
     */
    public static String getMonthOfDate(String date, String pattern, String dispflg) {
        if (date == null)
            return "";
        if (pattern == null)
            pattern = DATE_FORMAT_YYYY_MM_DD;
        try {
            SimpleDateFormat df = new SimpleDateFormat(pattern);
            Calendar cal = Calendar.getInstance();
            cal.setTime(df.parse(date));
            int year = cal.get(Calendar.YEAR);//获得当前年
            int month = cal.get(Calendar.MONTH) + 1;//获得当前月
            if (dispflg.equals("0")) {
                return year + "" + month;//返回"yyyyww"格式
            } else if (dispflg.equals("1")) {
                return year + "年" + month + "月";//返回"yyyy年ww月"格式
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "";
    }

    /**
     * 周计算方法
     * @param yyyyww 要计算的周  例：201401
     * @param num 要增加或减少的周数
     * @return
     */
    public static String calculateWeek(String yyyyww, Integer num) {
        String resultWeek = "";
        Integer year = Integer.valueOf(yyyyww.substring(0, 4));
        Integer week = Integer.valueOf(yyyyww.substring(4));
        Integer resultWeekNum = week + num;
        if (resultWeekNum < 1) {
            year -= 1;
            resultWeek = year + "52";
        } else if (resultWeekNum > 52) {
            year += 1;
            resultWeek = year + "01";
        } else if (resultWeekNum < 10) {
            resultWeek = year + "0" + resultWeekNum;
        } else {
            resultWeek = year + "" + resultWeekNum;
        }
        return resultWeek;
    }

    /**
     * 随机获取字符串（带字母）
     * @param length
     * @return
     */
    public static String getRandomString(int length) {
        if (length <= 0) {
            return "";
        }
        char[] randomChar = { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'q', 'w', 'e', 'r',
                't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'z', 'x',
                'c', 'v', 'b', 'n', 'm' };
        Random random = new Random();
        StringBuffer stringBuffer = new StringBuffer();
        for (int i = 0; i < length; i++) {
            stringBuffer.append(randomChar[Math.abs(random.nextInt()) % randomChar.length]);
        }
        return stringBuffer.toString();
    }


    /**
     * 获取当前时间第二天 0：0:0:0 的时间
     *
     * @param
     * @return
     */
    public static Date dayEnd() {
        Calendar cal = Calendar.getInstance();
        cal.setTime(new Date());
        cal.set(Calendar.HOUR_OF_DAY, 0);
        cal.set(Calendar.MINUTE, 0);
        cal.set(Calendar.SECOND, 0);
        cal.set(Calendar.MILLISECOND, 0);
        cal.add(Calendar.DAY_OF_MONTH, 1);
        return cal.getTime();
    }
}
