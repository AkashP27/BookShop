import express from "express";
import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const db = mysql.createConnection({
 host: "localhost",
 user: "root",
 password: process.env.PASSWORD,
 database: "test",
});

app.use(express.json());

app.get("/", (req, res) => {
 res.json("Hello from serverrrrr");
});

app.get("/books", (req, res) => {
 const q = "SELECT * FROM books";
 db.query(q, (err, data) => {
  if (err) return res.json(err);
  return res.json(data);
 });
});

app.post("/books", (req, res) => {
 const q = "INSERT INTO books (`title`,`desc`,`cover`) VALUES (?)";
 const values = [req.body.title, req.body.desc, req.body.cover];

 db.query(q, [values], (err, data) => {
  if (err) return res.json(err);
  return res.json("Book created successfully");
 });
});

app.listen(8800, () => {
 console.log("Connected to server");
});
