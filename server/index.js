const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
var https = require('https');
var http = require('http');
const fs = require(`fs`);
const app = express();
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();
var sec = process.env.REACT_APP_TOKEN;


app.use(express.json());
app.use(cors());

const db = mysql.createPool({
    user: "root",
    host: "localhost",
    port: process.env.REACT_APP_DB_PORT,
    password: `${process.env.REACT_APP_DB_PASS}`,
    database: "Abyssos"
});

app.post('/api/register', (req,res) => {

    const username = req.body.username
    const password = bcrypt.hashSync(req.body.password,10)
    const mail = req.body.mail

    db.query("INSERT INTO Users (U_name, U_pass, U_mail) values (?,?,?)",
    [username, password, mail],
    (err, result) => {
        if(err){
            res.json({done: false})
        }
        else{
            res.json({done: true})
        }
    })
})

const verifyJWToken = (req,res,next) =>{
    const token = req.headers["x-access-token"];

    if(!token){
        res.json({auth: false});
    }
    else{
        jwt.verify(token, sec, (err,decoded) => {
            if(err){
                res.json({auth:false})
            }
            else{
                req.userId = decoded.id;
                next();
            }
        })
    }
}


app.get('/api/isAuth', verifyJWToken,(req,res) => {
    res.json({auth: true, id: req.userId})
})

app.post('/api/CabinInfo', (req,res) => {

    const id = req.body.id

    db.query("SELECT Users.U_name, companies.Com_name, Cabin.Cab_name, CabinInfo.f15, CabinInfo.f30, CabinInfo.f50, CabinInfo.nemlendirici, CabinInfo.bronzlastirici, CabinInfo.su, CabinInfo.dezenfektan, CabinInfo.duskopugu, CabinInfo.kopekkrem, CabinInfo.kopeksampuan  FROM Users CROSS JOIN (companies, Cabin, CabinInfo) ON (Users.U_id=companies.U_id AND companies.Com_id=Cabin.Com_id AND Cabin.Cab_id=CabinInfo.Cab_id) where Users.U_id = ?",
    [id],
    async (err, result) => {
        if(err){
            res.send({err});
        }

        if (result.length > 0){
        
            res.json({done: true, result})
            
        }
        else{
            res.json({done: false, message: "Hatalı Kullanıcı Adı"})
        }
        
    })
    
})
/*
SELECT companies.Com_name,Com_address,Com_phone,Users.U_mail
FROM Users
INNER JOIN companies ON Users.U_id= companies.U_id;
*/

app.post('/api/CompanyInfo', (req,res) => {

    const id = req.body.id

    db.query("SELECT companies.Com_name,Com_address,Com_phone,Users.U_mail FROM Users INNER JOIN companies ON Users.U_id= companies.U_id Where Users.U_id = ?;",
    [id],
    async (err, result) => {
        if(err){
            res.send({err});
        }

        if (result.length > 0){
        
            res.json({done: true, f15: result[0].f15, f30: result[0].f30, f50: result[0].f50, nemlendirici: result[0].nemlendirici, bronzlastirici: result[0].bronzlastirici,
            su: result[0].su, dezenfektan: result[0].dezenfektan, duskopugu: result[0].duskopugu, kopekkrem: result[0].kopekkrem, kopeksampuan: result[0].kopeksampuan})
            
        }
        else{
            res.json({done: false, message: "Hatalı Kullanıcı Adı"})
        }
        
    })
    
})

app.post('/api/login', (req,res) => {

    const username = req.body.username
    const password = req.body.password

    db.query("SELECT * from Users where U_name = ?",
    [username],
    async (err, result) => {
        if(err){
            res.send({err});
        }

        if (result.length > 0){
            if(await bcrypt.compare(password,result[0].U_pass)){
                
                const id = result[0].U_id;
                const token = jwt.sign({id}, sec, {expiresIn: "2 days",});
                res.json({auth: true, token: token, id: result[0].U_id, uname: result[0].U_name})
            }
            else{
                res.json({auth: false, message: "Hatalı Şifre"})
            }
        }
        else{
            res.json({auth: false, message: "Hatalı Kullanıcı Adı"})
        }
        
    })
    
})

var options = {
    key: fs.readFileSync(`${process.env.REACT_APP_HTTPS_KEY}`),
    cert: fs.readFileSync(`${process.env.REACT_APP_HTTPS_CERT}`)
  };

http.createServer(app).listen(process.env.REACT_APP_HTTP_PORT)
https.createServer(options, app).listen(process.env.REACT_APP_HTTPS_PORT)
