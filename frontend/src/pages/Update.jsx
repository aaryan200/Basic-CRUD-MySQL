import axios from "axios";
import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom";

export default function Update() {
    const [book, setBook] = useState({
        title: "",
        desc: "",
        price: null,
        cover: "",
    })

    const navigate = useNavigate();
    const location = useLocation();

    const bookId = location.pathname.split("/")[2];

    function handleChange(e) {
        // Nice functionality
        setBook(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await axios.put("http://localhost:8800/books/" + bookId, book);
            // Navigate to home page
            navigate("/");
        }catch(err) {
            console.log(err);
        }
    }

    return (
        <div className="form">
            <h1>Update book</h1>
            <input type="text" placeholder="Title" onChange={handleChange} name="title"/>
            <input type="text" placeholder="Description" onChange={handleChange} name="desc"/>
            <input type="number" placeholder="Price" onChange={handleChange} name="price"/>
            <input type="text" placeholder="Cover" onChange={handleChange} name="cover"/>
            <button onClick={handleSubmit} className="formButton">Update</button>
        </div>
    )
}
