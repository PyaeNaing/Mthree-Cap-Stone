package dao;

import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import main.java.models.Place;
import org.apache.commons.lang3.StringUtils;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.jdbc.core.RowMapper;
//import javax.swing.tree.RowMapper;
import javax.swing.tree.TreePath;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.sql.*;
import java.util.List;

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
    public void addPlace(String location)  {
        // get send location to external api
        // add inserts in a for loop based on the array results:
        results = getLocationsFromQuery(location);
        JSONObject jsonObj;

        for (int i = 0; i < results.length(); i++) {
            Place place = new Place();
            jsonObj = results.getJSONObject(i);
            String placeName = jsonObj.getString("PlaceName");
            String countryName = jsonObj.getString("CountryName");
            String regionId = jsonObj.getString("RegionId");
            String countryId = snipSky(jsonObj, "CountryId");
            String placeId = snipSky(jsonObj, "PlaceId");
            String cityId = snipSky(jsonObj, "CityId");

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

            jdbcTemplate.update((Connection conn) -> {

                PreparedStatement statement = conn.prepareStatement(
                        sql,
                        Statement.RETURN_GENERATED_KEYS);

                statement.setString(1, place.getPlaceId());
                statement.setString(2, place.getPlaceName());
                statement.setString(3, place.getCountryId());
                statement.setString(4, place.getCityId());
                statement.setString(5, place.getCountryName());
                statement.setString(6, place.getRegionId());
                return statement;
            });
        }
    }

    @Override
    public List<Place> getAll() {
        final String sql = "SELECT * FROM place;";
        return jdbcTemplate.query(sql, new PlaceMapper());
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

//    public JSONArray getFlights(String in, String out, String outbound) throws UnsupportedEncodingException, UnirestException {
//        String base = "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/%s/%s/%s";
//        String in_encode = URLEncoder.encode(in, StandardCharsets.UTF_8.toString());
//        String out_encode = URLEncoder.encode(in, StandardCharsets.UTF_8.toString());
//        String outbound_encode = URLEncoder.encode(in, StandardCharsets.UTF_8.toString());
//        String url = String.format(base, in_encode, out_encode, outbound_encode);
//        JSONObject myObj = getRapidAPICall(url).getBody().getObject();
//        JSONArray results = myObj.getJSONArray("Quotes");
//        return results;
//    }
}
