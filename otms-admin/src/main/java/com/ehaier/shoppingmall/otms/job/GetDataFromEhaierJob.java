package com.ehaier.shoppingmall.otms.job;

import com.ehaier.shoppingmall.otms.job.framework.ClusterJob;
import com.ehaier.shoppingmall.otms.job.utils.MyApplicationContextUtils;
import com.ehaier.shoppingmall.otms.model.SaUser;
import com.ehaier.shoppingmall.otms.service.UserService;
import com.google.common.base.Stopwatch;
import com.haier.cbs.system.entity.SysMenu;
import com.haier.cbs.system.service.SystemService;
import com.haier.common.ServiceResult;
import com.haier.common.util.JsonUtil;
import lombok.extern.slf4j.Slf4j;
import org.joda.time.DateTime;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.util.List;
import java.util.concurrent.TimeUnit;

/**
 * Created by admin on 2015/9/28.
 */
@Slf4j
@Component
public class GetDataFromEhaierJob extends ClusterJob implements Job,Serializable {
    private static final DateTimeFormatter DFT = DateTimeFormat.forPattern("yyyy-MM-dd HH:mm:ss");

    @Override
    public void execute(JobExecutionContext jobExecutionContext) throws JobExecutionException {
        if(!isLeader()){
//            return;
        }
        log.info("start to execute commentSummary job ");
        Stopwatch stopwatch = Stopwatch.createStarted();

        try {
            log.info("GetDataFromEhaierJob running ..........");
            UserService userService = MyApplicationContextUtils.getBean("userServiceImpl");
            SaUser saUser = userService.getUserById(1);
            log.info("所有加载到spring的bean：" + JsonUtil.toJson(MyApplicationContextUtils.getBeanNames()));
            log.info(JsonUtil.toJson(saUser));
            log.info("GetDataFromEhaierJob ending ..........");
        } catch (Exception e) {
            e.printStackTrace();
        }

        stopwatch.stop();
        log.info("[MARK-commentSummary-FINISHED] end at {}, cost {}", DFT.print(DateTime.now()), stopwatch.elapsed(TimeUnit.SECONDS));
    }
}
