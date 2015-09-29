package com.ehaier.shoppingmall.otms.web.csrf;

import com.haier.common.BusinessException;
import com.haier.common.util.StringUtil;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashSet;
import java.util.Set;

/**
 * 只针对post请求做检查，本机制认为只有post请求为改变数据状态
 * 比较request中的CSRFtoken值和memcached中的token值如果相同则允许操作否则到错误页面
 *                       
 * @Filename: CSRFHandlerInterceptor.java
 * @Version: 1.0
 * @Author: maqiang 马强
 * @Email: mqianger@163.com
 *
 */
public class CSRFHandlerInterceptor extends HandlerInterceptorAdapter {
	private final static Set<String> exceptions = new HashSet<String>();

	static {
		exceptions.add("/shoppingmall/adminIndex/previewIndex");
		exceptions.add("/shoppingmall/uploadImage");
		exceptions.add("/shoppingmall/club/sceneRule/doAdd");
		exceptions.add("/shoppingmall/club/sceneRule/doUpdate");
		exceptions.add("/shoppingmall/savecard/audit/doAudit");
	}

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

		if (!request.getMethod().equalsIgnoreCase("POST") || exceptions.contains(request.getRequestURI())) {
			// Not a POST - allow the request
			return true;
		} else {
			// This is a POST request - need to check the CSRF token
			String memKey = CSRFTokenManager.getMemkeyFromRequest(request);

			if (StringUtil.isEmpty(memKey)) {
				//response.sendError(HttpServletResponse.SC_FORBIDDEN, "Bad or missing CSRF value");
				throw new BusinessException("请使用正常方式提交，不要进行重复提交操作!");
				//return false;
			}
            String memToken = CSRFTokenManager.getTokenForMemcached(memKey);
            String requestToken = CSRFTokenManager.getTokenFromRequest(request);

            if (memToken.equals(requestToken)) {
                CSRFTokenManager.destroyTokenFormMemcached(memKey);
                return true;
            } else {
                //response.sendError(HttpServletResponse.SC_FORBIDDEN, "Bad or missing CSRF value");
                throw new BusinessException("请使用正常方式提交，不要进行重复提交操作!");
                //return false;
            }
        }
    }
}
