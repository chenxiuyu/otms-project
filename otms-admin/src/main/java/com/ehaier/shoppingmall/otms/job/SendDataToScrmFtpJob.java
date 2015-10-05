package com.ehaier.shoppingmall.otms.job;

import com.ehaier.shoppingmall.otms.job.framework.ClusterJob;
import com.google.common.base.Stopwatch;
import lombok.extern.slf4j.Slf4j;
import org.joda.time.DateTime;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.springframework.stereotype.Component;

import java.util.concurrent.TimeUnit;

@Slf4j
@Component
public class SendDataToScrmFtpJob extends ClusterJob implements Job {
    private static final DateTimeFormatter DFT = DateTimeFormat.forPattern("yyyy-MM-dd HH:mm:ss");

    /**
     * 每天定时执行，向ftp传输数据。
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
            log.info("SendDataToScrmFtpJob ..........");
            log.info("job ending ..........");
        } catch (Exception e) {
            e.printStackTrace();
        }

        stopwatch.stop();
        log.info("[MARK-commentSummary-FINISHED] end at {}, cost {}", DFT.print(DateTime.now()), stopwatch.elapsed(TimeUnit.SECONDS));
    }
}
