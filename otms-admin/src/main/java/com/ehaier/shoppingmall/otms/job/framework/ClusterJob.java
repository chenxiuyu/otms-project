package com.ehaier.shoppingmall.otms.job.framework;

import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.DisposableBean;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Value;

import java.net.InetAddress;
import java.util.UUID;

/**
 * @author kevin
 *
 */
@Slf4j
public class ClusterJob implements InitializingBean,DisposableBean{
	private TaskLeader taskLeader;
	@Setter
	@Value("#{app['zookeeper.address']}")
	private String zookeeper;
    /**
     * 判断是否在当前节点上运行
     * @return
     */
    public boolean isLeader() {
        if (taskLeader == null) {
            return true;
        }
        try {
        	log.info("current leader : {}",this.taskLeader.currentLeaderId());
            return taskLeader.isLeader();
        } catch (Exception e) {
            log.error("oops, zookeeper failed,", e);
            return false;
        }
    }

	@Override
	public void afterPropertiesSet() throws Exception {
		String randomId = UUID.randomUUID().toString();
		String tempHostName = null;
        try {
            tempHostName = InetAddress.getLocalHost().getHostName();
            log.info("get local host name:{}", tempHostName);
        } catch (Exception e) {
            log.error("failed to get local host name", e);
        }

        String jobRunnerId = tempHostName + ":" + randomId;
        log.info("init job runner with id {}.",jobRunnerId);
        taskLeader = new TaskLeader(new Leaders(zookeeper), jobRunnerId);
	}

	@Override
	public void destroy() throws Exception {
		if(this.taskLeader != null){
			this.taskLeader.shutdown();
		}
	}
}
