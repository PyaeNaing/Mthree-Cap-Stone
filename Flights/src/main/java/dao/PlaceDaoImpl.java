package dao;

import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import main.java.models.Place;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.jdbc.core.RowMapper;
//import javax.swing.tree.RowMapper;
import javax.swing.tree.TreePath;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;

import org.springframework.stereotype.Repository;


@Repository
public class PlaceDaoImpl implements PlaceDao {

    private final JdbcTemplate jdbcTemplate;
    // TODO: fix errors
    // JSONArray results;

    @Autowired
    public PlaceDaoImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public Place addPlace(String location) {
        return null;
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

//    private HttpResponse<JsonNode> getRapidAPICall(String url) throws UnirestException {
//        HttpResponse<JsonNode> result;
//        result = Unirest.get(url)
//                .header("x-rapidapi-key", "6a1f38a2bcmshd98dea5e600d16fp1941d5jsnfe042462c7cd")
//                .header("x-rapidapi-host", "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com")
//                .asJson();
//        return result;
//    }
//
//    public JSONArray getLocationsFromQuery(String query) throws UnirestException, UnsupportedEncodingException {
//        String base = "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/US/USD/en-US/?query=%s";
//        String url = String.format(base, URLEncoder.encode(query, StandardCharsets.UTF_8.toString()));
//        JSONObject myObj = getRapidAPICall(url).getBody().getObject();
//        JSONArray results = myObj.getJSONArray("Places");
//        return results;
//    }
}
