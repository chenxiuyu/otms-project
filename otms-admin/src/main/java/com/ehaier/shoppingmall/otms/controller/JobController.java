package com.ehaier.shoppingmall.otms.controller;

import com.ehaier.shoppingmall.otms.utils.MyApplicationContextUtils;
import com.ehaier.shoppingmall.otms.utils.QuartzUtil;
import com.ehaier.shoppingmall.otms.model.SaJobs;
import com.ehaier.shoppingmall.otms.model.SaUser;
import com.ehaier.shoppingmall.otms.service.UserService;
import com.ehaier.shoppingmall.otms.web.webutil.HttpJsonResult;
import lombok.extern.slf4j.Slf4j;
import org.quartz.Job;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

/**
 * Created by admin on 2015/9/25.
 * 启动、停止、删除操作，均需要提示确认。
 */

@Controller
@RequestMapping("/job")
@Slf4j
public class JobController {

    @Autowired
    private UserService userService;

    @RequestMapping(value = "/getuserbyid", method = {RequestMethod.GET})
    @ResponseBody
    public HttpJsonResult<SaUser> getUser(Map<String, Object> dataMap) {
        HttpJsonResult<SaUser> result = new HttpJsonResult<SaUser>();
        SaUser user = userService.getUserById(1);
        result.setData(user);
        return result;
    }


    @RequestMapping(value = "/addjob", method = {RequestMethod.GET})
    @ResponseBody
    public HttpJsonResult<String> addjob(HttpServletRequest request, @RequestParam SaJobs saJob) {
        HttpJsonResult<String> result = new HttpJsonResult<String>();
        try {
            //todo 保存自建表的信息，调用dubbo服务
        } catch (Exception e) {
            log.error(e.getMessage(), e.fillInStackTrace());
        }
        result.setData("add job success!");
        return result;
    }

    @RequestMapping(value = "/updatejob", method = {RequestMethod.GET})
    @ResponseBody
    public HttpJsonResult<String> updatejob(HttpServletRequest request, @RequestParam SaJobs saJob) {
        HttpJsonResult<String> result = new HttpJsonResult<String>();
        try {
            //todo 修改自建表的信息，调用dubbo服务
        } catch (Exception e) {
            log.error(e.getMessage(), e.fillInStackTrace());
        }
        result.setData("update job success!");
        return result;
    }

    @RequestMapping(value = "/startjob", method = {RequestMethod.GET})
    @ResponseBody
    public HttpJsonResult<String> startjob(HttpServletRequest request, @RequestParam SaJobs saJob) {
        HttpJsonResult<String> result = new HttpJsonResult<String>();
        try {
            QuartzUtil.addJob("JOB-" + saJob.getJob_id(), "OTMS-JOB-GROUP", "TRRIGER-" + saJob.getJob_id(),
                    "TRRIGER-OTMS-GROUP", (Job) MyApplicationContextUtils.getBean(saJob.getJob_app_url()), saJob.getJob_fire_cron());
        } catch (Exception e) {
            log.error(e.getMessage(), e.fillInStackTrace());
        }
        result.setData("start job success!");
        return result;
    }

    @RequestMapping(value = "/stopjob", method = {RequestMethod.GET})
    @ResponseBody
    public HttpJsonResult<String> stopjob(HttpServletRequest request, @RequestParam SaJobs saJob) {
        HttpJsonResult<String> result = new HttpJsonResult<String>();
        try {
            QuartzUtil.addJob("JOB-" + saJob.getJob_id(), "OTMS-JOB-GROUP", "TRRIGER-" + saJob.getJob_id(),
                    "TRRIGER-OTMS-GROUP", (Job) MyApplicationContextUtils.getBean(saJob.getJob_app_url()), saJob.getJob_fire_cron());
        } catch (Exception e) {
            log.error(e.getMessage(), e.fillInStackTrace());
        }
        result.setData("stop job success!");
        return result;
    }

    @RequestMapping(value = "/deletejob", method = {RequestMethod.GET})
    @ResponseBody
    public HttpJsonResult<String> deletejob(HttpServletRequest request,@RequestParam SaJobs saJob) {
        HttpJsonResult<String> result = new HttpJsonResult<String>();
        try {
            QuartzUtil.removeJob("JOB-" + saJob.getJob_id(), "OTMS-JOB-GROUP", "TRRIGER-" + saJob.getJob_id(),
                    "TRRIGER-OTMS-GROUP");
            //TODO 更新自建表的状态，调用dubbo服务
        } catch (Exception e) {
            log.error(e.getMessage(), e.fillInStackTrace());
        }
        result.setData("delete job success!");
        return result;
    }
}
