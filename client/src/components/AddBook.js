import { useQuery, useMutation } from '@apollo/client';
import { useState } from 'react';
import { getAuthorsQuery, addBookMutation } from '../queries/queries';


function AddBook() {
    const {error,loading,data} = useQuery(getAuthorsQuery);
    const [addBook] = useMutation(addBookMutation);
    const [name, setName] = useState('');
    const [genre, setGenre] = useState('');
    const [authorId, setAuthorId] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(name, genre, authorId)
        addBook(
            {variables: {
                name,
                genre,
                authorId
            }}
        );
        window.location.reload();
    }

    const getAuthors = () => {
        if (loading) return <option>Loading...</option>
        if (error) return <option>Something wrong happened</option>
        return data.authors.map(author => {
            return (
                <option key={author.id} value={author.id}>{author.name}</option>
            )
        })
    }

    return (
        <form id="add-book" onSubmit={handleSubmit}>

            <div className='field'>
                <label>Book name:</label>
                <input type='text' value={name} onChange={(e)=>{setName(e.target.value)}}/>
            </div>

            <div className='field'>
                <label>Genre:</label>
                <input type='text' value={genre} onChange={(e)=>{setGenre(e.target.value)}}/>
            </div>

            <div className='field'>
                <label>Author</label>
                <select value={authorId} onChange={(e)=>{setAuthorId(e.target.value)}}>
                    <option>Select an Author...</option>
                    {getAuthors()}
                </select>
            </div>

            <button>+</button>

        </form>
    )
}
  
export default AddBook;