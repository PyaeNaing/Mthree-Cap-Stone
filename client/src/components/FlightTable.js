import React, { useState, useEffect } from 'react'
import FlightItem from './FlightItem';
import {Button, Form, Spinner} from "react-bootstrap"
import '../css/FlightItem.css'

const FlightTable = () => {

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [maxValue, setMaxValue] = useState('');
  
  const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }
  
  /*Use like so*/
  


  const getData = () => {
    setLoading(true);
    fetch('DUMMY_DATA.json'
      , {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        setData(myJson);
        setFilteredData(myJson);
        setLoading(false);
      });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    await sleep(500);
    if(maxValue.length === 0) {
      setLoading(false);
      return setFilteredData(data);
    }

    setFilteredData(data.filter(item => {
      return item.MinPrice < maxValue;
    }))

    setMaxValue('');
    setLoading(false);
  }

  useEffect(() => {
    
    getData()
  }, [])

  return (

    <div className='flight-results'>
      <Form onSubmit={handleSubmit}>
        <label>
          Maximun Price:
    <input type="number" value={maxValue} onChange={e => setMaxValue(e.target.value)} />
        </label>
        <Button variant="primary" type="submit">Submit</Button>
      </Form>
      
      {isLoading ? (<Spinner className='spinner-center' animation="border"/>) : 
      (filteredData.map(item => (
        <FlightItem
          key={item.QuoteId}
          OriginId={item.OutboundLeg.OriginId}
          DestinationId={item.OutboundLeg.DestinationId}
          DepartureDate={item.OutboundLeg.DepartureDate}
          MinPrice={item.MinPrice} />
      )))}
      {}
    </div>

  );

}

export default FlightTable