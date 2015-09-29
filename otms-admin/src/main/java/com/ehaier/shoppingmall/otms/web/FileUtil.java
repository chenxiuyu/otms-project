package com.ehaier.shoppingmall.otms.web;

import org.apache.commons.io.FileUtils;

import java.io.File;
import java.io.IOException;

/**
 * Created by jiangpeng on 15-8-25.
 */
public class FileUtil {

    /**
     * 复制文件或者目录,复制前后文件完全一样。
     * @param resFilePath   源文件路径
     * @param distFolder    目标文件夹
     * @IOException         当操作发生异常时抛出
     */
    public static void copyFile(String resFilePath, String distFolder)
            throws IOException {
        File resFile = new File(resFilePath);
        File distFile = new File(distFolder);
        if (resFile.isDirectory()) {
           // 目录时
           FileUtils.copyDirectoryToDirectory(resFile, distFile);
        } else if (resFile.isFile()) {
            // 文件时
            // FileUtils.copyFileToDirectory(resFile, distFile, true);
            FileUtils.copyFileToDirectory(resFile, distFile);
        }
    }

    /**
     * 替换文件文本内容
     * @param filePath
     * @param oldText
     * @param newText
     * @throws IOException
     */
    public static void replaceText(String filePath,String oldText,String newText) throws IOException {
        File preFile = new File(filePath);
        //读取文件获取字符串
        String fileString = FileUtils.readFileToString(preFile,"UTF-8");
        //替换
        String resultString = fileString.replace(oldText,newText);
        FileUtils.deleteQuietly(preFile);
        preFile = new File(filePath);
        FileUtils.writeStringToFile(preFile,resultString,"UTF-8");
    }

    /**
     * 删除一个文件或者目录
     * @param targetPath     文件或者目录路径
     * @IOException 当操作发生异常时抛出
     */
    public static void deleteFile(String targetPath) throws IOException {
        File targetFile = new File(targetPath);
        if (targetFile.isDirectory()) {
            FileUtils.deleteDirectory(targetFile);
        } else if (targetFile.isFile()) {
            targetFile.delete();
        }
    }
}
