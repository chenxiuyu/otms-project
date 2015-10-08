package com.ehaier.shoppingmall.otms.job;

import com.ehaier.shoppingmall.otms.utils.MyApplicationContextUtils;
import lombok.extern.slf4j.Slf4j;
import org.quartz.impl.StdScheduler;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

/**
 * Created by admin on 2015/9/30.
 */
@Slf4j
@WebServlet(urlPatterns = "/otms/jobwatcher", loadOnStartup = 66, description = "job守护线程启动")
public class JobThreadWatcher extends HttpServlet {
    private static Thread keeper;
    public static Thread getKeeper() {
        return keeper;
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        JobThreadWatcher.initialize();
        PrintWriter writer = resp.getWriter();
        writer.print("Job keeper is created successfully!");
    }

    @Override
    public void init(ServletConfig config) throws ServletException {
        JobThreadWatcher.initialize();
    }

    @Override
    public void destroy() {
        super.destroy();
    }

    public static void initialize() {
        if (keeper == null || !keeper.isAlive() || Thread.State.TERMINATED.equals(keeper.getState())) {
            keeper = new Thread(new Runnable() {
                public void run() {
                    while (true) {
                        try {
                            Thread.sleep(60*1000);

                            StdScheduler stdScheduler = MyApplicationContextUtils.getBean("stdScheduler");
                            if (stdScheduler.isShutdown()) {
                                log.warn("定时任务的Scheduler关闭了，准备重启。。。。。");
                                stdScheduler.start();
                                if(stdScheduler.isStarted()){
                                    log.warn("定时任务的Scheduler已成功重启。。。。。");
                                }
                            }

                        } catch (Exception e) {
                            log.error(e.getMessage(), e.fillInStackTrace());
                        }
                    }
                }
            });
            keeper.start();
            log.info("job的守护线程已创建！");
        }
    }
}
