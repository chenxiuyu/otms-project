package com.ehaier.shoppingmall.otms.web.webutil;

import java.io.Serializable;

/**
 * Created by jiangpeng on 15-8-20.
 */
public class ServiceResponse<T> implements Serializable {
    private boolean success;
    private T result;
    private String errorMessage;

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public void setErrorMessage(String errorMessage) {
        this.success=false;
        this.errorMessage = errorMessage;
    }

    public T getResult() {
        return result;
    }

    public void setResult(T result) {
        this.success=true;
        this.result = result;
    }
}
