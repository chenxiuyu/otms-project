package com.ehaier.shoppingmall.otms.job;

import com.ehaier.shoppingmall.otms.job.framework.ClusterJob;
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

import java.util.List;
import java.util.concurrent.TimeUnit;

/**
 * Created by admin on 2015/9/28.
 */
@Slf4j
@Component
@Lazy(false)
public class GetDataFromEhaierJob extends ClusterJob implements Job {
    private static final DateTimeFormatter DFT = DateTimeFormat.forPattern("yyyy-MM-dd HH:mm:ss");
    @Autowired
    private SystemService systemService;

    @Override
    public void execute(JobExecutionContext jobExecutionContext) throws JobExecutionException {
        if(!isLeader()){//每个job调用的时候必须先调用该方法，否则导致多个节点同时执行的情况发生
            return;
        }
        log.info("start to execute commentSummary job ");
        Stopwatch stopwatch = Stopwatch.createStarted();

        try {
            log.info("GetDataFromEhaierJob running ..........");
            ServiceResult<List<SysMenu>> serviceResult = systemService.findMenuTree();
            log.info(JsonUtil.toJson(serviceResult.getResult()));
            log.info("GetDataFromEhaierJob ending ..........");
        } catch (Exception e) {
            e.printStackTrace();
        }

        stopwatch.stop();
        log.info("[MARK-commentSummary-FINISHED] end at {}, cost {}", DFT.print(DateTime.now()), stopwatch.elapsed(TimeUnit.SECONDS));
    }
}
