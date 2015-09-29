package com.ehaier.shoppingmall.otms.web.webutil;

import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.security.MessageDigest;
import java.util.HashMap;
import java.util.Map;

public class CookieHelper {
    private static Logger log = LogManager.getLogger(CookieHelper.class);

    /**
     * 获得cookie
     * @param request
     * @param name
     * @return
     */
    public static Cookie getCookieByName(HttpServletRequest request, String name) {
        Map<String, Cookie> cookieMap = ReadCookieMap(request);
        if (cookieMap.containsKey(name)) {
            Cookie cookie = (Cookie) cookieMap.get(name);
            return cookie;
        } else {
            return null;
        }
    }

    private static Map<String, Cookie> ReadCookieMap(HttpServletRequest request) {
        Map<String, Cookie> cookieMap = new HashMap<String, Cookie>();
        Cookie[] cookies = request.getCookies();
        if (null != cookies) {
            for (Cookie cookie : cookies) {
                cookieMap.put(cookie.getName(), cookie);
            }
        }
        return cookieMap;
    }

    /**
     * 添加cookie
     */

    public static void addCookie(String cookieName, String value, String domain, String cookiePath,
                                 int cookieExpiryDate, HttpServletResponse response) {
        Cookie cookie = new Cookie(cookieName, value);
        cookie.setDomain(domain);
        cookie.setPath(cookiePath);
        cookie.setMaxAge(cookieExpiryDate);
        response.addCookie(cookie);
    }

    /**
     * 删除cookie
     * @param rs
     */
    public static void delCookies(HttpServletResponse rs, String cookieName) {
        //      String cookieDomain = PropertyUtil.getStrValue("base.properties", "cookieDomain", "cart.mbaobao.com");

        Cookie cook = new Cookie(cookieName, null);
        //      cook.setDomain(cookieDomain);
        cook.setPath("/");
        //cook.setMaxAge(-1);
        cook.setMaxAge(0);
        rs.addCookie(cook);
    }

    public static String md5(String plainText) {
        String str = "";
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            md.update(plainText.getBytes());
            byte b[] = md.digest();

            int i;

            StringBuffer buf = new StringBuffer("");
            for (int offset = 0; offset < b.length; offset++) {
                i = b[offset];
                if (i < 0)
                    i += 256;
                if (i < 16)
                    buf.append("0");
                buf.append(Integer.toHexString(i));
            }
            str = buf.toString();
        } catch (Exception e) {
            log.error("[search-md5]:MD5加密码异常!", e);
        }
        return str;
    }
}
