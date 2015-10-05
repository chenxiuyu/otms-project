package com.ehaier.shoppingmall.otms.job;

import com.ehaier.shoppingmall.otms.job.framework.ClusterJob;
import com.ehaier.shoppingmall.otms.job.utils.MyApplicationContextUtils;
import com.ehaier.shoppingmall.otms.job.utils.QuartzManager;
import com.ehaier.shoppingmall.otms.model.SaJobs;
import com.ehaier.shoppingmall.otms.service.JobService;
import com.google.common.base.Stopwatch;
import com.haier.common.ServiceResult;
import com.haier.common.util.JsonUtil;
import lombok.extern.slf4j.Slf4j;
import org.joda.time.DateTime;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;
import org.quartz.*;
import org.quartz.impl.StdSchedulerFactory;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.concurrent.TimeUnit;

import static org.quartz.CronScheduleBuilder.cronSchedule;
import static org.quartz.JobBuilder.newJob;
import static org.quartz.TriggerBuilder.newTrigger;
import static org.quartz.core.jmx.JobDetailSupport.newJobDetail;

@Slf4j
@Component
public class SendDataToScrmRTJob extends ClusterJob implements Job {
    private static final DateTimeFormatter DFT = DateTimeFormat.forPattern("yyyy-MM-dd HH:mm:ss");

    /**
     * 准实时向SCRM传递数据
     * @param jobExecutionContext
     */
    @Override
    public void execute(JobExecutionContext jobExecutionContext) {
        if (!isLeader()) {
//			return;
        }
        log.info("start to execute commentSummary job ");
        Stopwatch stopwatch = Stopwatch.createStarted();

        try {
            log.info("job running ..........");
            log.info("ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss ..........");
            log.info("job ending ..........");
        } catch (Exception e) {
            e.printStackTrace();
        }

        stopwatch.stop();
        log.info("[MARK-commentSummary-FINISHED] end at {}, cost {}", DFT.print(DateTime.now()), stopwatch.elapsed(TimeUnit.SECONDS));
    }
}
