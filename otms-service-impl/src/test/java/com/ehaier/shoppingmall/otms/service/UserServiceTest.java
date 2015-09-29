package com.ehaier.shoppingmall.otms.service;

import com.ehaier.shoppingmall.otms.base.TestBase;
import com.ehaier.shoppingmall.otms.model.SaUser;
import lombok.extern.slf4j.Slf4j;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * Created by admin on 2015/9/14.
 */
@Slf4j
public class UserServiceTest extends TestBase {
    @Autowired
    private UserService userService;

    @Test
    public void testGetUserById(){
        SaUser saUser = userService.getUserById(1);
        log.info(saUser.getReal_name());
    }

    @Test
    public void testInsertUser(){
        SaUser saUser = new SaUser();
        saUser.setUser_name("ssdf");
        saUser.setReal_name("sdfsdfsdfasf");
        saUser.setEmail("de@dss.com");
        int i = userService.insertUser(saUser);
      log.info(i + "");
    }
}
