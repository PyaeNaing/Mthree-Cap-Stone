import React, { useState, useEffect } from 'react'
import {Container, DropdownButton, Dropdown} from 'react-bootstrap';

const SelectSearch = () => {
    const [title, setTitle] = useState('Maximun Price');

    return (
            <DropdownButton id="dropdown-basic-button" title={title}>
                <Dropdown.Item onClick={ () => {setTitle('Maximun Price')}} eventKey={1}>Maximun Price</Dropdown.Item>
                <Dropdown.Item onClick={ () => {setTitle('Search by Country')}} eventKey={2}>Search by Country</Dropdown.Item>
                <Dropdown.Item onClick={ () => {setTitle('Search by Date')}} eventKey={3}>Search by Date</Dropdown.Item>
            </DropdownButton>
    )
}

export default SelectSearch;

