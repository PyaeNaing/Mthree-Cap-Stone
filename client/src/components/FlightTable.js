import React, { useState, useEffect } from 'react'
import FlightItem from './FlightItem';
import {Button, Form} from "react-bootstrap"
import '../css/FlightItem.css'

const FlightTable = () => {

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [maxValue, setMaxValue] = useState('');
  const getData = () => {
    fetch('DUMMY_DATA.json'
      , {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    )
      .then(function (response) {
        // console.log(response)
        return response.json();
      })
      .then(function (myJson) {
        // console.log(myJson);
        setData(myJson);
        setFilteredData(myJson);
      });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(maxValue.length === 0) return setFilteredData(data);

    setFilteredData(data.filter(item => {
      return item.MinPrice < maxValue;
    }))
    setMaxValue('');
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
      {filteredData.map(item => (
        <FlightItem
          key={item.QuoteId}
          OriginId={item.OutboundLeg.OriginId}
          DestinationId={item.OutboundLeg.DestinationId}
          DepartureDate={item.OutboundLeg.DepartureDate}
          MinPrice={item.MinPrice} />
      ))}
    </div>

  );

}

export default FlightTable