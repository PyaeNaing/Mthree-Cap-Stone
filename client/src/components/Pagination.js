import React from 'react'
// import FlightItem from './FlightItem';

const Pagination = ({ postsPerPage, totalPosts, paginate}) => {
    const pageNumber = [];
    
    for(let i = 1; i < Math.ceil(totalPosts / postsPerPage); i++)
    {
        pageNumber.push(i);
    }

    return (
        <nav>
            <ul className='pagination'>
                {pageNumber.map(number => (
                    <li key={number} className='page-item'>
                        <button onClick={() =>{
                            paginate(number);
                        }} href="" className='page-link'>
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
            
        </nav>
    )
}

export default Pagination;