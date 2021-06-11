import React, { Component } from 'react';
import Axios from 'axios';
import Button from "react-bootstrap/Button";
import { Container, Form, Table } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Jumbotron from 'react-bootstrap/Jumbotron'
import Alert from 'react-bootstrap/Alert';

import { BsChevronDoubleRight } from "react-icons/bs";
import { Badge } from 'react-bootstrap';
import axios from 'axios';


class FlightForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            from: '',
            to: '',
            data: []
        }
    }

    submitHandler = event => {
        event.preventDefault();
        this.setState({
            from: '',
            to: ''
        })
        axios.get('http://localhost:8080/api/place/' + this.state.from)
            .then(res => {
                console.log(res);
                this.setState({ data: res.data })
            })

    }

    changeFrom = event => {
        this.setState({ from: event.target.value });
    }

    changeTo = event => {
        this.setState({ to: event.target.value });
    }

    render() {
        return (
            <Container fluid>
                {(this.state.to < 0 || this.state.from < 0) && <Alert variant="primary">
                    Choose a location to fly from and land at...
                </Alert>}
                <form>
                    <hr />
                    <Row>
                        <Col>
                            <Container>
                                <Form.Control onChange={this.changeFrom} value={this.state.from} placeholder="From" />
                            </Container>

                        </Col>


                        <Col>
                            <Container>
                                <Form.Control placeholder="To" />
                            </Container>

                        </Col>
                        <Col>
                            <Button onClick={this.submitHandler}>Subtmit</Button>
                        </Col>
                    </Row>

                </form>

                <hr />

                <Jumbotron fluid style={{ backgroundColor: "#6c6c82" }}>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>PlaceName</th>
                                <th>CountryId</th>
                                <th>PlaceId</th>
                                <th>CityId</th>
                                <th>CountryName</th>
                                <th>RegionId</th>
                                <th>PlaceId</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.data.map((item, index) => (
                                <tr>
                                    <th>{index}</th>
                                    <th>{item.PlaceName}</th>
                                    <th>{item.CountryId}</th>
                                    <th>{item.PlaceId}</th>
                                    <th>{item.CityId}</th>
                                    <th>{item.CountryName}</th>
                                    <th>{item.RegionId}</th>
                                    <th>{item.PlaceId}</th>
                                </tr>))}
                        </tbody>
                    </Table>
                </Jumbotron>

            </Container>
        )
    }
}

export default FlightForm;
