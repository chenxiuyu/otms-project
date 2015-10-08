package com.ehaier.shoppingmall.otms.job;

import com.ehaier.shoppingmall.otms.job.framework.ClusterJob;
import com.ehaier.shoppingmall.otms.model.OtmsOrder;
import com.ehaier.shoppingmall.otms.thread.RTOrderToScrmThread;
import com.ehaier.shoppingmall.otms.utils.ThreadPoolUtil;
import com.google.common.base.Stopwatch;
import lombok.extern.slf4j.Slf4j;
import org.joda.time.DateTime;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;
import org.quartz.Job;
import org.quartz.JobDataMap;
import org.quartz.JobExecutionContext;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;

@Slf4j
@Component
public class SendDataToScrmRTJob extends ClusterJob implements Job {
    private static final DateTimeFormatter DFT = DateTimeFormat.forPattern("yyyy-MM-dd HH:mm:ss");

    /**
     * 准实时向SCRM传递数据
     *
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

            JobDataMap dataMap = jobExecutionContext.getJobDetail().getJobDataMap();
            String str_concurrent_thread_num = dataMap.getString("concurrent_thread_num");
            String str_order_total_num = dataMap.getString("order_total_num");
            int concurrent_thread_num = 1;
            int order_total_num = 1000;
            if (str_concurrent_thread_num != null && !"".equals(str_concurrent_thread_num)) {
                concurrent_thread_num = Integer.valueOf(str_concurrent_thread_num).intValue();
            }
            if (str_order_total_num != null && !"".equals(str_order_total_num)) {
                order_total_num = Integer.valueOf(str_order_total_num).intValue();
            }

            //todo 调用dubbo，获取需要传递的订单数据,加上limit order_total_num 限制
            List<OtmsOrder> otmsOrderList = null;

            if (otmsOrderList != null && otmsOrderList.size() > 0) {
                int order_num_per_thread = otmsOrderList.size() / concurrent_thread_num;
                //创建线程,如果本次订单数小于线程并发数，启动一个线程即可。
                if (order_num_per_thread <= 0) {
                    RTOrderToScrmThread rtOrderToScrmThread = new RTOrderToScrmThread();
                    rtOrderToScrmThread.setOtmsOrderList(otmsOrderList);
                    ThreadPoolUtil.submit(rtOrderToScrmThread);
                } else {
                    for (int i = 0; i < concurrent_thread_num; i++) {
                        RTOrderToScrmThread rtOrderToScrmThread = new RTOrderToScrmThread();
                        List<OtmsOrder> tmpOtmsOrderList = new ArrayList<OtmsOrder>();

                        for (int j = i * order_num_per_thread; j < otmsOrderList.size() && j < (i + 1) * order_num_per_thread; j++) {
                            tmpOtmsOrderList.add(otmsOrderList.get(j));
                        }
                        rtOrderToScrmThread.setOtmsOrderList(tmpOtmsOrderList);
                    }
                }
            }
            log.info("job ending ..........");
        } catch (Exception e) {
            e.printStackTrace();
        }

        stopwatch.stop();
        log.info("[MARK-commentSummary-FINISHED] end at {}, cost {}", DFT.print(DateTime.now()), stopwatch.elapsed(TimeUnit.SECONDS));
    }
}
