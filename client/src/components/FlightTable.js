import React, {useState,useEffect} from 'react'
import FlightItem from './FlightItem';
import '../css/FlightItem.css'

const FlightTable = () => {

        const[data, setData] = useState([]);
        const getData=()=>{
            fetch('DUMMY_DATA.json'
            ,{
              headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
               }
            }
            )
              .then(function(response){
                console.log(response)
                return response.json();
              })
              .then(function(myJson) {
                console.log(myJson);
                setData(myJson)
              });
          }

          useEffect(()=>{
            getData()
          },[])

          console.log()

    return(
        <div className='fs-results'>
            {data.map(item => (
                <FlightItem
                key={item.QuoteId}
                OriginId={item.OutboundLeg.OriginId}
                DestinationId={item.OutboundLeg.DestinationId}
                DepartureDate={item.OutboundLeg.DepartureDate}
                MinPrice={item.MinPrice}/>
            ))}
        </div>

    );
    
}

export default FlightTable