package com.ehaier.shoppingmall.otms.service;

import com.ehaier.shoppingmall.otms.model.SaUser;

/**
 * Created by admin on 2015/9/14.
 */
public interface UserService {
    SaUser getUserById(Integer id);
    int insertUser(SaUser saUser);
}
