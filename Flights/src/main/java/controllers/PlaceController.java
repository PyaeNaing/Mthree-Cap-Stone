package controllers;

import com.mashape.unirest.http.exceptions.UnirestException;
import dao.PlaceDao;
import models.Place;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.util.List;

@RestController
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