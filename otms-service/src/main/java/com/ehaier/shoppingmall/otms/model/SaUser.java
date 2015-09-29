package com.ehaier.shoppingmall.otms.model;

import java.io.Serializable;

/**
 * Created by admin on 2015/9/14.
 */
public class SaUser implements Serializable{
    private Integer id;
    private String user_name;
    private String real_name;
    private String email;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUser_name() {
        return user_name;
    }

    public void setUser_name(String user_name) {
        this.user_name = user_name;
    }

    public String getReal_name() {
        return real_name;
    }

    public void setReal_name(String real_name) {
        this.real_name = real_name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
