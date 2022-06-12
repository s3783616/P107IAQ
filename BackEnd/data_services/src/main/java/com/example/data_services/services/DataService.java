package com.example.data_services.services;

import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;

@Service
public class DataService {
    // Initialise the baseURL for Awair API and create OkHttpClient to call it
    private final String baseURL = "https://developer-apis.awair.is/v1/orgs/8646";
    private final OkHttpClient client = new OkHttpClient();

    public String getDevicesList() {
        Request req = new Request.Builder()
                .addHeader("x-api-key", "hZqzKsC0SRNY2sXioGnxFGk0srONpcsx")
                .url(baseURL + "/devices")
                .build();
        Response response;
        try {
            response = client.newCall(req).execute();
            return response.body().string();

        } catch (IOException e) {
            e.printStackTrace();
        }
        return "";
    }

    public ArrayList<Response> getData(String deviceID, String dataType, String dateFrom, String dateTo) {
        ArrayList<Response> responses = new ArrayList<>();
        // Get the current start and end times on the local machine to get data within this range
        LocalDateTime startDate = LocalDateTime.parse(dateFrom);
        LocalDateTime endDate = LocalDateTime.parse(dateTo);
        while (endDate.compareTo(startDate) > 0) {
            LocalDateTime tmp = startDate;
            // Depending we can determine if the user wants raw data, 5-min average
            // or 15-min average depending on user input
            switch (dataType) {
                case "raw":
                    tmp = tmp.plusHours(1);
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
            if (endDate.compareTo(tmp) <= 0) tmp = endDate;
            // Build the base URL and request data from Awair API to retrieve data from the device
            String url = baseURL + "/devices/awair-omni/" + deviceID + "/air-data/" + dataType + "?from=" + startDate + ":00.000Z" + "&to=" + tmp + ":00.000Z" + "&limit=360&desc=false&fahrenheit=false";
            Request req = new Request.Builder()
                    .addHeader("x-api-key", "hZqzKsC0SRNY2sXioGnxFGk0srONpcsx")
                    .url(url)
                    .build();
            Response response;
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