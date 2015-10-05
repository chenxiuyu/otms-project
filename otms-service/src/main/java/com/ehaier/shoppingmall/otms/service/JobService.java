package com.ehaier.shoppingmall.otms.service;

import com.ehaier.shoppingmall.otms.model.SaJobs;
import com.haier.common.ServiceResult;

import java.util.List;

/**
 * Created by admin on 2015/9/30.
 */
public interface JobService {

    ServiceResult<List<SaJobs>> getAllJobs();
 }
