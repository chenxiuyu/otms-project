package com.ehaier.shoppingmall.otms.web.csrf;

import com.ehaier.shoppingmall.core.cache.memcache.XMemcacheClient;
import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;

import javax.servlet.http.HttpServletRequest;
import java.util.UUID;

/**
 * csrf机制的帮助类
 *                       
 * @Filename: CSRFTokenManager.java
 * @Version: 1.0
 * @Author: maqiang 马强
 * @Email: mqianger@163.com
 *
 */
public final class CSRFTokenManager {

    /**
     * The token parameter name
     */
    static final String         CSRF_PARAM_NAME = "CSRFToken";
    static final String         MEM_KEY_NAME    = "CSRFMemKey";
    private final static byte[] sync            = new byte[0];
    private final static Logger log             = LogManager.getLogger(CSRFTokenManager.class);

    static String getTokenForMemcached(String key) {
        String token = null;
        // I cannot allow more than one token on a session - in the case of two requests trying to
        // init the token concurrently
        synchronized (sync) {
            try {
                token = (String) XMemcacheClient.get(key);
            } catch (Exception e1) {
                log.error("[海尔商城][csrf]从Memcache中取缓存数据时发生异常：" + e1);
            }
            if (null == token) {
                token = UUID.randomUUID().toString();
                try {
                    XMemcacheClient.add(key, token);
                } catch (Exception e) {
                    log.error("[海尔商城][csrf]向Memcache缓存数据时发生异常：" + e);
                }
            }
        }
        return token;
    }

    /**
     * 删除已经使用的session
     * @param request
     * @param token
     */
    public static void destroyTokenFormMemcached(String key) {
        try {
            XMemcacheClient.delete(key);
        } catch (Exception e) {
            log.error("[海尔商城][csrf]从Memcache删除缓存数据时发生异常：" + e);
        }
    }

    /**
     * Extracts the token value from the session
     * @param request
     * @return
     */
    public static String getTokenFromRequest(HttpServletRequest request) {
        return request.getParameter(CSRF_PARAM_NAME);
    }

    public static String getMemkeyFromRequest(HttpServletRequest request) {
        return request.getParameter(MEM_KEY_NAME);
    }

    /**
     * 取得token值，点击提交后页面不跳转的页面使用
     * @param key
     * @return
     */
    public static String getCSRFTokenForPreservePage(String key) {
        String token = null;

        token = UUID.randomUUID().toString();
        try {
            XMemcacheClient.set(key, token);
        } catch (Exception e) {
            log.error("[海尔商城][csrf]向Memcache缓存数据时发生异常：" + e);
        }
        return token;
    }

    private CSRFTokenManager() {
    };
}
