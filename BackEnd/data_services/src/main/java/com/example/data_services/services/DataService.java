package com.example.data_services.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;

@Service
public class DataService {
    private String baseURL = "https://developer-apis.awair.is/v1/orgs/8646";
    private OkHttpClient client = new OkHttpClient();

    public String getDevicesList() {

        Request req = new Request.Builder()
                .addHeader("x-api-key","hZqzKsC0SRNY2sXioGnxFGk0srONpcsx")
                .url(baseURL+"/devices")
                .build();
        Response response = null;

        {
            try {
                response = client.newCall(req).execute();
                return response.body().string();

            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return "";
    }


    public ArrayList<Response> getData(String deviceID,String dataType,String dateFrom, String dateTo){
        ArrayList<Response> responses = new ArrayList<Response>();
        LocalDateTime startDate = LocalDateTime.parse(dateFrom);
        LocalDateTime endDate = LocalDateTime.parse(dateTo);

        while(endDate.compareTo(startDate)>0){
            LocalDateTime tmp = startDate;

            switch (dataType){
                case "raw":
                    tmp  = tmp.plusHours(1);
                    break;
                case "5-min-avg":
                    tmp = tmp.plusHours(24);
                    break;
                case "15-min-avg":
                    tmp = tmp.plusDays(7);
                    break;
                default:
                    return null;
            }
            if(endDate.compareTo(tmp)<=0) tmp = endDate;

            String url = baseURL+"/devices/awair-omni/"+deviceID+"/air-data/"+dataType+"?from="+startDate.toString()+":00.000Z"+"&to="+tmp.toString()+":00.000Z"+"&limit=360&desc=false&fahrenheit=false";
            Request req = new Request.Builder()
                    .addHeader("x-api-key","hZqzKsC0SRNY2sXioGnxFGk0srONpcsx")
                    .url(url)
                    .build();
            Response response = null;

            {
                try {
                    response = client.newCall(req).execute();
                    responses.add(response);

                } catch (IOException e) {
                    e.printStackTrace();
                }
            }

            startDate = tmp;
        }

        return responses;
    }
}