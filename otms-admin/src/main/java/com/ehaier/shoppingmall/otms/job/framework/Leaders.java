package com.ehaier.shoppingmall.otms.job.framework;

import com.google.common.base.Objects;
import org.apache.curator.framework.CuratorFramework;
import org.apache.curator.framework.CuratorFrameworkFactory;
import org.apache.curator.framework.recipes.leader.LeaderLatch;
import org.apache.curator.framework.recipes.leader.LeaderLatchListener;
import org.apache.curator.retry.ExponentialBackoffRetry;

public class Leaders {
	private final CuratorFramework client;
	public Leaders(String connStr) throws InterruptedException{
		this.client = CuratorFrameworkFactory.newClient(connStr, new ExponentialBackoffRetry(1000, 3));
		this.client.start();
		this.client.getZookeeperClient().blockUntilConnectedOrTimedOut();
	}
	
	public LeaderLatch initLeaderLatch(String path, String identity, LeaderLatchListener... listeners) throws Exception{
		LeaderLatch leaderLatch = new LeaderLatch(this.client, path, identity);
		for (LeaderLatchListener listener : listeners) {
			leaderLatch.addListener(listener);
		}
		leaderLatch.start();
		return leaderLatch;
	}
	
	public boolean isLeader(LeaderLatch leaderLatch, String identity) throws Exception {
		return Objects.equal(leaderLatch.getLeader().getId(), identity);
	}
	
	public void close(){
		this.client.close();
	}
}
