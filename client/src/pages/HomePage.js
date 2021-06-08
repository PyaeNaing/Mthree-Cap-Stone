import React, { Component } from 'react'; 
import FlightTable from '../components/FlightTable'
import FlightForm from '../components/FlightForm';

class HomePage extends Component{

    render() {

        return(
            <div className="text-center"> 
                <h1>Flight Analysis</h1>

                {/* Drop Down Selects to fetch compiled data */}
                <FlightForm/>
                <FlightTable/>
            </div>
        )
    }
}

export default HomePage; 
