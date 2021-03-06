package com.mthree.capstone.dao;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import com.mthree.capstone.models.Place;
import org.apache.commons.lang3.StringUtils;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.jdbc.core.RowMapper;
//import javax.swing.tree.RowMapper;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.sql.*;
import java.util.List;

import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;

import org.springframework.stereotype.Repository;


@Repository
public class PlaceDaoImpl implements PlaceDao {

    private final JdbcTemplate jdbcTemplate;

    JSONArray results;

    @Autowired
    public PlaceDaoImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public void addPlaces(String location) throws UnsupportedEncodingException, UnirestException {
        // get send location to external api
        // add inserts in a for loop based on the array results:
        results = getLocationsFromQuery(location);
        JSONObject jsonObj;

        for (int i = 0; i < results.length(); i++) {

            jsonObj = results.getJSONObject(i);
            String placeName = jsonObj.getString("PlaceName");
            String countryName = jsonObj.getString("CountryName");
            String regionId = jsonObj.getString("RegionId");
            String countryId = snipSky(jsonObj, "CountryId");
            String placeId = snipSky(jsonObj, "PlaceId");
            String cityId = snipSky(jsonObj, "CityId");

            if (!isDuplicate(placeId)) {
                    // insert into place
                    final String sql = "INSERT INTO flightsdb.place " +
                            "(placeId, " +
                            "placeName, " +
                            "countryId, " +
                            "cityId, " +
                            "countryName, " +
                            "regionId) " +
                            "VALUES " +
                            "(?, " +
                            "?, " +
                            "?, " +
                            "?, " +
                            "?, " +
                            "?);";


                jdbcTemplate.update(sql, placeId,placeName,countryId,cityId,countryName, regionId);

            }
        }
    }

    @Override
    public List<Place> getAll() {
        final String sql = "SELECT * FROM flightsdb.place;";
        return jdbcTemplate.query(sql, new PlaceMapper());
    }

    // helper method to check if there is a duplicate in Place table
    public boolean isDuplicate (String placeId) {
        List<Place> places = getAll();
        for (int i = 0; i < places.size(); i ++) {
            if (places.get(i).getPlaceId().equalsIgnoreCase(placeId)){
                return true;
            }
        }
        return false;
    }

    private HttpResponse<JsonNode> getRapidAPICall(String url) throws UnirestException {
        HttpResponse<JsonNode> result;
        result = Unirest.get(url)
                .header("x-rapidapi-key", "6a1f38a2bcmshd98dea5e600d16fp1941d5jsnfe042462c7cd")
                .header("x-rapidapi-host", "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com")
                .asJson();
        return result;
    }

    public JSONArray getLocationsFromQuery(String query) throws UnirestException, UnsupportedEncodingException {
        String base = "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/US/USD/en-US/?query=%s";
        String url = String.format(base, URLEncoder.encode(query, StandardCharsets.UTF_8.toString()));
        JSONObject myObj = getRapidAPICall(url).getBody().getObject();
        JSONArray results = myObj.getJSONArray("Places");
        return results;
    }

    private String snipSky(JSONObject jsonObj, String key) {
        String query = jsonObj.getString(key);
        return StringUtils.substring(query, 0, query.length()-4);
    }

    private static final class PlaceMapper implements RowMapper<Place> {

        @Override
        public Place mapRow(ResultSet rs, int index) throws SQLException {
            Place place = new Place();

            place.setPlaceId(rs.getString("placeId"));
            place.setPlaceName(rs.getString("placeName"));
            place.setCountryId(rs.getString("countryId"));
            place.setCityId(rs.getString("cityId"));
            place.setCountryName(rs.getString("countryName"));
            place.setRegionId(rs.getString("regionId"));
            return place;
        }
    }
}
