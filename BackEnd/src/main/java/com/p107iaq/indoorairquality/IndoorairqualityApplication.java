package com.p107iaq.indoorairquality;

import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.io.IOException;

@SpringBootApplication
public class IndoorairqualityApplication {

    public static void main(String[] args) throws IOException {
        SpringApplication.run(IndoorairqualityApplication.class, args);

        OkHttpClient client = new OkHttpClient();
        Request req = new Request.Builder()
                .addHeader("Authorization","hZqzKsC0SRNY2sXioGnxFGk0srONpcsx")
                .url("https://developer-apis.awair.is/v1/orgs/8646")
                .build();
        Response response = client.newCall(req).execute();
        System.out.println(response.body().string());

    }

    @Bean
    BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }


    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**");
            }
        };
    }
}
