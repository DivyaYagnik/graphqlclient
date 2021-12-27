// import { useQuery } from '@apollo/client';
// import { useState } from 'react';
// import { getBookQuery } from '../queries/queries';

// const BookDetails = ({bookId}) => {
//     console.log(bookId);
//     const { error, loading, data } = useQuery(getBookQuery, {variables: {id: bookId}});
//     let display;
//     if (loading) {
//         display = <div>Loading...</div>
//     }
//     if (error) {
//         display = <div>Error</div>
//     }
//     if(data) {
//         console.log("Data: ", data);
//         const {book} = data;
//         display = (
//             <div>
//                 <h2>{book.name}</h2>
//                 <p>{book.genre}</p>
//                 <p>{book.author.name}</p>
//                 <p>All Books by Author</p>
//                 <ul className='other-books'>
//                     {book.author.books.map((book) => {
//                         return <li key = {book.id}>{book.name}</li>
//                     })}
//                 </ul>
//             </div>
//         )
//     }

//     return (
//         <div id='book-details'>
//             {display}
//         </div>
//     );
// }
  
// export default BookDetails

import React from 'react';
import { useQuery } from '@apollo/client';
import { getBookQuery } from '../queries/queries';

const BookDetails = ({ bookId }) => {
	const { loading, data } = useQuery(getBookQuery, {
		variables: { id: bookId }
	});
	let display;
	if (loading) {
		display = <div>loading</div>;
	} else {
        const { book } = data;
		display = (
			<div>
				<h2>{book.name}</h2>
				<p>{book.genre}</p>
				<p>{book.author.name}</p>
				<p>All books by this author:</p>
				<ul className="other-books">
					{book.author.books.map((item) => {
						return <li key={item.id}>{item.name}</li>;
					})}
				</ul>
			</div>
		);
	}

	return <div id="book-details">{display}</div>;
};

export default BookDetails;