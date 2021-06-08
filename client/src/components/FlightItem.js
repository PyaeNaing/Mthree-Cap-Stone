import React from 'react';
import FlightDate from './FlightDate'
import '../css/FlightItem.css';

const FlightItem = (props) =>{

    return(
        <div className="fs-offer">
            <div className="fs-offer-col">
                {/* <p> ID : {props.key} </p> */}
                <FlightDate date={new Date(props.DepartureDate)}/>
                <p> Origin ID : {props.OriginId}</p>
                <p> Destination ID : {props.DestinationId}</p>
                <p>Price : {props.MinPrice}</p>

            </div>
        </div>
    )
}

export default FlightItem;