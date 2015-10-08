package controller;

import base.TestBaseController;
import com.ehaier.shoppingmall.otms.job.GetDataFromEhaierJob;
import com.ehaier.shoppingmall.otms.utils.QuartzUtil;
import lombok.extern.slf4j.Slf4j;
import org.junit.Test;

/**
 * Created by admin on 2015/9/28.
 */
@Slf4j
public class QuartzControllerTest extends TestBaseController {

    @Test
    public void testAddJob() throws Exception {
        QuartzUtil.addJob("testjob1", "OTMS", "trriger1", "trriger-otms", new GetDataFromEhaierJob(), "0 0/1 * * * ?");
    }
}
