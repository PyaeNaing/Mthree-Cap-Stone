package dao;

import com.mashape.unirest.http.exceptions.UnirestException;
import models.Place;

import java.io.UnsupportedEncodingException;
import java.util.List;

public interface PlaceDao {
    void addPlace(String location) throws UnsupportedEncodingException, UnirestException;
    List<Place> getAll();
}
