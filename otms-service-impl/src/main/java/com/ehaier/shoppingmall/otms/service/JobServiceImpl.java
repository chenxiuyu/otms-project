package com.ehaier.shoppingmall.otms.service;

import com.ehaier.shoppingmall.otms.dao.JobDaoMapper;
import com.ehaier.shoppingmall.otms.model.SaJobs;
import com.haier.common.ServiceResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by admin on 2015/9/30.
 */
@Service
public class JobServiceImpl implements JobService {

    @Autowired
    private JobDaoMapper jobDaoMapper;

    @Override
    public ServiceResult<List<SaJobs>> getAllJobs() {
        ServiceResult<List<SaJobs>> result = new ServiceResult<List<SaJobs>>();
        try{
            List<SaJobs> saJobsList = jobDaoMapper.getAllJobs();
            result.setResult(saJobsList);
        }catch (Exception e){
            result.setError("DB-ERROR","获取job失败");
        }
        return result;
    }
}


