import React, { useState, useEffect } from 'react'
import FlightItem from './FlightItem';
import { Button, Form, PageItem, Spinner } from "react-bootstrap"
import axios from 'axios';
import '../css/FlightItem.css'
import Pagination from './Pagination';

const FlightTable = () => {

  const [isLoading, setLoading] = useState(true);
  const [flightData, setFlightData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [maxValue, setMaxValue] = useState('');


  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostPerPage] = useState(10);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const currentPost = filteredData.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => {setCurrentPage(pageNumber)}

  // :)
  const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }


  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    // await sleep(500);
    if (maxValue.length === 0) {
      setLoading(false);
      return setFilteredData(flightData);
    }

    setFilteredData(flightData.filter(item => {
      return item.MinPrice < maxValue;
    }))

    setMaxValue('');
    setLoading(false);
  }

  const getData = async () => {
    setLoading(true);
    const res = await axios.get('/DUMMY_DATA.json');
    setFlightData(res.data);
    setFilteredData(res.data);
    setLoading(false);
  }

  useEffect(() => {
    getData();
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

      {isLoading ? (<Spinner className='spinner-center' animation="border" />) :
        (currentPost.map(item => (
          <FlightItem
            key={item.QuoteId}
            OriginId={item.OutboundLeg.OriginId}
            DestinationId={item.OutboundLeg.DestinationId}
            DepartureDate={item.OutboundLeg.DepartureDate}
            MinPrice={item.MinPrice} />
        )))}
        <Pagination postsPerPage={postsPerPage} totalPosts={filteredData.length} paginate={paginate}/>
    </div>
  );
}

export default FlightTable