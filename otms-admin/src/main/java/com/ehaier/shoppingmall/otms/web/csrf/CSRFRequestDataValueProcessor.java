package com.ehaier.shoppingmall.otms.web.csrf;

import com.haier.common.util.StringUtil;
import org.springframework.web.servlet.support.RequestDataValueProcessor;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

/**
 * 与页面中的<@form.form>配合使用，生成token的隐藏域
 *                       
 * @Filename: CSRFRequestDataValueProcessor.java
 * @Version: 1.0
 * @Author: maqiang 马强
 * @Email: mqianger@163.com
 *
 */
public class CSRFRequestDataValueProcessor implements RequestDataValueProcessor {

    @Override
    public String processAction(HttpServletRequest request, String action) {
        return action;
    }

    @Override
    public String processFormFieldValue(HttpServletRequest request, String name, String value,
                                        String type) {
        return value;
    }

    @Override
    public Map<String, String> getExtraHiddenFields(HttpServletRequest request) {
        Map<String, String> hiddenFields = new HashMap<String, String>();
        String memKey = CSRFTokenManager.getMemkeyFromRequest(request);
        if (StringUtil.isEmpty(memKey)) {
            memKey = UUID.randomUUID().toString();
        }
        hiddenFields.put(CSRFTokenManager.MEM_KEY_NAME, memKey);
        hiddenFields.put(CSRFTokenManager.CSRF_PARAM_NAME,
            CSRFTokenManager.getTokenForMemcached(memKey));
        return hiddenFields;
    }

    @Override
    public String processUrl(HttpServletRequest request, String url) {
        return url;
    }

}
