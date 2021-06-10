import React, { Component } from 'react';

import FlightTable from '../components/FlightTable'
import FlightForm from '../components/FlightForm';
import Navigation from '../components/Navigation'
class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            places: [
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
        };
    }

    render() {

        return (
            <div>
                <Navigation />
                <div className="container">
                    <div className="text-center">
                        {/* <h1>Flight Analysis</h1> */}
                        {/* Drop Down Selects to fetch compiled data */}
                        <FlightForm data={this.state.places} />
                        <FlightTable />
                    </div>
                </div>
            </div>

        )
    }
}

export default HomePage;
