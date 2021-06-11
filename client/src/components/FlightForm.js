import React, { Component } from 'react';
import Axios from 'axios';
import Button from "react-bootstrap/Button";
import { Container, Form } from "react-bootstrap";
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
                                <Form.Control onChange={this.changeFrom} value={this.state.from}    placeholder="From" />
                            </Container>
                            {/* <select onChange={this.changeFrom}>
                                <option disabled selected>Leaving From...</option>
                                {this.props.data.map((place, index) => {
                                    return (
                                        <option value={index}>{place.PlaceName}</option>
                                    )
                                })}
                            </select> */}
                        </Col>


                        <Col>
                            <Container>
                                <Form.Control placeholder="To" />
                            </Container>
                            {/* <select onChange={this.changeTo}>
                                <option disabled selected>Going to...</option>
                                {this.props.data.map((place, index) => {
                                    return (
                                        <option value={index}>{place.PlaceName}</option>
                                    )
                                })}
                            </select> */}
                        </Col>
                        <Col>
                            <Button onClick={this.submitHandler}>Subtmit</Button>
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
                                {/* <h1>{(this.state.from >= 0) ? this.props.data[this.state.from].PlaceName : ""}</h1> */}
                            </Col>
                            <Col>
                                <BsChevronDoubleRight size={50} />
                            </Col>
                            <Col>
                                {/* <h1>{(this.state.to >= 0) ? this.props.data[this.state.to].PlaceName : ""}</h1> */}
                            </Col>
                        </Row>

                        <hr />

                        <Row>
                            <Col>
                                <h1><Badge>Country:</Badge></h1>
                            </Col>
                            <Col>
                                {/* <h3>{(this.state.from >= 0) ? this.props.data[this.state.from].CountryName : ""}</h3> */}
                            </Col>
                            <Col>
                                <BsChevronDoubleRight size={25} />
                            </Col>
                            <Col>
                                {/* <h3>{(this.state.to >= 0) ? this.props.data[this.state.to].CountryName : ""}</h3> */}
                            </Col>
                        </Row>

                        <hr />

                        <Row>
                            <Col>
                                <h1><Badge>State:</Badge></h1>
                            </Col>
                            <Col>
                                {/* <h3>{(this.state.from >= 0) ? this.props.data[this.state.from].RegionId : ""}</h3> */}
                            </Col>
                            <Col>
                                <BsChevronDoubleRight size={25} />
                            </Col>
                            <Col>
                                {/* <h3>{(this.state.to >= 0) ? this.props.data[this.state.to].RegionId : ""}</h3> */}
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
