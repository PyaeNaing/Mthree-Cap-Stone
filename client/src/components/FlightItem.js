import React from 'react'
import '../css/flightItem.css'

const FlightItem = (props) =>{
    console.log(props)
    return(
        <div className="fs-result">
            <div className="fs-offer-col">
                {/* <p> ID : {props.key} </p> */}
                <p> Origin ID : {props.OriginId}</p>
                <p> Destination ID : {props.DestinationId}</p>
                <p> Depature Date : {props.DepartureDate}</p>
                <p>Price : {props.MinPrice}</p>

            </div>
        </div>
    )
}

export default FlightItem;