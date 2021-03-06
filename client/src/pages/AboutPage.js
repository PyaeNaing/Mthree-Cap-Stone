import React, { Component } from 'react';

class AboutPage extends Component {

    render() {
        return (
            <div className="container">
                <div className="text-center" style={{ backgroundColor: "#cccccc", marginTop: "10vh"}}>
                    <h1>About Page</h1>

                    <p>
                        Our application provides the user with an interface to find and track cost-effective flights to and from any two locations.
                </p>

                    <p>
                        We took advantage of a useful API for our data named <i>SkyScanner Flight Search API</i>.
                </p>

                    <p>
                        This API provides us with information about all different flights from accross the globe.
                </p>

                    <p>
                        This allowed us to create an easy-to-use interface to show you flights and their dates to make your next vacation or business flight easier to plan!
                </p>
                </div>
                
                <div className="text-center" style={{ backgroundColor: "#cccccc", marginTop: "10vh"}}>
                    <h1>Contributors</h1>
                    <ul>
                        <li>Pyae Naing</li>
                        <li>Samuel Thomas</li>
                        <li>Faisal AlGhamdi</li>
                        <li>Sam Sagawa</li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default AboutPage;