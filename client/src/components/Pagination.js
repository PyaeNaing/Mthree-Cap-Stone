import React from 'react'

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
    const pageNumber = [];

    for (let i = 1; i < Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumber.push(i);
    }

    return (
        <form>
            <select onChange={(e) => {paginate(e.target.value)}}>
                <option disabled selected>Select Page</option>
                {pageNumber.map((page, index) => {
                    return (
                        <option value={index + 1}>{page}</option>
                    )
                })}
            </select>
        </form>

        // <nav>
        //     <ul className='pagination'>
        //         {pageNumber.map(number => (
        //             <li key={number} className='page-item'>
        //                 <button onClick={() =>{
        //                     paginate(number);

        //                 }}  className='page-link'>
        //                     {number}
        //                 </button>
        //             </li>
        //         ))}
        //     </ul>
        // </nav>
    )
}

export default Pagination;