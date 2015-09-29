package com.ehaier.shoppingmall.otms.job.framework;

import com.google.common.base.Throwables;
import lombok.extern.slf4j.Slf4j;
import org.apache.curator.framework.recipes.leader.LeaderLatch;

@Slf4j
public class TaskLeader {
	private Leaders leaders;
	private final String id;
    private LeaderLatch leaderLatch;
    public TaskLeader(Leaders leaders,String id) throws Exception{
    	this.id  = id;
    	this.leaders = leaders;
        init();
    }
    
    public void init() throws Exception {
        if (leaders != null) {
            leaderLatch = leaders.initLeaderLatch("/otms_job_leader", id);
        }
    }
    
    public String currentLeaderId() {
        try {
            if (leaders != null) {
                return leaderLatch.getLeader().getId();
            } else {
                return id;
            }
        } catch (Exception e) {
        	log.error(Throwables.getStackTraceAsString(e));
            return "unknown";
        }
    }
    
    public boolean isLeader() {
        if (leaders == null) {
            return true;
        }
        try {
            return leaders.isLeader(leaderLatch, id);
        } catch (Exception e) {
        	log.error(Throwables.getStackTraceAsString(e));
            return false;
        }
    }

    public void shutdown() throws Exception {
        if (leaders != null) {
            leaderLatch.close();
            leaders.close();
        }
    }
}
