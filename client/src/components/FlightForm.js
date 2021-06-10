import React, { Component } from 'react';

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Jumbotron from 'react-bootstrap/Jumbotron'
import Alert from 'react-bootstrap/Alert';

import { BsChevronDoubleRight } from "react-icons/bs";


class FlightForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            from: -1,
            to: -1,

        }
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
                            <select onChange={this.changeFrom}>
                                <option disabled selected>Leaving From...</option>
                                {this.props.data.map((place, index) => {
                                    return (
                                        <option value={index}>{place.PlaceName}</option>
                                    )
                                })}
                            </select>
                        </Col>


                        <Col>
                            <select onChange={this.changeTo}>
                                <option disabled selected>Going to...</option>
                                {this.props.data.map((place, index) => {
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
                                <h1>Airport:</h1>
                            </Col>
                            <Col>
                                <h1>{(this.state.from >= 0) ? this.props.data[this.state.from].PlaceName : ""}</h1>
                            </Col>
                            <Col>
                                <BsChevronDoubleRight size={50} />
                            </Col>
                            <Col>
                                <h1>{(this.state.to >= 0) ? this.props.data[this.state.to].PlaceName : ""}</h1>
                            </Col>
                        </Row>

                        <hr />

                        <Row>
                            <Col>
                                <h1>Country:</h1>
                            </Col>
                            <Col>
                                <h3>{(this.state.from >= 0) ? this.props.data[this.state.from].CountryName : ""}</h3>
                            </Col>
                            <Col>
                                <BsChevronDoubleRight size={25} />
                            </Col>
                            <Col>
                                <h3>{(this.state.to >= 0) ? this.props.data[this.state.to].CountryName : ""}</h3>
                            </Col>
                        </Row>

                        

                        <Row>
                            <Col>
                                <h1>State:</h1>
                            </Col>
                            <Col>
                                <h3>{(this.state.from >= 0) ? this.props.data[this.state.from].RegionId : ""}</h3>
                            </Col>
                            <Col>
                                <BsChevronDoubleRight size={25} />
                            </Col>
                            <Col>
                                <h3>{(this.state.to >= 0) ? this.props.data[this.state.to].RegionId : ""}</h3>
                            </Col>
                        </Row>
                        <Row>
                            <Button>Find best Month to Travel</Button>
                        </Row>
                    </Container>
                </Jumbotron>

            </Container>
        )
    }
}

export default FlightForm;
