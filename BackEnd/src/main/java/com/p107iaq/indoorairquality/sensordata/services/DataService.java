package com.p107iaq.indoorairquality.sensordata.services;

import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class DataService {
    String baseURL = "https://developer-apis.awair.is/v1/orgs/8646";

    public String getRawData() {

        OkHttpClient client = new OkHttpClient();
        Request req = new Request.Builder()
                .addHeader("x-api-key","hZqzKsC0SRNY2sXioGnxFGk0srONpcsx")
                .url(baseURL)
                .build();
        Response response = null;
        {
            try {
                response = client.newCall(req).execute();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        System.out.println(response.body().toString());
        return response.body().toString();
    }
}
