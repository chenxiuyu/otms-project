package com.ehaier.shoppingmall.otms.utils;

import org.apache.log4j.Logger;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;

public class MyApplicationContextUtils implements ApplicationContextAware {

    Logger log = Logger.getLogger(MyApplicationContextUtils.class);

    /**
     * 类静态变量，用来保存spring的 ApplicationContext
     */
    private static ApplicationContext context;

    @Override
    public void setApplicationContext(ApplicationContext context) {
        MyApplicationContextUtils.context = context;
    }

    /**
     * 根据beanid来获取一个bean对象。
     * @param name
     * @param <T>
     * @return
     */
    public static <T> T getBean(String name) {
        return (T) MyApplicationContextUtils.context.getBean(name);
    }

    /**
     * 得到所有bean的对象名列表。
     * @return
     */
    public static String[] getBeanNames(){
        return MyApplicationContextUtils.context.getBeanDefinitionNames();
    }
}
