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
const { on } = require("events");
dotenv.config();
var sec = process.env.REACT_APP_TOKEN;


app.use(express.json());
app.use(cors());

const db = mysql.createPool({
    user: "root",
    host: "localhost",
    port: process.env.REACT_APP_DB_PORT,
    password: `${process.env.REACT_APP_DB_PASS}`,
    database: "Abyssos",
    timezone : "+00:00",
    dateStrings: true,
});

app.post('/api/register', (req,res) => {

    const username = req.body.username
    const password = bcrypt.hashSync(req.body.password,parseInt(process.env.REACT_APP_HASH))
    const mail = req.body.mail
    const role = req.body.role

    db.query("INSERT INTO Users (U_name, U_pass, U_mail, U_role) values (?,?,?,?)",
    [username, password, mail, role],
    (err, result) => {
        if(err){
            res.json({done: false})
        }
        else{
            res.json({done: true})
        }
    })
})


app.post('/api/deleteUser', (req,res) => {

    const username = req.body.username


    db.query("Delete FROM Users WHERE U_name = '" + username + "';",
    [username],
    (err, result) => {
        if(err){
            res.json({done: false})
            console.log(err)
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


//CabinInfo for user
app.post('/api/CabinInfo', (req,res) => {

    const id = req.body.id

    db.query("SELECT Users.U_name, companies.Com_name, companies.Com_phone, companies.Com_mail, Cabin.Cab_id, Cabin.Cab_name, CabinInfo.f15, CabinInfo.f30, CabinInfo.f50, CabinInfo.nemlendirici, CabinInfo.bronzlastirici, CabinInfo.su, CabinInfo.dezenfektan, CabinInfo.duskopugu, CabinInfo.kopekkrem, CabinInfo.kopeksampuan, CabinInfo.onoff, CabinInfo.sicaksu  FROM Users CROSS JOIN (companies, Cabin, CabinInfo) ON (Users.U_id=companies.U_id AND companies.Com_id=Cabin.Com_id AND Cabin.Cab_id=CabinInfo.Cab_id) where Users.U_id = ?",
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


//Cabin info for admin
app.post('/api/CabinAdminInfo', (req,res) => {

    const id = req.body.id

    db.query("SELECT Users.U_name, companies.Com_name, companies.Com_phone, companies.Com_mail, Cabin.Cab_id, Cabin.Cab_name, CabinInfo.f15, CabinInfo.f30, CabinInfo.f50, CabinInfo.nemlendirici, CabinInfo.bronzlastirici, CabinInfo.su, CabinInfo.dezenfektan, CabinInfo.duskopugu, CabinInfo.kopekkrem, CabinInfo.kopeksampuan, CabinInfo.onoff, CabinInfo.sicaksu  FROM Users CROSS JOIN (companies, Cabin, CabinInfo) ON (Users.U_id=companies.U_id AND companies.Com_id=Cabin.Com_id AND Cabin.Cab_id=CabinInfo.Cab_id)",
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
//Detailed Company Info
app.post('/api/CompanyInfo', (req,res) => {

    const id = req.body.id

    db.query("SELECT companies.Com_name,Com_address,Com_phone,companies.Com_mail, companies.Com_id, Users.U_name FROM Users INNER JOIN companies ON Users.U_id= companies.U_id Where Users.U_id = ?;",
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


//Company Info for admin

app.post('/api/CompanyAdminInfo', (req,res) => {


    db.query("SELECT companies.Com_name,Com_address,Com_phone,companies.Com_mail,companies.Com_id, Users.U_name FROM Users INNER JOIN companies ON Users.U_id= companies.U_id;",
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

//Get id for specific username
app.post('/api/GetId', (req,res) => {

    const Uname = req.body.username;
    db.query("SELECT U_id FROM Users Where U_name = '" + Uname + "';",
    async (err, result) => {
        if(err){
            res.json({done: false, message: "Hatalı Kullanıcı Adı"})
        }

        if (result.length > 0){
        
            res.json({done: true, result})
            
        }
        else{
            res.json({done: false, message: "Hatalı Kullanıcı Adı"})
        }
        
    })
    
})


//Register a user
app.post('/api/RegisterUser', (req,res) => {

    const comname = req.body.name;
    const address = req.body.address;
    const phone = req.body.phone;
    const id = req.body.id;
    const mail = req.body.mail;

    db.query("INSERT INTO companies (Com_name, Com_address, Com_phone,U_id,Com_mail) values (?,?,?,?,?);",
    [comname, address, phone, id, mail],
    async (err, result) => {
        if(err){
            res.send({err});
        }
        else{
            res.json({done: true})
        }
        
    })
    
})

/*SELECT Operations.Operation, Cabin.Cab_name, COUNT(*) FROM Users
CROSS JOIN companies ON companies.U_id = Users.U_id
CROSS JOIN Cabin ON Cabin.Com_id = companies.Com_id
CROSS JOIN Operations ON Operations.Cabin_id = Cabin.Cab_id
Where Users.U_id = 4 AND Cabin.Cab_id = 1
GROUP BY Operations.Operation */

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
                res.json({auth: true, token: token, id: result[0].U_id, uname: result[0].U_name, role: result[0].U_role})
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

/*
Select Cabin.Cab_id from Users CROSS JOIN companies ON Users.U_id = companies.U_id CROSS JOIN Cabin ON companies.Com_id = Cabin.Com_id Where Users.U_id = 4

*/

//To get information about that cabin usage
app.post('/api/getCabins', (req,res) => {

    const id = req.body.id
    const cabin = req.body.cabin

    db.query("SELECT Operations.Operation, COUNT(*) as count FROM Users CROSS JOIN companies ON companies.U_id = Users.U_id CROSS JOIN Cabin ON Cabin.Com_id = companies.Com_id CROSS JOIN Operations ON Operations.Cabin_id = Cabin.Cab_id Where Users.U_id = ? AND Cabin.Cab_id = ? GROUP BY Operations.Operation ",
    [id, cabin],
    async (err, result) => {
        if(err){
            res.json({done: false})
        }

        if (result.length > 0){
            res.json({done: true, result})
        }
        else{
            res.json({done: false, message: "Hatalı Kullanıcı Adı"})
        }
        
    })
    
})

//To get information about all cabins
app.post('/api/getAdminCabins', (req,res) => {

    const id = req.body.id
    const cabin = req.body.cabin

    db.query("SELECT Operations.Operation, COUNT(*) as count FROM Users CROSS JOIN companies ON companies.U_id = Users.U_id CROSS JOIN Cabin ON Cabin.Com_id = companies.Com_id CROSS JOIN Operations ON Operations.Cabin_id = Cabin.Cab_id Where Cabin.Cab_id = ? GROUP BY Operations.Operation ",
    [cabin],
    async (err, result) => {
        if(err){
            res.json({done: false})
        }

        if (result.length > 0){
            res.json({done: true, result})
        }
        else{
            res.json({done: false, message: "Hatalı Kullanıcı Adı"})
        }
        
    })
    
})


//To get cabin names and id that user owns
app.post('/api/GetNumbers', (req,res) => {

    const id = req.body.id

    db.query("Select Cabin.Cab_id, Cabin.Cab_name, Cabin.Cab_type from Users CROSS JOIN companies ON Users.U_id = companies.U_id CROSS JOIN Cabin ON companies.Com_id = Cabin.Com_id Where Users.U_id = ?",
    [id],
    async (err, result) => {
        if(err){
            res.json({done: false})
        }

        if (result.length > 0){
            res.json({done: true, result})
        }
        else{
            res.json({done: false, message: "Hatalı Kullanıcı Adı"})
        }
        
    })
    
})

//To get all the cabins for the admin
app.post('/api/GetAdminNumbers', (req,res) => {


    db.query("Select Cabin.Cab_id, Cabin.Cab_name, companies.Com_name, Cabin.Cab_type from Users CROSS JOIN companies ON Users.U_id = companies.U_id CROSS JOIN Cabin ON companies.Com_id = Cabin.Com_id",
    async (err, result) => {
        if(err){
            res.json({done: false})
        }

        if (result.length > 0){
            res.json({done: true, result})
        }
        else{
            res.json({done: false, message: "Hatalı Kullanıcı Adı"})
        }
        
    })
    
})

//To get information about that cabin information (name, address etc.)
app.post('/api/getCabinDefault', (req,res) => {

    const id = req.body.id

    db.query("Select Cabin.Cab_id, Cabin.Cab_name, Cabin.f30, Cabin.f50, Cabin.f50cocuk, Cabin.dus, Cabin.nemlendirici, Cabin.dezenfektan, Cabin.Cab_address, companies.Com_name, companies.Com_phone, companies.Com_address, companies.Com_phone, companies.Com_mail, companies.Com_id, Users.U_name from Users CROSS JOIN companies ON Users.U_id = companies.U_id CROSS JOIN Cabin ON companies.Com_id = Cabin.Com_id Where Users.U_id = ? ",
    [id],
    async (err, result) => {
        if(err){
            res.json({done: false})
        }

        if (result.length > 0){
            res.json({done: true, result})
        }
        else{
            res.json({done: false, message: "Hatalı Kullanıcı Adı"})
        }
        
    })
    
})

//To get information about all cabins information (name, address etc.)
app.post('/api/getAdminCabinDefault', (req,res) => {

    const id = req.body.id
    const cabin = req.body.cabin

    db.query("Select Cabin.Cab_id, Cabin.Cab_name, Cabin.Cab_address, Cabin.f30, Cabin.f50, Cabin.f50cocuk, Cabin.dus, Cabin.nemlendirici, Cabin.dezenfektan, companies.Com_name, companies.Com_phone, companies.Com_address, companies.Com_phone, companies.Com_mail, companies.Com_id, Users.U_name from Users CROSS JOIN companies ON Users.U_id = companies.U_id CROSS JOIN Cabin ON companies.Com_id = Cabin.Com_id",
    [cabin],
    async (err, result) => {
        if(err){
            res.json({done: false})
        }

        if (result.length > 0){
            res.json({done: true, result})
        }
        else{
            res.json({done: false, message: "Hatalı Kullanıcı Adı"})
        }
        
    })
    
})



//Get id for specific Companyname
app.post('/api/GetCompanyId', (req,res) => {

    const Uname = req.body.username;
    db.query("SELECT Com_id FROM companies Where Com_name = '" + Uname + "';",
    async (err, result) => {
        if(err){
            res.json({done: false, message: "Hatalı Kullanıcı Adı"})
        }

        if (result.length > 0){
        
            res.json({done: true, result})
            
        }
        else{
            res.json({done: false, message: "Hatalı Kullanıcı Adı"})
        }
        
    })
    
})


//Register a cabin
app.post('/api/RegisterCabin', (req,res) => {

    const name = req.body.name;
    const address = req.body.address;
    const id = req.body.id;


    db.query("INSERT INTO Cabin (Com_id, Cab_name, Cab_address) values (?,?,?);",
    [id, name, address],
    async (err, result) => {
        if(err){
            res.send({err});
        }
        else{
            res.json({done: true})
        }
        
    })
    
})


//Delete Company
app.post('/api/DeleteCompany', (req,res) => {

    const name = req.body.name;


    db.query("DELETE CabinInfo.*, Cabin.* ,companies.* FROM companies LEFT JOIN Cabin ON Cabin.Com_id = companies.Com_id LEFT JOIN CabinInfo ON CabinInfo.Cab_id = Cabin.Cab_id WHERE companies.Com_name = '" + name + "';",
    [name],
    async (err, result) => {
        if(err){
            res.json({done: false})
        }
        else{
            res.json({done: true})
        }
        
    })
    
})


//Delete Cabin
app.post('/api/DeleteCabin', (req,res) => {

    const name = req.body.name;


    db.query("DELETE CabinInfo.*, Cabin.* FROM Cabin LEFT JOIN CabinInfo ON Cabin.Cab_id = CabinInfo.Cab_id WHERE Cabin.Cab_name = '" + name + "';",
    [name],
    async (err, result) => {
        if(err){
            res.json({done: false})
        }
        else{
            res.json({done: true})
        }
        
    })
    
})


//To get Operations
app.post('/api/getOperations', (req,res) => {

    const id = req.body.id

    db.query("Select Cabin.Cab_name, Cabin.Cab_id, companies.Com_name, Operations.Date, Operations.Card_id, Operations.Operation, Operations.Price from Users CROSS JOIN companies ON Users.U_id = companies.U_id CROSS JOIN Cabin ON companies.Com_id = Cabin.Com_id CROSS JOIN Operations ON Cabin.Cab_id = Operations.Cabin_id Where Users.U_id = ? ",
    [id],
    async (err, result) => {
        if(err){
            res.json({done: false})
        }

        if (result.length > 0){
            res.json({done: true, result})
        }
        else{
            res.json({done: false, message: "Hatalı Kullanıcı Adı"})
        }
        
    })
    
})

//To get operations Admin
app.post('/api/getAdminOperations', (req,res) => {

    db.query("Select Cabin.Cab_name, Cabin.Cab_id, companies.Com_name, Operations.Date, Operations.Card_id, Operations.Operation, Operations.Price from Users CROSS JOIN companies ON Users.U_id = companies.U_id CROSS JOIN Cabin ON companies.Com_id = Cabin.Com_id CROSS JOIN Operations ON Cabin.Cab_id = Operations.Cabin_id",
    async (err, result) => {
        if(err){
            res.json({done: false})
        }

        if (result.length > 0){
            res.json({done: true, result})
        }
        else{
            res.json({done: false, message: "Hatalı Kullanıcı Adı"})
        }
        
    })
    
})


//To get Statistics 

app.post('/api/getForDoughnut', (req,res) => {
    const id = req.body.id;

    db.query("SELECT Operations.Operation, COUNT(*) as count FROM Users CROSS JOIN companies ON companies.U_id = Users.U_id CROSS JOIN Cabin ON Cabin.Com_id = companies.Com_id CROSS JOIN Operations ON Operations.Cabin_id = Cabin.Cab_id Where Users.U_id = ? GROUP BY Operations.Operation",
    [id],
    async (err, result) => {
        if(err){
            res.json({done: false})
        }

        if (result.length > 0){
            res.json({done: true, result})
        }
        else{
            res.json({done: false, message: "Hatalı Kullanıcı Adı"})
        }
        
    })
    
})


app.post('/api/getForDoughnutAdmin', (req,res) => {

    db.query("SELECT Operations.Operation, COUNT(*) as count FROM Users CROSS JOIN companies ON companies.U_id = Users.U_id CROSS JOIN Cabin ON Cabin.Com_id = companies.Com_id CROSS JOIN Operations ON Operations.Cabin_id = Cabin.Cab_id GROUP BY Operations.Operation",
    async (err, result) => {
        if(err){
            res.json({done: false})
        }

        if (result.length > 0){
            res.json({done: true, result})
        }
        else{
            res.json({done: false, message: "Hatalı Kullanıcı Adı"})
        }
        
    })
    
})
//To get Statistics 

app.post('/api/getForBar', (req,res) => {
    const id = req.body.id;
    const date = req.body.date

    db.query("SELECT DATE(Operations.Date) as OpDate, COUNT(*) as count FROM Users CROSS JOIN companies ON companies.U_id = Users.U_id CROSS JOIN Cabin ON Cabin.Com_id = companies.Com_id CROSS JOIN Operations ON Operations.Cabin_id = Cabin.Cab_id Where Users.U_id = ? AND DATE(Operations.Date) >= '" + date +"' GROUP BY DATE(Operations.Date)",
    [id],
    async (err, result) => {
        if(err){
            res.json({done: false})
        }

        if (result.length > 0){
            res.json({done: true, result})
        }
        else{
            res.json({done: false, message: "Hatalı Kullanıcı Adı"})
        }
        
    })
    
})

app.post('/api/getForBarAdmin', (req,res) => {
    const date = req.body.date

    db.query("SELECT DATE(Operations.Date) as OpDate, COUNT(*) as count FROM Users CROSS JOIN companies ON companies.U_id = Users.U_id CROSS JOIN Cabin ON Cabin.Com_id = companies.Com_id CROSS JOIN Operations ON Operations.Cabin_id = Cabin.Cab_id Where DATE(Operations.Date) >= '" + date +"' GROUP BY DATE(Operations.Date)",
    async (err, result) => {
        if(err){
            res.json({done: false})
        }

        if (result.length > 0){
            res.json({done: true, result})
        }
        else{
            res.json({done: false, message: "Hatalı Kullanıcı Adı"})
        }
        
    })
    
})


//To get Users

app.post('/api/getUsers', (req,res) => {

    const id = req.body.id;

    db.query("SELECT * from Users Where U_id = ?",
    [id],
    async (err, result) => {
        if(err){
            res.json({done: false})
        }

        if (result.length > 0){
            res.json({done: true, result})
        }
        else{
            res.json({done: false, message: "Hatalı Kullanıcı Adı"})
        }
        
    })
    
})

//To get All Users 

app.post('/api/getAdminUsers', (req,res) => {


    db.query("SELECT * from Users",
    async (err, result) => {
        if(err){
            res.json({done: false})
        }

        if (result.length > 0){
            res.json({done: true, result})
        }
        else{
            res.json({done: false, message: "Hatalı Kullanıcı Adı"})
        }
        
    })
    
})

//Update Company

app.post('/api/UpdateCompany', (req,res) => {

    const oldname = req.body.oldname;
    const name = req.body.name;
    const address = req.body.address;
    const phone = req.body.phone;
    const mail = req.body.mail;

    db.query("Update companies SET Com_name = ?, Com_address = ?, Com_phone = ?, Com_mail = ? Where Com_name = ?",
    [name, address, phone, mail, oldname],
    async (err, result) => {
        
        if(err){
            res.json({done: false})
        }

        if (result.affectedRows > 0){
            res.json({done: true})
        }
        else{
            res.json({done: false, message: "Hatalı Kullanıcı Adı"})
        }
        
    })
    
})

//Update Cabin

app.post('/api/UpdateCab', (req,res) => {

    const oldname = req.body.oldname;
    const name = req.body.name;
    const address = req.body.address;
    const f30 = req.body.f30;
    const f50 = req.body.f50;
    const f50cocuk = req.body.f50cocuk;
    const dus = req.body.dus;
    const nemlendirici = req.body.nemlendirici;
    const dezenfektan = req.body.dezenfektan;

    db.query("Update Cabin SET Cab_name = ?, Cab_address = ?, f30=?, f50=?, f50cocuk =?, dus=?, nemlendirici=?, dezenfektan=? Where Cab_name = ?",
    [name, address, f30, f50, f50cocuk, dus, nemlendirici, dezenfektan, oldname],
    async (err, result) => {
        
        if(err){
            res.json({done: false})
        }

        if (result.affectedRows > 0){
            res.json({done: true})
        }
        else{
            res.json({done: false, message: "Hatalı Kullanıcı Adı"})
        }
        
    })
    
})

app.post('/api/UpdateUser', (req,res) => {

    const oldname = req.body.oldname;
    const name = req.body.name;
    const mail = req.body.mail;

    db.query("Update Users SET U_name = ?, U_mail = ? Where U_name = ?",
    [name, mail, oldname],
    async (err, result) => {
        
        if(err){
            res.json({done: false})
        }

        if (result.affectedRows > 0){
            res.json({done: true})
        }
        else{
            res.json({done: false, message: "Hatalı Kullanıcı Adı"})
        }
        
    })
    
})

//Mails
app.post('/api/mail/emergencyButton' , (req,res) => {
    var util = require('util')
    var exec = require('child_process').exec;
    const id = req.body.id
    const mail = req.body.mail
    
    exec(`echo "${id} Seri Numaralı ABYSSOS Mod\'nuzun Acil Durum Butonu\'na basıldı.\n Sorun giderilene kadar makineniz kullanım dışı bırakılmıştır.Acilen müdahale etmeniz gerekmektedir. \n The Emergency Button of your ABYSSOS Mod with Serial Number ${id} has been pressed.\n Your machine has been taken out of use until the problem is resolved. You need to intervene urgently." | mail -s "Acil Durum / Emergency" -a "From: noreply@poemech.com.tr" ${mail}`, function (error, stdout, stderr) {
        if(error || stderr){
            res.json({done: false})
        }
        else{
            console.log(error)
            console.log(stderr)
            console.log(stdout)
            res.json({done: true})
        }
    });
})

app.post('/api/mail/WrongTank' , (req,res) => {
    var util = require('util')
    var exec = require('child_process').exec;
    const id = req.body.id
    const mail = req.body.mail
    const tank = req.body.tank
    
    exec(`echo "${id} Seri Numaralı ABYSSOS Pro\'nuzun ${tank} tank dolumu hatalı gerçekleşmiştir.\n Sorun giderilene kadar bu tank kullanım dışı bırakılmıştır. Müdahale etmeniz gerekmektedir. \n The ${tank} tank of your ABYSSOS Mod with Serial Number ${id} has been filled incorrectly.\n This tank has been taken out of use until the problem is fixed. You need to intervene." | mail -s "Acil Durum / Emergency" -a "From: noreply@poemech.com.tr" ${mail}`, function (error, stdout, stderr) {
        if(error || stderr){
            res.json({done: false})
        }
        else{
            console.log(error)
            console.log(stderr)
            console.log(stdout)
            res.json({done: true})
        }
    });
})

//FOR RPI
app.post('/api/UpdateInformation', (req,res) => {

    const id = req.body.id;
    const f15 = req.body.f15;
    const f30 = req.body.f30;
    const f50 = req.body.f50;
    const su = req.body.su;
    const nemlendirici = req.body.nemlendirici;
    const bronzlastirici = req.body.bronzlastirici;
    const dezenfektan = req.body.dezenfektan;
    const duskopugu = req.body.duskopugu;
    const kopekkrem = req.body.kopekkrem;
    const kopeksampuan = req.body.kopeksampuan;
    const onoff = req.body.onoff;

    db.query("Update CabinInfo SET f15 = ?, f30 = ?, f50=?, nemlendirici=?, bronzlastirici =?, su=?, dezenfektan=?, duskopugu=?, kopekkrem=?, kopeksampuan=?, onoff=? Where Cab_id = ?",
    [f15, f30,f50, nemlendirici, bronzlastirici, su, dezenfektan, duskopugu, kopekkrem, kopeksampuan, onoff, id],
    async (err, result) => {
        
        if(err){
            res.json({done: false})
        }

        if (result.affectedRows > 0){
            res.json({done: true})
        }
        else{
            res.json({done: false, message: "Hatalı Kullanıcı Adı"})
        }
        
    })
    
})

app.post('/api/AddOperation', (req,res) => {

    const id = req.body.id;
    const Card_id = req.body.Card_id;
    const Date = req.body.Date;
    const Operation = req.body.Operation;

    db.query("Insert into Operations (Cabin_id, Card_id, Date, Operation) values (?, ?, ?, ?)",
    [id, Card_id, Date, Operation],
    async (err, result) => {
        
        if(err){
            console.log("ERROR ALDIM KARDEŞ")
            console.log(err)
            res.json({done: false})
        }
        else{
            console.log("BAŞARILI")
            res.json({done: false, message: "Operasyon eklenemedi"})
        }
        
    })
    
})

var options = {
    key: fs.readFileSync(`${process.env.REACT_APP_HTTPS_KEY}`),
    cert: fs.readFileSync(`${process.env.REACT_APP_HTTPS_CERT}`)
  };

http.createServer(app).listen(process.env.REACT_APP_HTTP_PORT)
https.createServer(options, app).listen(process.env.REACT_APP_HTTPS_PORT)

