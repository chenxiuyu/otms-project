package com.ehaier.shoppingmall.otms.model;

import java.io.Serializable;
import java.util.Date;

/**
 * Created by admin on 2015/9/30.
 */
public class SaJobs implements Serializable{
    private int job_id;
    private String job_name;
    private String job_desc;
    private String job_creator;
    private String job_fire_cron;
    private String job_app_url;
    private String job_status;// '任务状态0初始化，1运行中，2停止',
    private Date create_time;
    private Date update_time;
    private String last_updator;
    private Date last_begin_time;
    private Date last_end_time;

    public int getJob_id() {
        return job_id;
    }

    public void setJob_id(int job_id) {
        this.job_id = job_id;
    }

    public String getJob_name() {
        return job_name;
    }

    public void setJob_name(String job_name) {
        this.job_name = job_name;
    }

    public String getJob_desc() {
        return job_desc;
    }

    public void setJob_desc(String job_desc) {
        this.job_desc = job_desc;
    }

    public String getJob_creator() {
        return job_creator;
    }

    public void setJob_creator(String job_creator) {
        this.job_creator = job_creator;
    }

    public String getJob_fire_cron() {
        return job_fire_cron;
    }

    public void setJob_fire_cron(String job_fire_cron) {
        this.job_fire_cron = job_fire_cron;
    }

    public String getJob_app_url() {
        return job_app_url;
    }

    public void setJob_app_url(String job_app_url) {
        this.job_app_url = job_app_url;
    }

    public String getJob_status() {
        return job_status;
    }

    public void setJob_status(String job_status) {
        this.job_status = job_status;
    }

    public Date getCreate_time() {
        return create_time;
    }

    public void setCreate_time(Date create_time) {
        this.create_time = create_time;
    }

    public Date getUpdate_time() {
        return update_time;
    }

    public void setUpdate_time(Date update_time) {
        this.update_time = update_time;
    }

    public String getLast_updator() {
        return last_updator;
    }

    public void setLast_updator(String last_updator) {
        this.last_updator = last_updator;
    }

    public Date getLast_begin_time() {
        return last_begin_time;
    }

    public void setLast_begin_time(Date last_begin_time) {
        this.last_begin_time = last_begin_time;
    }

    public Date getLast_end_time() {
        return last_end_time;
    }

    public void setLast_end_time(Date last_end_time) {
        this.last_end_time = last_end_time;
    }
}
