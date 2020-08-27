//import express package
const express=require('express');

//use of express package
const app=express();

//import body-parser package
const bodyParser=require('body-parser');

//import request package
const request=require('request');

//import https package
const https = require('https');

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/" ,function(req,res) {
  const fName=req.body.fName;
  const lName=req.body.lName;
  const email=req.body.email;
  console.log(fName);
  console.log(lName);
  console.log(email);


//mailchimp API data:Javascript Object
  const data = {
    members:[
      {
        email_address:email,
        status:"subscribed",
        merge_fields:{
          FNAME:fName,
          LNAME:lName,
        }
      }
    ]
  };

const jsonData=JSON.stringify(data);

//mailchimp API
 const url="https://us17.api.mailchimp.com/3.0/lists/264e981d9c";

//Auth
 const options={
   method:"POST",
   auth:"kavisha1:559e303e53c33e363001bc61215511cf-u17"
 }


const request =https.request(url,options,function(response) {

     if(response.statusCode===200){
       res.sendFile(__dirname + "/success.html");
     }
     else{
       res.sendFile(__dirname + "/failure.html");
     }

 response.on("data",function(data){
  console.log(JSON.parse(data));
});
});
request.write(jsonData);
request.end();
});


app.post("/failure",function(req,res){
  res.redirect("/");
});

//server listen on 3000 port
app.listen(3000,function(){
  console.log("server is running on port 3000");
});
