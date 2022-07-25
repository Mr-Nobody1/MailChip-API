const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));



app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
})


app.post("/", function(req, res){
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const Email = req.body.Email;

    const data = {
        members: [
            {
                email_address: Email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }

    const jsonData = JSON.stringify(data);

    const url = "https://us10.api.mailchimp.com/3.0/lists/3ca32cbd8c"

    const options = {
        method: "post",
        auth: "ammad1ali:b475896a5c50fa8db263602984032f0e-us10"

    }
    const request = https.request(url, options , function(response){

        if (response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        }else(
            res.sendFile(__dirname + "/failure.html")
        )



        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
        
    })

    // request.write(jsonData);
    request.end();


});

app.post("/failure", function(req, res){
    res.redirect("/");
})






app.listen(3000, function(){
    console.log("server is running on port 3000");
})



//Data


// API key
// b475896a5c50fa8db263602984032f0e-us10

// list Id
// 3ca32cbd8c