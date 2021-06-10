package dao;

import main.java.models.Place;

import java.util.List;

public interface PlaceDao {
    void addPlace(String location);
    List<Place> getAll();
}
