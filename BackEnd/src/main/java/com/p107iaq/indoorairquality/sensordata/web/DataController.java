package com.p107iaq.indoorairquality.sensordata.web;

import com.p107iaq.indoorairquality.sensordata.services.DataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/data")
public class DataController {
    @Autowired
    private DataService dataService;

    @GetMapping("")
    public ResponseEntity<?> getData() {
//        String data = dataService.getRawData();
        String data = "Test";
        return new ResponseEntity<>(data, HttpStatus.OK);
    }
}
