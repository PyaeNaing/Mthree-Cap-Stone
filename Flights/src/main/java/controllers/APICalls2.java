package controllers;

import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import org.apache.commons.lang3.StringUtils;
import org.json.JSONArray;
import org.json.JSONObject;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

public class APICalls2 {

    public static void main(String[] args) {
        APICalls2 api = new APICalls2();
        try {
            api.printLocationTableFromQuery("Mexico");
        } catch (UnirestException | UnsupportedEncodingException e) {
            e.printStackTrace();
        }
    }

    public JSONArray getLocationsFromQuery(String query) throws UnirestException, UnsupportedEncodingException {
        String base = "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/US/USD/en-US/?query=%s";
        String url = String.format(base, URLEncoder.encode(query, StandardCharsets.UTF_8.toString()));
        JSONObject myObj = getRapidAPICall(url).getBody().getObject();
        JSONArray results = myObj.getJSONArray("Places");
        return results;
    }

    public void printLocationTableFromQuery(String query) throws UnirestException, UnsupportedEncodingException {
        JSONArray results = getLocationsFromQuery(query);
        JSONObject jsonObj;
        System.out.printf("%-40s %-30s %-10s %-10s %-10s\n", "placeName", "countryId (countryName)", "placeId", "cityId", "regionId");
        System.out.printf("%-40s %-30s %-10s %-10s %-10s\n", "-----", "-----", "-----", "-----", "-----");
        for (int i = 0; i < results.length(); i++) {
            jsonObj = results.getJSONObject(i);
            String placeName = jsonObj.getString("PlaceName");
            String countryName = jsonObj.getString("CountryName");
            String regionId = jsonObj.getString("RegionId");
            String countryId = snipSky(jsonObj, "CountryId");
            String placeId = snipSky(jsonObj, "PlaceId");
            String cityId = snipSky(jsonObj, "CityId");
            System.out.printf("%-40s %-30s %-10s %-10s %-10s\n", placeName, (countryId + " (" + countryName + ")"), placeId, cityId, regionId);
        }
    }

    public JSONArray getFlights(String in, String out, String outbound, String inbound) throws UnsupportedEncodingException, UnirestException {
        String base = "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/%s/%s/%s?inboundpartialdate=%s";
        String in_encode = URLEncoder.encode(in, StandardCharsets.UTF_8.toString());
        String out_encode = URLEncoder.encode(in, StandardCharsets.UTF_8.toString());
        String outbound_encode = URLEncoder.encode(in, StandardCharsets.UTF_8.toString());
        String inbound_encode = URLEncoder.encode(in, StandardCharsets.UTF_8.toString());
        String url = String.format(base, in_encode, out_encode, outbound_encode, inbound_encode);
        JSONObject myObj = getRapidAPICall(url).getBody().getObject();
        JSONArray results = myObj.getJSONArray("Quotes");
        return results;
    }

    public JSONArray getFlights(String in, String out, String outbound) throws UnsupportedEncodingException, UnirestException {
        String base = "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/%s/%s/%s";
        String in_encode = URLEncoder.encode(in, StandardCharsets.UTF_8.toString());
        String out_encode = URLEncoder.encode(in, StandardCharsets.UTF_8.toString());
        String outbound_encode = URLEncoder.encode(in, StandardCharsets.UTF_8.toString());
        String url = String.format(base, in_encode, out_encode, outbound_encode);
        JSONObject myObj = getRapidAPICall(url).getBody().getObject();
        JSONArray results = myObj.getJSONArray("Quotes");
        return results;
    }

    private String snipSky(JSONObject jsonObj, String key) {
        String query = jsonObj.getString(key);
        return StringUtils.substring(query, 0, query.length()-4);
    }

    private HttpResponse<JsonNode> getRapidAPICall(String url) throws UnirestException {
        HttpResponse<JsonNode> result;
        result = Unirest.get(url)
                .header("x-rapidapi-key", "9be952171amsh22a4834aa397506p1c49a1jsn6c17f8bdf881")
                .header("x-rapidapi-host", "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com")
                .asJson();
        return result;
    }
}
