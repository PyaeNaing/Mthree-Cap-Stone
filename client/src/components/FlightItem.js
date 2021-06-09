import React from 'react';
import FlightDate from './FlightDate'
import '../css/FlightItem.css';

const FlightItem = (props) =>{

    return(
        <div className="flight-item">
                {/* <p> ID : {props.key} </p> */}
                <FlightDate date={new Date(props.DepartureDate)}/>
                <div className="flight-item__description">
                <h2> Origin ID : {props.OriginId}</h2>
                <h2> Destination ID : {props.DestinationId}</h2>
                <div className="flight-item__price">Price : ${props.MinPrice}</div>

            </div>
        </div>
    )
}

export default FlightItem;