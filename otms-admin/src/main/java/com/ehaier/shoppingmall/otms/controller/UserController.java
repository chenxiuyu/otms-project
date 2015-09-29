package com.ehaier.shoppingmall.otms.controller;

import com.ehaier.shoppingmall.otms.model.SaUser;
import com.ehaier.shoppingmall.otms.service.UserService;
import com.ehaier.shoppingmall.otms.web.webutil.HttpJsonResult;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Map;

/**
 * Created by admin on 2015/9/25.
 */

@Controller
@RequestMapping("/user")
@Slf4j
public class UserController {

    @Autowired
    private UserService userService;

    @RequestMapping(value = "/getuserbyid", method = {RequestMethod.GET})
    @ResponseBody
    public HttpJsonResult<SaUser> getUser(Map<String, Object> dataMap) {
        HttpJsonResult<SaUser> result = new HttpJsonResult<SaUser>();
        SaUser user = userService.getUserById(1);
        result.setData(user);
        return result;
    }

}
