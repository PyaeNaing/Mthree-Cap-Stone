import React from 'react';
import FlightDate from './FlightDate'
import '../css/FlightItem.css';
import { BsChevronDoubleRight } from "react-icons/bs";


const FlightItem = (props) =>{

    return(
        <div className="flight-item">
                {/* <p> ID : {props.key} </p> */}
                <FlightDate date={new Date(props.DepartureDate)}/>
                <div className="flight-item__description">
                <h2>{props.OriginId}</h2>
                <BsChevronDoubleRight size={50} />
                <h2>{props.DestinationId}</h2>
                <div className="flight-item__price">Price : ${props.MinPrice}</div>

            </div>
        </div>
    )
}

export default FlightItem;