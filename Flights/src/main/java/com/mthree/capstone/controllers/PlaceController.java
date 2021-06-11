package com.mthree.capstone.controllers;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.mashape.unirest.http.exceptions.UnirestException;
import com.mthree.capstone.dao.PlaceDao;
import com.mthree.capstone.models.Place;
import com.mthree.capstone.service.APICalls2;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.util.*;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/place")
public class PlaceController {

    private final PlaceDao dao;

    private final APICalls2 api;

    public PlaceController(PlaceDao dao, APICalls2 api) {
        this.dao = dao;
        this.api = api;
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public class PlaceObj {
        private String name;
        private String code;
        private Double rate;
        // add getters and setters
    }

//    @GetMapping
//    public List<Place> all() {
//        return dao.getAll();
//    }

    //Reference for below code: https://stackoverflow.com/questions/21720759/convert-a-json-string-to-a-hashmap
    public Map<String, Object> toMap(JSONObject object) throws JSONException {
        Map<String, Object> map = new HashMap<String, Object>();

        Iterator<String> keysItr = object.keys();
        while(keysItr.hasNext()) {
            String key = keysItr.next();
            Object value = object.get(key);

            if(value instanceof JSONArray) {
                value = toList((JSONArray) value);
            }

            else if(value instanceof JSONObject) {
                value = toMap((JSONObject) value);
            }
            map.put(key, value);
        }
        return map;
    }

    public List<Object> toList(JSONArray array) throws JSONException {
        List<Object> list = new ArrayList<Object>();
        for(int i = 0; i < array.length(); i++) {
            Object value = array.get(i);
            if(value instanceof JSONArray) {
                value = toList((JSONArray) value);
            }

            else if(value instanceof JSONObject) {
                value = toMap((JSONObject) value);
            }
            list.add(value);
        }
        return list;
    }

    @GetMapping("/{q}")
    public ResponseEntity<List<Object>> getPlacesByQuery(@PathVariable String q) {
        try {
            JSONArray result = api.getLocationsFromQuery(q);
            return ResponseEntity.ok(toList(result));
        } catch (UnirestException e) {
            e.printStackTrace();
            return new ResponseEntity(null, HttpStatus.NOT_FOUND);
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
            return new ResponseEntity(null, HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/{location}")
    public void addPlaces(@PathVariable String location) throws UnsupportedEncodingException, UnirestException {
        dao.addPlaces(location);
    }
}