package com.example.data_services.web;
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

    @GetMapping("/rawData")
    public ResponseEntity<?>getRawData(@RequestParam(value = "deviceID", required = true) String deviceID,
                                       @RequestParam(value = "dateFrom", required = true) String dateFrom,
                                       @RequestParam(value = "dateTo", required = true) String dateTo){

        ArrayList<Response> responses = dataService.getRawData(deviceID,dateFrom,dateTo);
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

    @GetMapping("/5minInterval")
    public ResponseEntity<?>getData5minIntv(@RequestParam(value = "deviceID", required = true) String deviceID,
                                       @RequestParam(value = "dateFrom", required = true) String dateFrom,
                                       @RequestParam(value = "dateTo", required = true) String dateTo){

        ArrayList<Response> responses = dataService.get5minutesAvgData(deviceID,dateFrom,dateTo);
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

    @GetMapping("/15minInterval")
    public ResponseEntity<?>getData15minIntv(@RequestParam(value = "deviceID", required = true) String deviceID,
                                            @RequestParam(value = "dateFrom", required = true) String dateFrom,
                                            @RequestParam(value = "dateTo", required = true) String dateTo){

        ArrayList<Response> responses = dataService.get15minutesAvgData(deviceID,dateFrom,dateTo);
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
        ArrayList<Response> responses = dataService.getRawData(deviceID,dateFrom,dateTo);
        String data= "";
        for (Response response:responses){
            try {
                JSONObject jsonObject = new JSONObject(response.body().string());
                System.out.println("JSON Object: "+jsonObject.getJSONObject("data"));

            } catch (IOException | JSONException e) {
                e.printStackTrace();
            }
        }
        return new ResponseEntity<>(data, HttpStatus.OK);
    }
}