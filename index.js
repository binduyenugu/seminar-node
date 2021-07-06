import express from 'express';
import mysql from 'mysql';
import cors from 'cors';


const app = express();
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'crud'
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


//post
app.post("/api/register/add", (req, res) => {
    const name = req.body.name;
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const insertQuery = "insert into register(name,username,password,email)values(?,?,?,?)";
    db.query(insertQuery, [name, username, password, email], (err, result) => {
        if(err){
            res.send(err);
        }else{
            res.send(result);
        }
    })
})

//get all records
app.get("/api/register", (req, res) => {
    const selectQuery = "select * from register";
    db.query(selectQuery, (err, result) => {
        res.send(result);
    })
})

//get record by id
app.get("/api/register/:id", (req, res) => {
    const id = req.params.id;
    const selectSingle = "select * from register where id=?";
    db.query(selectSingle, [id], (err, result) => {
        res.send(result);
    })
})

//update 
app.put("/api/register/edit/:id", (req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const updateQuery = "update register set name=? , username=? , password=?, email=? where id=?";
    console.log(updateQuery);
    db.query(updateQuery, [name, username, password, email, id], (err, result) => {
        res.send(result);
    })
})

//delete
app.delete("/api/register/delete/:id", (req, res) => {
    const id = req.params.id;
    const deleteQuerey = "delete from register where id=?";
    db.query(deleteQuerey, [id], (err, result) => {
        if (err) {
            res.send("Some problem in your code")
        }
        else if (result) {
            res.send(result);
        }
    })
})

app.listen(3001, () => {
    console.log("Server is running on port 3001");
})
