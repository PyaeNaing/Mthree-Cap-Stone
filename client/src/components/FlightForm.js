import React, { Component } from 'react';

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Jumbotron from 'react-bootstrap/Jumbotron'

import { BsChevronDoubleRight } from "react-icons/bs";


class FlightForm extends Component {

    constructor(props) {
        super(props); 
        this.state = {
            from: '_____',
            to: '_____', 

        }
    }

    changeFrom = event => {
        this.setState({from: event.target.value});
    }
    
    changeTo = event => {
        this.setState({to: event.target.value});
    }


    render() {
        return (
            <Container fluid>
                <form>
                    <Row>
                        <Col>
                            <select  onChange={this.changeFrom}>
                                <option disabled selected>Leaving From...</option>
                                <option value="LAX">LAX</option>
                                <option value="D2">Destination from 2</option>
                                <option value="D3">Destination from 3</option>
                            </select>
                        </Col>
                        
                        
                        <Col>
                            <select onChange={this.changeTo}>
                                <option disabled selected>Going to...</option>
                                <option value="JFK">JFK</option>
                                <option value="D2">Destionation to 2</option>
                                <option value="D3">Destionation to 3</option>
                            </select>
                        </Col>
                    </Row>
                </form>

                <hr />

                <Jumbotron fluid style={{backgroundColor: "#6c6c82", height: "25vh"}}>
                    <Container>
                        <Row>
                            <Col>
                                <h1>{this.state.from}</h1>
                            </Col>
                            <Col>
                                <BsChevronDoubleRight size={50}/>
                            </Col>
                            <Col>
                                <h1>{this.state.to}</h1>
                            </Col>
                        </Row>
                        
                        <Row>
                            <Col>
                            </Col>
                        </Row>
                    </Container>
                </Jumbotron>

            </Container>
        )
    }
}

export default FlightForm;
