package controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.google.common.base.Stopwatch;
import lombok.extern.slf4j.Slf4j;
import org.joda.time.DateTime;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;

import java.util.concurrent.TimeUnit;

/**
 * Created by admin on 2015/9/25.
 */
@Slf4j
public class TestMain {
    private static final DateTimeFormatter DFT = DateTimeFormat.forPattern("yyyy-MM-dd HH:mm:ss");

    public static void  main(String [] ars){
        String json="{\"status\":0,\"message\":\"ok\",\"type\":2}";
        Stopwatch stopwatch = Stopwatch.createStarted();

        JSONObject msg = (JSONObject) JSON.parse(json);
        System.out.println(msg);

        stopwatch.stop();
        log.info("[MARK-commentSummary-FINISHED] end at {}, cost {}", DFT.print(DateTime.now()), stopwatch.elapsed(TimeUnit.SECONDS));
    }
}

class Msg {
    private String status;
    private String message;
    private String type;

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
