package com.ehaier.shoppingmall.otms.job.utils;

import lombok.extern.slf4j.Slf4j;
import org.quartz.*;
import org.quartz.impl.StdScheduler;
import org.quartz.impl.jdbcjobstore.JobStoreTX;

import java.text.ParseException;

import static org.quartz.CronScheduleBuilder.cronSchedule;
import static org.quartz.JobBuilder.newJob;
import static org.quartz.TriggerBuilder.newTrigger;

/**
 * Created by admin on 2015/9/28.
 */
@Slf4j
public class QuartzUtil {
    private static StdScheduler stdScheduler = MyApplicationContextUtils.getBean("stdScheduler");

    /**
     * 添加一个定时任务
     *
     * @param jobName          任务名
     * @param jobGroupName     任务组名
     * @param triggerName      触发器名
     * @param triggerGroupName 触发器组名
     * @param job              任务
     * @param cronExpression   时间设置，参考quartz说明文档
     */
    public static void addJob(String jobName, String jobGroupName,
                              String triggerName, String triggerGroupName, Job job, String cronExpression)
            throws SchedulerException, ParseException {
        JobDetail jobDetail = newJob(job.getClass()).withIdentity(jobName, jobGroupName).storeDurably().build();//任务名，任务组，任务执行类
//        CronTrigger trigger = newTrigger().withIdentity(triggerName, triggerGroupName).withSchedule(cronSchedule(cronExpression)).build();//触发器名,触发器组,cron表达式
//        stdScheduler.scheduleJob(jobDetail, trigger);
//        stdScheduler.addJob(jobDetail,false);
        JobStoreTX jobStoreTX = new JobStoreTX();
        jobStoreTX.storeJob(jobDetail,true);
        stdScheduler.getSchedulerName();
        log.info(jobName + " 已加入到调度中心！");
    }

    /**
     * 修改一个任务的触发时间
     *
     * @param triggerName
     * @param triggerGroupName
     * @param cronExpression
     * @throws SchedulerException
     * @throws ParseException
     */
    public static void modifyJobTime(String triggerName, String triggerGroupName,
                                     String cronExpression) throws SchedulerException, ParseException {
        Trigger trigger = (Trigger) newTrigger().withIdentity(triggerName, triggerGroupName);
        if (trigger != null) {
            CronTrigger ct = (CronTrigger) trigger;
            //修改时间
            ct.getTriggerBuilder().withSchedule(cronSchedule(cronExpression)).build();
            //重启触发器
            stdScheduler.resumeTrigger(new TriggerKey(triggerName, triggerGroupName));
        }
    }


    /**
     * 移除一个任务和触发器
     *
     * @param jobName
     * @param jobGroupName
     * @param triggerName
     * @param triggerGroupName
     * @throws SchedulerException
     */
    public static void removeJob(String jobName, String jobGroupName, String triggerName, String triggerGroupName)
            throws SchedulerException {
        stdScheduler.pauseTrigger(new TriggerKey(triggerName, triggerGroupName));//停止触发器
        stdScheduler.unscheduleJob(new TriggerKey(triggerName, triggerGroupName));//移除触发器
        stdScheduler.deleteJob(new JobKey(jobName, jobGroupName));//删除任务
    }
}
