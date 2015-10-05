package com.ehaier.shoppingmall.otms.service;

import com.ehaier.shoppingmall.otms.base.TestBase;
import com.ehaier.shoppingmall.otms.model.SaJobs;
import com.haier.common.ServiceResult;
import com.haier.common.util.JsonUtil;
import lombok.extern.slf4j.Slf4j;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

/**
 * Created by admin on 2015/9/30.
 */
@Slf4j
public class JobServiceTest extends TestBase {

    @Autowired
    private JobService jobService;

    @Test
    public void testGetAllJobs(){
        ServiceResult<List<SaJobs>> saJobsList = jobService.getAllJobs();
        log.info(JsonUtil.toJson(saJobsList));
    }
}
