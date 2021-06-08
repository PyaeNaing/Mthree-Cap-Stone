import React, { Component } from 'react'; 
import FlightTable from '../components/FlightTable'

class HomePage extends Component{

    render() {

        return(
            <div> 
                <h1>Home Page</h1>
                <FlightTable/>
            </div>
        )
    }
}

export default HomePage; 
