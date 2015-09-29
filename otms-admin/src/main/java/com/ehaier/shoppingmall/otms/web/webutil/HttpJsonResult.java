package com.ehaier.shoppingmall.otms.web.webutil;

import java.io.Serializable;
import java.util.ArrayList;

/**
 * 
 * @author Administrator
 * 
 * @param <T>
 */
public class HttpJsonResult<T> implements Serializable {
    /**
     * 
     */
    private static final long serialVersionUID = -8637111820477625638L;

    public HttpJsonResult() {

    }

    public HttpJsonResult(T rows) {
        this.rows = rows;
    }

    public HttpJsonResult(String errorMessage) {
        this.success = false;
        this.message = errorMessage;
    }

    private Boolean success = true;

    public Boolean getSuccess() {
        return this.success;
    }

    private T rows;

    public T getRows() {
        return rows == null ? (T) new ArrayList<T>() : rows;
    }

    public void setRows(T rows) {
        this.rows = rows;
    }

    private T data;

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    private String message;

    public String getMessage() {
        return this.message;
    }

    public void setMessage(String message) {
        this.success = false;
        this.message = message;
    }

    private Long total = 0L;

    public void setTotal(Long count) {
        this.total = count;
    }

    public Long getTotal() {
        return this.total;
    }
}