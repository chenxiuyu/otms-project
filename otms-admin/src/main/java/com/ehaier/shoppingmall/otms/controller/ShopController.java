package com.ehaier.shoppingmall.otms.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.Map;

@Controller
@RequestMapping("/seller/shops")
@Slf4j
public class ShopController {

    @RequestMapping(value = "/list/view", method = {RequestMethod.GET})
    public String listView(Map<String, Object> dataMap) {
        return "seller/shop_list";
    }


    /**
     * 下载页展示
     * @return
     */
    @RequestMapping(value="/downloadpage",method = RequestMethod.GET)
    public String downloadpage(){
        return "/lottery/activePointLottery";
    }

    @RequestMapping(value = "/download", method = {RequestMethod.GET})
    public void download(String fileName, HttpServletResponse response) {
//        String fileName = "HwVmall.apk";
        if(fileName == null){
            return;
        }
        response.setCharacterEncoding("utf-8");
        response.setContentType("application/octet-stream");
        response.setHeader("Content-Disposition", "attachment;fileName="
                + fileName);
        try {
            String path = Thread.currentThread().getContextClassLoader()
                    .getResource("").getPath()
                    + "download";
            System.out.println(path);
            InputStream inputStream = new FileInputStream(new File(path
                    + File.separator + fileName));

            OutputStream os = response.getOutputStream();
            byte[] b = new byte[2048];
            int length;
            while ((length = inputStream.read(b)) > 0) {
                os.write(b, 0, length);
            }
            os.close();
            inputStream.close();
        } catch (FileNotFoundException e) {
            log.error(e.getMessage(), e.fillInStackTrace());
        } catch (IOException e) {
            log.error(e.getMessage(), e.fillInStackTrace());
        }
    }


}
