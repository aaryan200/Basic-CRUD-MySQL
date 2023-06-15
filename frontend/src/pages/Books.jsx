import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import book_placeholder from "../assets/book_placeholder.png";

export default function Books() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchAllBooks = async () => {
            try {
                const res = await axios.get("http://localhost:8800/books/");
                setBooks(res.data);
                console.log(books);
            } catch (err) {
                console.log(err);
            }
        }
        fetchAllBooks();
    }, [])

    async function handleDelete(id) {
        try {
            await axios.delete(`http://localhost:8800/books/${id}/`);
            window.location.reload();
        }catch(err) {
            console.log(err);
        }
    }

    return (
        <div>
            <h1>Book Shop</h1>
            <div className="books">
                {books.map(book => (
                    <div className="book" key={book.id}>
                        {/* {book.cover && (
                            <img src={book.cover} />
                        )} */}
                        <img src={book_placeholder} alt="cover" />
                        <h2>{book.title}</h2>
                        <p>{book.desc}</p>
                        <span>{book.price}</span>
                        <button className="delete" onClick={() => handleDelete(book.id)}>Delete</button>
                        <button className="update">
                            <Link to={`/update/${book.id}`}>Update</Link>
                        </button>
                    </div>
                ))}
            </div>
            <button className="addBtn">
                <Link to="/add">Add new book</Link>
            </button>
        </div>
    )
}
