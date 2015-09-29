package com.ehaier.shoppingmall.otms.web.webutil;

import jxl.write.WritableSheet;

import java.io.OutputStream;

public interface ExcelCallbackInterfaceUtil {

    /**
     * 待调用者实现的数据导出回调接口
     * @param os 输出流
     * @param sheet 设置完毕的sheet对象
     * @param temp 起始行号
     * @throws Exception
     */
    public void setExcelBodyTotal(OutputStream os, WritableSheet sheet, int temp) throws Exception;
}
