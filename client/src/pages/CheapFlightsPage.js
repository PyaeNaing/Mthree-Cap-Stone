import React, { useState } from 'react'
import FlightForm from '../components/FlightForm';

const CheapFlightsPage = () => {

    const [places, setPlaces] = useState(
        [
            {
                "PlaceId": "JFK-sky",
                "PlaceName": "New York John F. Kennedy",
                "CountryId": "US-sky",
                "RegionId": "NY",
                "CityId": "NYCA-sky",
                "CountryName": "United States",
            },
            {
                "PlaceId": "LAX-sky",
                "PlaceName": "Los Angeles International",
                "CountryId": "US-sky",
                "RegionId": "CA",
                "CityId": "LAXA-sky",
                "CountryName": "United States",
            },
        ]
    )

    return(
        <div className="container text-center">
            <h1>Cheap Flights</h1>

            <FlightForm data={places}/>
        </div>
    )
}

export default CheapFlightsPage;