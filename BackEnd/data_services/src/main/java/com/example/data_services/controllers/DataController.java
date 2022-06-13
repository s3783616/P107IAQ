package com.example.data_services.controllers;

import com.example.data_services.services.DataService;
import okhttp3.Response;
import org.jetbrains.annotations.NotNull;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/data")
public class DataController {
    @Autowired
    private DataService dataService;

    @GetMapping("/list")
    public ResponseEntity<?> getDeviceList() {
        String data = dataService.getDevicesList();
        return new ResponseEntity<>(data, HttpStatus.OK);
    }

    @GetMapping("/getData")
    public ResponseEntity<?> getData(@RequestParam(value = "deviceID") String deviceID,
                                     @RequestParam(value = "dateFrom") String dateFrom,
                                     @RequestParam(value = "dateTo") String dateTo,
                                     @RequestParam(value = "dataType") String dataType) {
        // Utilise the data service layer to get all the data from specified device with the data type
        ArrayList<Response> responses = dataService.getData(deviceID, dataType, dateFrom, dateTo);
        if (responses == null)
            return new ResponseEntity<>("Invalid parameter", HttpStatus.BAD_REQUEST);
        String data = "";
        JSONArray result_array = new JSONArray();
        for (Response response : responses) {
            try {
                // 9 represents the last element of the response body
                StringBuilder tmp = new StringBuilder(response.body().string());
                tmp.deleteCharAt(0);
                tmp.deleteCharAt(tmp.length() - 1);
                tmp.delete(1, 9);
                JSONArray jsonArray = new JSONArray(tmp.toString());
                result_array.put(jsonArray);
            } catch (IOException | JSONException e) {
                e.printStackTrace();
            }
        }
        return getResponseEntity(deviceID, data, result_array);
    }


    @GetMapping("/1minInterval")
    public ResponseEntity<?> getData1minIntv(@RequestParam(value = "deviceID", required = true) String deviceID,
                                             @RequestParam(value = "dateFrom", required = true) String dateFrom,
                                             @RequestParam(value = "dateTo", required = true) String dateTo) {
        // This is a custom 1 minute interval version using the data retrieved from the data service layer
        // We need to construct it ourselves as it is not part of the Awair API
        ArrayList<Response> responses = dataService.getData(deviceID, "raw", dateFrom, dateTo);
        String data = "";
        int interval = 6;
        JSONArray result_array = new JSONArray();
        for (Response response : responses) {
            try {
                StringBuilder tmp = new StringBuilder(response.body().string());
                tmp.deleteCharAt(0);
                tmp.deleteCharAt(tmp.length() - 1);
                tmp.delete(1, 9);
                JSONArray jsonArray = new JSONArray(tmp.toString());
                Map<String, Double> map = new HashMap<>();
                InitializeDataMap(map);
                double avg_score = 0.0;
                // We get every value from the map and check if it is equal
                // If it IS equal, we add it to the map and parse the value accordingly
                for (int i = 0; i < jsonArray.length(); i++) {
                    avg_score += Double.parseDouble(jsonArray.getJSONObject(i).get("score").toString());
                    JSONArray holder = jsonArray.getJSONObject(i).getJSONArray("sensors");
                    for (int j = 0; j < holder.length(); j++) {
                        if (holder.getJSONObject(j).get("comp").toString().equals("temp"))
                            map.put("temp", map.get("temp")
                                    + Double.parseDouble(holder.getJSONObject(j).get("value").toString()));
                        else if (holder.getJSONObject(j).get("comp").toString().equals("humid"))
                            map.put("humid", map.get("humid")
                                    + Double.parseDouble(holder.getJSONObject(j).get("value").toString()));
                        else if (holder.getJSONObject(j).get("comp").toString().equals("voc"))
                            map.put("voc", map.get("voc")
                                    + Double.parseDouble(holder.getJSONObject(j).get("value").toString()));
                        else if (holder.getJSONObject(j).get("comp").toString().equals("pm25"))
                            map.put("pm25", map.get("pm25")
                                    + Double.parseDouble(holder.getJSONObject(j).get("value").toString()));
                        else if (holder.getJSONObject(j).get("comp").toString().equals("pm10_est"))
                            map.put("pm10_est", map.get("pm10_est")
                                    + Double.parseDouble(holder.getJSONObject(j).get("value").toString()));
                        else if (holder.getJSONObject(j).get("comp").toString().equals("co2"))
                            map.put("co2", map.get("co2")
                                    + Double.parseDouble(holder.getJSONObject(j).get("value").toString()));
                        else if (holder.getJSONObject(j).get("comp").toString().equals("lux"))
                            map.put("lux", map.get("lux")
                                    + Double.parseDouble(holder.getJSONObject(j).get("value").toString()));
                        else if (holder.getJSONObject(j).get("comp").toString().equals("spl_a"))
                            map.put("spl_a", map.get("spl_a")
                                    + Double.parseDouble(holder.getJSONObject(j).get("value").toString()));
                    }
                    if ((i + 1) % interval == 0) {
                        JSONObject result = new JSONObject();
                        JSONArray sensors_array = new JSONArray();
                        avg_score = avg_score / interval;
                        for (String key : map.keySet()) {
                            JSONObject pair = new JSONObject();
                            pair.put("comp", key);
                            pair.put("value", map.get(key) / interval);
                            sensors_array.put(pair);
                            map.put(key, 0.0);
                        }
                        result.put("timestamp", jsonArray.getJSONObject(i + 1 - interval).get("timestamp"));
                        result.put("score", avg_score);
                        result.put("sensors", sensors_array);
                        result_array.put(result);
                        avg_score = 0.0;
                    }
                }
            } catch (IOException | JSONException e) {
                e.printStackTrace();
            }
        }
        return getResponseEntity(deviceID, data, result_array);
    }

    private void InitializeDataMap(Map<String, Double> map) {
        // Helper method to initialise the Map data structure containing all data to return
        map.put("temp", 0.0);
        map.put("humid", 0.0);
        map.put("voc", 0.0);
        map.put("pm25", 0.0);
        map.put("pm10_est", 0.0);
        map.put("co2", 0.0);
        map.put("lux", 0.0);
        map.put("spl_a", 0.0);
    }

    @NotNull
    private ResponseEntity<?> getResponseEntity(@RequestParam("deviceID") String deviceID, String data, JSONArray result_array) {
        // Helper method to return the response entity from provided data
        try {
            JSONObject deviceMetaData = new JSONObject();
            deviceMetaData.put("device_id", deviceID);
            result_array.put(deviceMetaData);
            data = data + result_array.toString(1);
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(data, HttpStatus.OK);
    }
}