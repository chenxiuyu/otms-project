package com.ehaier.shoppingmall.otms.service;

import com.ehaier.shoppingmall.otms.dao.UserDaoMapper;
import com.ehaier.shoppingmall.otms.model.SaUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by admin on 2015/9/14.
 */
@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserDaoMapper userDaoMapper;
    @Override
    public SaUser getUserById(Integer id) {
        return userDaoMapper.getUserById(id);
    }

    @Override
    public int insertUser(SaUser saUser) {
        return userDaoMapper.insertUser(saUser);
    }
}
