package com.ehaier.shoppingmall.otms.utils;

import java.util.Collection;
import java.util.List;
import java.util.concurrent.*;

/**
 * 线程池维护类。
 * User: admin
 */
public class ThreadPoolUtil {
    private static ThreadPoolExecutor threadPoolExecutor;
    private static int corePoolSize = 10;
    private static int maximumPoolSize = 50;
    private static long keepAliveTime = 1;
    private static int maxTaskSize = 100;

    /**
     * 单个提交线程到线程池
     * @param task
     * @param <T>
     * @return
     */
    public static <T> Future<T> submit(Callable<T> task) {
        if (threadPoolExecutor == null || threadPoolExecutor.isShutdown() || threadPoolExecutor.isTerminated()) {
            initDispatchThreadPool();
        }
        return threadPoolExecutor.submit(task);
    }

    /**
     * 批量提交线程到线程池
     * @param tasks
     * @return
     * @throws InterruptedException
     */
    public static List<Future<String>> invokeAll(Collection<Callable<String>> tasks)
            throws InterruptedException {
        if (threadPoolExecutor == null || threadPoolExecutor.isShutdown() || threadPoolExecutor.isTerminated()) {
            initDispatchThreadPool();
        }
        return threadPoolExecutor.invokeAll(tasks);
    }


    private synchronized static void initDispatchThreadPool() {
        if (threadPoolExecutor == null || threadPoolExecutor.isShutdown() || threadPoolExecutor.isTerminated()) {
            threadPoolExecutor = new ThreadPoolExecutor(corePoolSize, maximumPoolSize, keepAliveTime, TimeUnit.MINUTES,
                    new ArrayBlockingQueue(maxTaskSize), new ThreadPoolExecutor.CallerRunsPolicy());
        }
    }


    /**
     * 核心线程数
     *
     * @return
     */
    public static int getCorePoolSize() {
        if (threadPoolExecutor == null || threadPoolExecutor.isShutdown() || threadPoolExecutor.isTerminated()) {
            initDispatchThreadPool();
        }
        return threadPoolExecutor.getCorePoolSize();
    }

    /**
     * 当前线程数
     *
     * @return
     */
    public static int getPoolSize() {
        if (threadPoolExecutor == null || threadPoolExecutor.isShutdown() || threadPoolExecutor.isTerminated()) {
            initDispatchThreadPool();
        }
        return threadPoolExecutor.getPoolSize();
    }

    /**
     * 历史最大线程数
     *
     * @return
     */
    public static int getLargestPoolSize() {
        if (threadPoolExecutor == null || threadPoolExecutor.isShutdown() || threadPoolExecutor.isTerminated()) {
            initDispatchThreadPool();
        }
        return threadPoolExecutor.getLargestPoolSize();
    }

    /**
     * 大约完成任务数
     *
     * @return
     */
    public static long getCompletedTaskCount() {
        if (threadPoolExecutor == null || threadPoolExecutor.isShutdown() || threadPoolExecutor.isTerminated()) {
            initDispatchThreadPool();
        }
        return threadPoolExecutor.getCompletedTaskCount();
    }

    /**
     * 获取当前任务队列
     */
    public static int getCurrentQueueCount() {
        if (threadPoolExecutor == null || threadPoolExecutor.isShutdown() || threadPoolExecutor.isTerminated()) {
            initDispatchThreadPool();
        }
        return threadPoolExecutor.getQueue().size();
    }
}


