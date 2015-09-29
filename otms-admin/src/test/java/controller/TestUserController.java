package controller;

import base.TestBaseController;
import lombok.extern.slf4j.Slf4j;
import org.junit.Test;
import org.springframework.http.MediaType;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * Created by admin on 2015/9/25.
 */
@Slf4j
public class TestUserController extends TestBaseController {

    @Test
    public void testGetUser() throws Exception {
        ra =
                mockMvc.perform(get("/user/getuserbyid").
                                accept(MediaType.APPLICATION_JSON)
//                                .param("row_id", "3000000889691800")
                )
                        .andExpect(status().isOk())
                        .andExpect(content().contentType("application/json;charset=UTF-8"));
        mvcResult = ra.andReturn();
        val = mvcResult.getResponse().getContentAsString();
        log.info(val);
    }
}
