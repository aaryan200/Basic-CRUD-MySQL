import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();

const db = mysql.createConnection({
    host:"localhost",
    user: "user_1",
    password: "aaryan",
    database: "sql_crud_db"
});

// Allow json data to send from express, otherwise will not be sent
app.use(express.json());
// Allow an application to send api requests
app.use(cors());

app.get("/", (req, res) => {
    res.json("Hello, this is backend!");
})

app.get("/books/", (req, res) => {
    const q = "SELECT * FROM books";
    db.query(q, (err, data) => {
        if (err) return res.json(err.message);
        return res.json(data);
    })
})

app.post("/books/", (req, res) => {
    const q = "INSERT INTO books (`title`, `desc`, `price`, `cover`) VALUES (?)";
    const values = [req.body.title, req.body.desc, req.body.price, req.body.cover];

    db.query(q, [values], (err, data) => {
        if (err) return res.json(err);
        return res.json("Book created successfully");
    })
})

app.delete("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "DELETE FROM books WHERE id = ? ";
    db.query(q, [bookId], (err, data) => {
        if (err) return res.send(err);
        return res.json("Book deleted successfully");
    })
})

app.put("/books/:id", (req, res) => {
    const bookId = req.params.id;
    // book parameters should be in same order in both query as well as values
    const q = "UPDATE books SET `title` = ?, `desc` = ?, `price` = ?, `cover` = ? WHERE id = ?";

    const values = [req.body.title, req.body.desc, req.body.price, req.body.cover];

    db.query(q, [...values, bookId], (err, data) => {
        if (err) return res.send(err);
        return res.json("Book updated successfully");
    })
})

app.listen(8800, () => {
    console.log("BACKEND IS RUNNING!");
})