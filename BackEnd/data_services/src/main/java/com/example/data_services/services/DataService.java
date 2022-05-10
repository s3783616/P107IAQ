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

    public ArrayList<Response> getRawData(String deviceID,String dateFrom, String dateTo){
        ArrayList<Response> respones = new ArrayList<Response>();
        LocalDateTime startDate = LocalDateTime.parse(dateFrom);
        LocalDateTime endDate = LocalDateTime.parse(dateTo);

        while(endDate.compareTo(startDate)>0){
            LocalDateTime tmp = startDate;
            tmp = tmp.plusHours(1);
            if(endDate.compareTo(tmp)<=0) tmp = endDate;
            String url = baseURL+"/devices/awair-omni/"+deviceID+"/air-data/raw?from="+startDate.toString()+":00.000Z"+"&to="+tmp.toString()+":00.000Z"+"&limit=360&desc=false&fahrenheit=false";
            Request req = new Request.Builder()
                    .addHeader("x-api-key","hZqzKsC0SRNY2sXioGnxFGk0srONpcsx")
                    .url(url)
                    .build();
            Response response = null;

            {
                try {
                    response = client.newCall(req).execute();
                    respones.add(response);

                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            startDate= tmp;
        }

        return respones;
    }

    public ArrayList<Response> get5minutesAvgData(String deviceID,String dateFrom, String dateTo){
        ArrayList<Response> responses = new ArrayList<Response>();
        LocalDateTime startDate = LocalDateTime.parse(dateFrom);
        LocalDateTime endDate = LocalDateTime.parse(dateTo);
        while(endDate.compareTo(startDate)>0){
            LocalDateTime tmp = startDate;
            tmp = tmp.plusHours(24);
            if(endDate.compareTo(tmp)<=0) tmp = endDate;

            String url = baseURL+"/devices/awair-omni/"+deviceID+"/air-data/5-min-avg?from="+startDate.toString()+":00.000Z"+"&to="+tmp.toString()+":00.000Z"+"&limit=360&desc=false&fahrenheit=false";
            System.out.println(url);
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
    public ArrayList<Response> get15minutesAvgData(String deviceID,String dateFrom, String dateTo){
        ArrayList<Response> responses = new ArrayList<Response>();
        LocalDateTime startDate = LocalDateTime.parse(dateFrom);
        LocalDateTime endDate = LocalDateTime.parse(dateTo);

        while(endDate.compareTo(startDate)>0){
            LocalDateTime tmp = startDate;
            tmp = tmp.plusDays(7);
            if(endDate.compareTo(tmp)<=0) tmp = endDate;

            String url = baseURL+"/devices/awair-omni/"+deviceID+"/air-data/15-min-avg?from="+startDate.toString()+":00.000Z"+"&to="+tmp.toString()+":00.000Z"+"&limit=360&desc=false&fahrenheit=false";
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