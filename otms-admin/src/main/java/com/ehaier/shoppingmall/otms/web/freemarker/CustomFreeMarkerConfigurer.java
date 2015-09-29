package com.ehaier.shoppingmall.otms.web.freemarker;

import freemarker.cache.TemplateLoader;
import org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer;

import java.util.List;

public class CustomFreeMarkerConfigurer extends FreeMarkerConfigurer {

    @Override
    protected TemplateLoader getAggregateTemplateLoader(List<TemplateLoader> templateLoaders) {

        return new EscapeHtmlTemplateLoader(super.getAggregateTemplateLoader(templateLoaders));

    }

}
