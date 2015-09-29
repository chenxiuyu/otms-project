package com.ehaier.shoppingmall.otms.web.webutil;

import jxl.Workbook;
import jxl.format.Alignment;
import jxl.format.Border;
import jxl.format.BorderLineStyle;
import jxl.format.*;
import jxl.write.*;
import org.apache.commons.io.Charsets;
import org.slf4j.Logger;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.OutputStream;
import java.net.URLEncoder;

public class ExcelExportUtil {

    /**
     * 导出Excel模板
     * @author DHC 刘骥飞
     * @param response
     * @param fileName 文件名
     * @param sheetName 表单名
     * @param excelHead excel头部
     *      （格式：用逗号分隔。
     *      例： "序号,渠道,产品组,库位码,物料号,型号,物料描述,T+2周提报预测,定制,库存满足方式"。）
     */
    public static void downloadDataTemplate(Logger logger, HttpServletRequest request,
                                            HttpServletResponse response, String fileName,
                                            String sheetName, String excelHead) {
        OutputStream os = null;
        try {
            response.reset();
            response.setContentType("application/octet-stream; charset=utf-8");
            if (isIE(request)) {
                //处理IE 的头部信息 
                response.setHeader("Content-Disposition",
                    "attachment; filename=" + URLEncoder.encode(fileName, "utf-8") + ".xls");
            } else {
                //处理其他的头部信息 
                response.setHeader("content-disposition",
                    "attachment;filename="
                            + new String(fileName.getBytes(Charsets.UTF_8), Charsets.ISO_8859_1)
                            + ".xls");
            }
            os = response.getOutputStream();

            // 创建可以写的book文件对象
            WritableWorkbook book = Workbook.createWorkbook(os);
            // 在book中创建一个sheet,名称为sheetName,从第一列开始插入
            WritableSheet sheet = book.createSheet(sheetName, 0);
            //设置纸张大小
            sheet.getSettings().setPaperSize(PaperSize.A4);
            sheet.getSettings().setFitHeight(297);
            sheet.getSettings().setFitWidth(21);

            int temp = 0;
            String[] totalHeaders = excelHead.split(",");
            ExcelExportUtil.setExcelHeader(sheet, temp, totalHeaders);
            // 写入到服务器
            book.write();
            // 一定要关闭，否则不写入
            book.close();
            os.flush();
            os.close();
        } catch (Exception e) {
            logger.error("[downloadDataTemplate]:下载失败!", e);
        }
    }

    /**
     * 将entity导出Excel
     * @author DHC 刘骥飞
     *      （格式：用逗号分隔。
     *      例： {"序号","渠道","产品组","库位码"}。）
     */
    public static void exportEntity(Logger logger, HttpServletRequest request,
                                    HttpServletResponse response, String fileName,
                                    String sheetName, String[] totalHeaders,
                                    ExcelCallbackInterfaceUtil callback) throws Exception {

        response.reset();
        response.setContentType("application/octet-stream; charset=utf-8");
        if (isIE(request)) {
            //处理IE 的头部信息 
            response.setHeader("Content-Disposition",
                "attachment; filename=" + URLEncoder.encode(fileName, "utf-8") + ".xls");
        } else {
            //处理其他的头部信息 
            response.setHeader("content-disposition",
                "attachment;filename="
                        + new String(fileName.getBytes(Charsets.UTF_8), Charsets.ISO_8859_1)
                        + ".xls");
        }
        OutputStream os = response.getOutputStream();
        try {
            exportPurchaseOrder(os, sheetName, totalHeaders, callback);
        } catch (Exception e) {
            response.reset();
            response.setContentType("text/html;charset=UTF-8");
            response.getWriter().print("导出excel失败，" + e);
            response.getWriter().flush();
        } finally {
            if (os != null) {
                os.flush();
                os.close();
            }
        }
    }

    /**
     * 导出Excel的头部
     * @author DHC 刘骥飞
     * @param sheet 设置完毕的sheet对象
     * @param temp 起始行号
     * @param headers excel头部
     *      （格式：用逗号分隔。
     *      例： {"序号","渠道","产品组","库位码"}。）
     */
    public static void setExcelHeader(WritableSheet sheet, int temp, String[] headers)
                                                                                      throws Exception {
        WritableFont font = new WritableFont(WritableFont.ARIAL, 11, WritableFont.BOLD, false,
            UnderlineStyle.NO_UNDERLINE, jxl.format.Colour.BLACK);
        WritableCellFormat format = new WritableCellFormat(font);
        format.setAlignment(Alignment.CENTRE);
        format.setBorder(Border.ALL, BorderLineStyle.THIN);
        for (int col = 0; col < headers.length; col++) {
            Label label = new Label(col, temp, headers[col], format);
            sheet.setColumnView(col, 25);
            sheet.addCell(label);
        }
    }

    /**
     * 
     * @param os 输出流
     * @param sheetName 表单名
     * @param totalHeaders 表单表头
     * @param callback 回调接口
     * @throws Exception
     */
    private static void exportPurchaseOrder(OutputStream os, String sheetName,
                                            String[] totalHeaders,
                                            ExcelCallbackInterfaceUtil callback) throws Exception {
        // 创建可以写的book文件对象
        WritableWorkbook book = Workbook.createWorkbook(os);
        // 在book3.xls中创建一个sheet,名称为'unionName',从第一列开始插入
        WritableSheet sheet = book.createSheet(sheetName, 0);
        //设置纸张大小
        sheet.getSettings().setPaperSize(PaperSize.A4);
        sheet.getSettings().setFitHeight(297);
        sheet.getSettings().setFitWidth(21);
        int temp = 0;
        //设置导出Excel的头部
        setExcelHeader(sheet, temp, totalHeaders);
        temp++;
        //调用回调函数，实现将数据写入sheet
        callback.setExcelBodyTotal(os, sheet, temp);

        // 写入到服务器
        book.write();
        // 一定要关闭，否则不写入
        book.close();
    }

    /**
    * 判断是否为IE浏览器 
    * */
    public static boolean isIE(HttpServletRequest request) {
        //判断是否是ie或者ie11
        if (request.getHeader("USER-AGENT").toLowerCase().indexOf("msie") > 0
            || (request.getHeader("USER-AGENT").toLowerCase().indexOf("trident") > -1 && request
                .getHeader("USER-AGENT").indexOf("rv") > -1)) {
            return true;
        }
        return false;
    }
}
