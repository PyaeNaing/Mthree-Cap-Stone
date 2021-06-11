import React, { useState, useEffect } from 'react'
import FlightItem from './FlightItem';
import { Button, Form, Spinner, Row, Col } from "react-bootstrap"
import axios from 'axios';
import '../css/FlightItem.css'
import Pagination from './Pagination';
import SelectSearch from './SelectSearch';

const FlightTable = (props) => {

  const [isLoading, setLoading] = useState(true);
  const [flightData, setFlightData] = useState(props.data);
  const [filteredData, setFilteredData] = useState([]);
  const [maxValue, setMaxValue] = useState('');


  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostPerPage] = useState(10);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const currentPost = filteredData.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => { setCurrentPage(pageNumber) }

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
      return item.MinPrice < parseInt(maxValue);
    }))

    setMaxValue('');
    setLoading(false);
  }

  const getData = async () => {

      setLoading(true);
      let res = [];
      console.log("in Flight Table loading Data")
      console.log(props.data);
      if(props.data.length != 0) {res = props.data}
      // else {res = await axios.get('/DUMMY_DATA.json');}
      console.log(res);
      setFlightData(res);
      setFilteredData(res);
      setLoading(false);
  

  }

  useEffect(() => {
    getData();
  }, [])

  return (

    <div className='flight-results'>

      <Form onSubmit={handleSubmit}>
      <Row>
        <Col>
          <SelectSearch />
        </Col>
        <Col>
          <input type="text" value={maxValue} onChange={e => setMaxValue(e.target.value)} />
        </Col>
        <Col>
          <Button variant="primary" type="submit">Submit</Button>
        </Col>
      </Row>

      </Form>
      <div style={{ marginTop: '10px' }}>
        <Pagination postsPerPage={postsPerPage} totalPosts={filteredData.length} paginate={paginate} />
      </div>
      {isLoading ? (<Spinner className='spinner-center' animation="border" />) :
        (currentPost.map(item => (
          <FlightItem
            key={item.QuoteId}
            OriginId={props.origin}
            DestinationId={props.destnation}
            DepartureDate={item.OutboundLeg.DepartureDate}
            MinPrice={item.MinPrice} />
        )))}
      <Pagination postsPerPage={postsPerPage} totalPosts={filteredData.length} paginate={paginate} />
    </div>
  );
}

export default FlightTable