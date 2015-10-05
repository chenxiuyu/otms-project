package controller;

import lombok.extern.slf4j.Slf4j;
import org.quartz.*;
import org.quartz.impl.StdSchedulerFactory;
import org.quartz.impl.triggers.SimpleTriggerImpl;

import java.util.Date;

/**
 * Created by admin on 2015/9/30.
 */
@Slf4j
public class QuartzTest {




    public static void main(String[] args) throws Exception
    {
        log.info("------- Initializing ----------------------");
        //通过调度器工厂获取调度器，初始化工程时须指定其使用我们自己的配置文件
        SchedulerFactory sf = new StdSchedulerFactory("config/quartz.properties");
        Scheduler sched = sf.getScheduler();

        //这儿clear一下，因为使用数据库储存方式时，shutdown的时候没有清除，第二次运行会报Job is already exist
        sched.clear();

        log.info("------- Initialization Complete -----------");

        Date runTime = DateBuilder.evenMinuteDate(new Date());

        log.info("------- Scheduling Job  -------------------");

        //创建任务详情
        JobDetail job = JobBuilder.newJob(QuartzJob.class).withIdentity("job1", "group1").storeDurably(true).build();
        //创建触发器
        SimpleTriggerImpl trigger = (SimpleTriggerImpl) TriggerBuilder.newTrigger().withIdentity("trigger1", "group1").startAt(new Date()).build();
        trigger.setRepeatCount(5);
        trigger.setRepeatInterval(3000);
        log.info("------- Starttime =  "+trigger.getStartTime()+" -----------------");

        //调度器、触发器、任务，三者关联
        sched.scheduleJob(job, trigger);
        log.info(job.getKey() + " will run at: " + runTime);
        //调度启动
        sched.start();
        log.info("------- Started Scheduler -----------------");

        log.info("------- Waiting 1 minute... -------------");
        try
        {
            Thread.sleep(60000L);
        }
        catch (Exception e)
        {
        }

        log.info("------- Shutting Down ---------------------");
        //调度关闭
        sched.shutdown(true);
        log.info("------- Shutdown Complete -----------------");
    }
}
