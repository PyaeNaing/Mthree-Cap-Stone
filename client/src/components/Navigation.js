import {Navbar, NavDropdown, Nav, Button, Form, FormControl} from 'react-bootstrap'
import logo from '../logo.svg'


import 'react-pro-sidebar/dist/css/styles.css';

const Navigation = () => {

    return (
        <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="#home">
                        <img
                            alt=""
                            src={logo}
                            width="50"
                            height="50"
                            className="d-inline-block align-top"
                        />{' '}
                        </Navbar.Brand>
                        <Navbar.Brand href="#">Flight Analysis </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
                <Nav
                    className="mr-auto my-2 my-lg-0"
                    style={{ maxHeight: '100px' }}
                    navbarScroll
                >
                    <Nav.Link href="#action1">Home</Nav.Link>
                    <Nav.Link href="#action2">Current Flight Schdule</Nav.Link>
                    <NavDropdown title="Link" id="navbarScrollingDropdown">
                        <NavDropdown.Item href="#action3">Cheap flights</NavDropdown.Item>
                        <NavDropdown.Item href="#action4">Best time to travel</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action5">About</NavDropdown.Item>
                    </NavDropdown>
                    
                </Nav>

                <Form className="d-flex" style={{marginLeft: "55%"}} >
                    <FormControl
                        type="search"
                        placeholder="Search"
                        className="mr-2"
                        aria-label="Search"
                    />
                    <Button variant="outline-success">Search</Button>
                </Form>
            </Navbar.Collapse>
                </Navbar>
    )
}

export default Navigation;
