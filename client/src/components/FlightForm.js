import React, { Component } from 'react';

import axios from 'axios';
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { Spinner } from 'react-bootstrap';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Jumbotron from 'react-bootstrap/Jumbotron'
import Alert from 'react-bootstrap/Alert';
import FlightTable from './FlightTable';
import { BsChevronDoubleRight } from "react-icons/bs";
import { Badge } from 'react-bootstrap';


class FlightForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,

            from: -1,
            to: -1,

            searchO: '',
            searchD: '',

            originID: '',
            destId: '',

            origins: [],
            destinations: [],

            flightInfo: []
        }

        this.changeOrigin = this.changeOrigin.bind(this);
        this.changeDestination = this.changeDestination.bind(this);

        this.searchOrigins = this.searchOrigins.bind(this);
        this.searchDestinations = this.searchDestinations.bind(this);
    }

    changeFrom = event => {
        this.setState({ from: event.target.value });
    }

    changeTo = event => {
        this.setState({ to: event.target.value });
    }

    //handling search forms
    changeOrigin(event) {
        this.setState({ searchO: event.target.value })
    }

    changeDestination(event) {
        this.setState({ searchD: event.target.value })
    }

    async searchOrigins(event) {
        this.setState({loading: true})
        axios.get('http://localhost:8080/api/place/' + this.state.searchO)
            .then(res => {
                const places = res.data;
                console.log(places);
                this.setState({ origins: places });
                this.setState({loading: false})
            }).catch(err => {
                this.setState({loading: false})
            })
        event.preventDefault();
    }

    async searchDestinations(event) {
        console.log(this.state.searchD);
        this.setState({loading: true})

        axios.get('http://localhost:8080/api/place/' + this.state.searchD)
            .then(res => {
                const places = res.data;
                console.log(places);
                this.setState({ destinations: places });
                this.setState({loading: false})

            }).catch(err => {
                this.setState({loading: false})
            })

        event.preventDefault();
    }

    getFlights = (event) => {
        if (this.state.to >= 0 && this.state.from >= 0) {
            this.setState({loading : true});
            axios.get('http://localhost:8080/api/flight/from/' + this.state.origins[this.state.from].PlaceId + '/to/' + this.state.destinations[this.state.to].PlaceId)
                .then(res => {
                    console.log(res.data);
                    this.setState({ flightInfo: res.data });
                    this.setState({loading : false})
                }).catch(err => {
                    this.setState({loading: false})
                })
        }

    }


    render() {
        return (
            <div>
                <Container fluid>
                    {(this.state.to < 0 || this.state.from < 0) && <Alert variant="primary">
                        Choose a location to fly from and land at...
                </Alert>}

                    <Row>
                        <Col>
                            <form onSubmit={this.searchOrigins}>
                                <input value={this.state.searchO} onChange={this.changeOrigin} type="text" />
                                <input type="submit" value="Search" />
                            </form>
                        </Col>
                        <Col>
                        { this.state.loading === true ? (<Spinner animation="border" />) : (<div>  </div>)}
                        </Col>
                        <Col>
                            <form onSubmit={this.searchDestinations}>
                                <input value={this.state.searchD} onChange={this.changeDestination} type="text" />
                                <input type="submit" value="Search" />
                            </form>
                        </Col>
                    </Row>

                    <form>
                        <hr />
                        <Row>
                            <Col>
                                <select onChange={this.changeFrom}>
                                    <option disabled selected>Leaving From...</option>
                                    {this.state.origins.map((place, index) => {
                                        return (
                                            <option value={index}>{place.PlaceName}</option>
                                        )
                                    })}
                                </select>
                            </Col>


                            <Col>
                                <select onChange={this.changeTo}>
                                    <option disabled selected>Going to...</option>
                                    {this.state.destinations.map((place, index) => {
                                        return (
                                            <option value={index}>{place.PlaceName}</option>
                                        )
                                    })}
                                </select>
                            </Col>
                        </Row>
                    </form>

                    <hr />

                    <Jumbotron fluid style={{ backgroundColor: "#6c6c82" }}>
                        <Container>
                            <Row>
                                <Col>
                                    <h2><Badge>Airport:</Badge></h2>
                                </Col>
                                <Col>
                                    <h1>{(this.state.from >= 0) ? this.state.origins[this.state.from].PlaceName : ""}</h1>
                                </Col>
                                <Col>
                                    <BsChevronDoubleRight size={50} />
                                </Col>
                                <Col>
                                    <h1>{(this.state.to >= 0) ? this.state.destinations[this.state.to].PlaceName : ""}</h1>
                                </Col>
                            </Row>

                            <hr />

                            <Row>
                                <Col>
                                    <h1><Badge>Country:</Badge></h1>
                                </Col>
                                <Col>
                                    <h3>{(this.state.from >= 0) ? this.state.origins[this.state.from].CountryName : ""}</h3>
                                </Col>
                                <Col>
                                    <BsChevronDoubleRight size={25} />
                                </Col>
                                <Col>
                                    <h3>{(this.state.to >= 0) ? this.state.destinations[this.state.to].CountryName : ""}</h3>
                                </Col>
                            </Row>

                            <hr />

                            <Row>
                                <Col>
                                    <h1><Badge>State:</Badge></h1>
                                </Col>
                                <Col>
                                    <h3>{(this.state.from >= 0) ? this.state.origins[this.state.from].RegionId : ""}</h3>
                                </Col>
                                <Col>
                                    <BsChevronDoubleRight size={25} />
                                </Col>
                                <Col>
                                    <h3>{(this.state.to >= 0) ? this.state.destinations[this.state.to].RegionId : ""}</h3>
                                </Col>
                            </Row>
                            <Row>
                                <Button onClick={this.getFlights}>Find Flights</Button>
                            </Row>
                        </Container>
                    </Jumbotron>
                </Container>
                {this.state.loading === true ? (<Spinner animation="border" />) : (<div> </div>)}
                {this.state.flightInfo.length === 0 ?
                    (
                    <h2 style={{
                        color: "white",
                        textAlign: "center"
                    }}> No Flights Found </h2>
                    )
                    : (<FlightTable data={this.state.flightInfo}
                        origin={this.state.origins[this.state.from].PlaceName}
                        destnation={this.state.destinations[this.state.to].PlaceName} />)}
            </div>
        )
    }
}

export default FlightForm;
