const express=require("express");
const app=express();
var mysql = require('mysql2');  
var con = mysql.createConnection({  
host: "localhost",  
user: "root",   
password:"meninblack11" ,
database:"Cofee_login"
});  
con.connect(/*(err)=>{
    if(err)throw err;
    con.query("CREATE TABLE users(ID int not null auto_increment,username varchar(255),password varchar(255),PRIMARY KEY(ID))",(err)=>{
if(err)throw err;
    });
}*/

); 
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname +"/views"));

app.get("/",(req,res)=>{
res.sendFile(__dirname+"/views/idp front end.html");
});
app.get("/regis",(req,res)=>{
    res.sendFile(__dirname+"/views/regis.html");
})
app.get("/login",(req,res)=>{
    res.sendFile(__dirname+"/views/login.html")
})
app.post("/login",(req,res)=>{
con.query("Select username from users where username='"+req.body.u+"' and password='"+req.body.p+"'",(err,result,fields)=>{
    if(result.length==0)
    {
        res.sendFile(__dirname+"/views/login2.html");   
    }
    else{
        res.sendFile(__dirname+"/views/menu.html");
    }
});

})
app.post("/regis",(req,res)=>{
    con.query("SELECT username from users WHERE username='"+req.body.u+"'",(err,result,fields)=>{
        if(result.length>0)
        {
            console.log(result);
            console.log("one");
            res.sendFile(__dirname+"/views/regis2.html");
        }
        else if(req.body.p!=req.body.pc)
        {
            console.log("two");
            res.sendFile(__dirname+"/views/regis3.html")
        }
        else{
    let q="INSERT INTO users(username,password) VALUES('"+req.body.u + "','"+req.body.p+"')"
    console.log("three");
    con.query(q,(err)=>{
        if(err)throw err
    
    })
    res.sendFile(__dirname+"/views/menu.html");
    }  
    });
    

});
app.listen(3000,function(){
    console.log("server started Port:3000");
});

