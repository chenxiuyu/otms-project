package com.ehaier.shoppingmall.otms.job;

import com.ehaier.shoppingmall.otms.job.framework.ClusterJob;
import com.ehaier.shoppingmall.otms.job.utils.MyApplicationContextUtils;
import com.google.common.base.Stopwatch;
import com.haier.cbs.system.service.SystemService;
import lombok.extern.slf4j.Slf4j;
import org.joda.time.DateTime;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;
import org.quartz.simpl.RAMJobStore;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import java.util.concurrent.TimeUnit;

@Slf4j
@Component
@Lazy(false)
public class OtmsBaseJob extends ClusterJob {
	private static final DateTimeFormatter DFT = DateTimeFormat.forPattern("yyyy-MM-dd HH:mm:ss");

	@Autowired
	private SystemService systemService;

	public OtmsBaseJob(){}

	/**
	 * 比对数据库里的job和内存里的job是否一致，如果不一致同步内存。
	 */
	public void execute() {
		if(!isLeader()){//每个job调用的时候必须先调用该方法，否则导致多个节点同时执行的情况发生
//			return;
		}
		log.info("start to execute commentSummary job ");
		Stopwatch stopwatch = Stopwatch.createStarted();
		RAMJobStore ramJobStore = MyApplicationContextUtils.getBean("ramJobStore");
		int ss = ramJobStore.getNumberOfJobs();
		log.info("##################"+ss);
		try {
			log.info("job running ..........");
//			ServiceResult<List<SysMenu>>  serviceResult = systemService.findMenuTree();
//			log.info(JsonUtil.toJson(serviceResult.getResult()));
			log.info("job ending ..........");
		} catch (Exception e) {
			e.printStackTrace();
		}

		stopwatch.stop();
		log.info("[MARK-commentSummary-FINISHED] end at {}, cost {}", DFT.print(DateTime.now()), stopwatch.elapsed(TimeUnit.SECONDS));
	}
}
