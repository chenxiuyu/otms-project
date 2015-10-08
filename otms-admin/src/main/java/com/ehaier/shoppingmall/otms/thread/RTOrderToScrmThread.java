package com.ehaier.shoppingmall.otms.thread;

import com.ehaier.shoppingmall.otms.model.OtmsOrder;

import java.util.List;
import java.util.concurrent.Callable;

/**
 * 调用scrm提供的接口，并返回调用结果
 * Created by admin on 2015/10/8.
 */
public class RTOrderToScrmThread implements Callable<String> {

    List<OtmsOrder> otmsOrderList;

    public void setOtmsOrderList(List<OtmsOrder> otmsOrderList) {
        this.otmsOrderList = otmsOrderList;
    }

    @Override
    public String call() throws Exception {
        //todo 调用接口
        return null;
    }
}
