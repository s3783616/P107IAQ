package com.example.data_services.web;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import okhttp3.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.data_services.services.DataService;

import java.io.IOException;
import java.util.ArrayList;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/data")
public class DataController {
    @Autowired
    private DataService dataService;

    @GetMapping("/list")
    public ResponseEntity<?>getDeviceList() {
        String data = dataService.getDevicesList();

        return new ResponseEntity<>(data, HttpStatus.OK);
    }

    @GetMapping("/getData")
    public ResponseEntity<?>getData(@RequestParam(value = "deviceID", required = true) String deviceID,
                                    @RequestParam(value = "dateFrom", required = true) String dateFrom,
                                    @RequestParam(value = "dateTo", required = true) String dateTo,
                                    @RequestParam(value = "dataType", required = true) String dataType){
        ArrayList<Response> responses = dataService.getData(deviceID,dataType,dateFrom,dateTo);
        if (responses == null) return new ResponseEntity<>("Invalid parameter",HttpStatus.BAD_REQUEST);
        String data = "";
        for (Response response:responses){
            try {
                data = data+response.body().string();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return new ResponseEntity<>(data, HttpStatus.OK);
    }

    @GetMapping("/1minInterval")
    public ResponseEntity<?>getData1minIntv(@RequestParam(value = "deviceID", required = true) String deviceID,
                                            @RequestParam(value = "dateFrom", required = true) String dateFrom,
                                            @RequestParam(value = "dateTo", required = true) String dateTo){
        ArrayList<Response> responses = dataService.getData(deviceID,"raw",dateFrom,dateTo);
        String data= "";
        String seperator = "\"data:\"";
        for (Response response:responses){
            try {
                StringBuilder tmp = new StringBuilder(response.body().string());
                tmp.deleteCharAt(0);
                tmp.deleteCharAt(tmp.length()-1);
                tmp.delete(1,9);
                JSONArray jsonArrayBefore= new JSONArray(tmp.toString());
                JSONArray jsonTmpAfter = new JSONArray();

                for(int i=0; i<jsonArrayBefore.length();i++){
                    if(i % 6 ==0) {
                        jsonTmpAfter.put(jsonArrayBefore.getJSONObject(i));
                    }
                }
                data = data + "{" + "\n" + seperator + jsonTmpAfter.toString(1) + "}";
            } catch (IOException | JSONException e) {
                e.printStackTrace();
            }
        }
        return new ResponseEntity<>(data, HttpStatus.OK);
    }
}