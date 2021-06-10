package dao;

import main.java.models.Place;

import java.util.List;

public interface PlaceDao {
    Place addPlace(String location);
    List<Place> getAll();
}
