package com.mthree.capstone.controllers;

import com.mashape.unirest.http.exceptions.UnirestException;
import com.mthree.capstone.dao.PlaceDao;
import com.mthree.capstone.models.Place;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.util.List;

@RestController
@RequestMapping("/api")
public class PlaceController {

    private final PlaceDao dao;

    public PlaceController(PlaceDao dao) {
        this.dao = dao;
    }

    @GetMapping
    public List<Place> all() {
        return dao.getAll();
    }

    @PostMapping
    public void addPlaces(@RequestBody String location) throws UnsupportedEncodingException, UnirestException {
       dao.addPlaces(location);
    }
}