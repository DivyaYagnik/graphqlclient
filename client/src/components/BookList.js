import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { getBooksQuery } from '../queries/queries'
import BookDetails from './BookDetails';

function BookList() {
    const { loading, error, data } = useQuery(getBooksQuery);
    const [selected, setSelected] = useState(null);

    const getBooks = () => {
        if (loading) return <p>Loading....</p>
        if (error) return <p>Something went wrong</p>
        return data.books.map(book => {
            return (
                <li key={book.id} onClick={() => setSelected(book.id)}> {book.name}</li>
            ) 
        })
    }
    
    return (
        <div>
            <ul id="book-list">
                {getBooks()}
            </ul>
            <div id="book-details">
                {selected ? <BookDetails bookId = {selected}/> : <div>No book selected...</div>}
            </div>
        </div>
    )
}
  
export default BookList;