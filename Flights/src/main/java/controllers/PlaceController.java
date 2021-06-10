package controllers;

import dao.PlaceDao;
import main.java.models.Place;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

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

}
