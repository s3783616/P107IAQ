package com.p107iaq.indoorairquality;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class IndoorairqualityApplication {

    /**
     * add this to Maven Dependency
     * <p>
     * <!-- https://mvnrepository.com/artifact/com.squareup.okhttp/okhttp -->
     * <dependency>
     * <groupId>com.squareup.okhttp</groupId>
     * <artifactId>okhttp</artifactId>
     * <version>2.7.5</version>
     * </dependency>
     */
//
//    OkHttpClient client = new OkHttpClient();
//    Request req = new Request.Builder()
//            .addHeader("Authorization", "hZqzKsC0SRNY2sXioGnxFGk0srONpcsx")
//            .url("https://developer-apis.awair.is/v1/orgs/8646")
//            .build();
//    Response response = client.newCall(req).execute();
//        System.out.println(response.body().string());

    public static void main(String[] args) {
        SpringApplication.run(IndoorairqualityApplication.class, args);
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
