package com.mthree.capstone.dao;

import com.mashape.unirest.http.exceptions.UnirestException;
import com.mthree.capstone.models.Place;

import java.io.UnsupportedEncodingException;
import java.util.List;

public interface PlaceDao {
    void addPlaces(String location) throws UnsupportedEncodingException, UnirestException;
    List<Place> getAll();
}
