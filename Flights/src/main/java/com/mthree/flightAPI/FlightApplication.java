package com.mthree.flightAPI;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

@SpringBootApplication
public class FlightApplication {
    public static void main(String[] args) {
        ConfigurableApplicationContext appContext = SpringApplication.run(FlightApplication.class, args);
    }
}
