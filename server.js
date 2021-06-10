//建立Express伺服器
var express = require('express');

//使用request模塊向http請求
var request = require('request');
//fs模塊用於對系統文件及目錄進行讀寫操作
var fs = require('fs');
//使用Express伺服器
var app = express();
var cors = require('cors');
const path = require('path');

var request = require('request');

// var https = require('https');
var http = require('http');
const DomainName =  "localhost";
const SSLPORT =  "3000";

// const credentials = { key: privateKey, cert: certificate };

// const httpsServer = https.createServer(credentials, app);
const httpServer = http.createServer(app);


// httpsServer.listen(SSLPORT, function() {
//     console.log('HTTPS Server is running on: https://%s:%s', DomainName, SSLPORT);
// });

httpServer.listen(SSLPORT, function () {
    console.log('HTTPS Server is running on: http://%s:%s', DomainName, SSLPORT);
}); 

// const get_ip = require('ipware')().get_ip; //取得header ＩＰ 套件


// app.use(bodyParser.json())
app.use(cors())
// app.use(bodyParser.urlencoded({
//     extended: false
// }))
// app.use(cookieParser())
//static中介軟體函數可使用(css,javascript,影像)
app.use(express.static('build'));
app.get('/', function (request, response) {
    response.clearCookie('token')
    console.log(`---- app.get | /----`)
    response.sendFile(path.join(__dirname, 'static/index.html'), function (err) {
        if (err) {
            response.status(500).send(err)
        }
    })
});

//呼叫後端API
/*
app.post('/savetoken',async(req, res) =>{
    data_context ={"email_id": "3","email": "emily095333637@gmail.com","token_id": "1111"};
    //data_content = req.json();
    var options = {
        'method': 'POST',
        'url': 'http://localhost:8888/add',
        'body': JSON.stringify(data_context),
        'headers': {'Content_Type': 'application/json'}
    };
    request(options, function (error, response){
        if (error) throw new Error(error);
        res.send(response.body);
    });
    
})
*/

const bodyParser = require('body-parser'); //使req.body轉json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
            extended: true
        }));

//前端API 呼叫後端(test.js)
//傳 email => ivw_email
app.post('/saveemail',async(req, res) =>{  //res.body  { email_id: '3', email: 'emily095333637@gmail.com', token_id: '1111' } 
    var options = {
      'method': 'POST',
      'url': 'http://localhost:8888/addemail',
      //'body': JSON.stringify(req.body),
      'json': req.body,
      'headers': {'Content_Type': 'application/json'}
  };
  
  request(options, function (error, response){
      if (error) throw new Error(error);
      res.send(response.body); //reponse.body
    });
      
  })

//傳 token => ivw_token
app.post('/savetoken',async(req, res) =>{  //res.body  { email_id: '3', email: 'emily095333637@gmail.com', token_id: '1111' } 
    var options = {
      'method': 'POST',
      'url': 'http://localhost:8888/addtoken',
      //'body': JSON.stringify(req.body),
      'json': req.body,
      'headers': {'Content_Type': 'application/json'}
  };
  
  request(options, function (error, response){
      if (error) throw new Error(error);
      res.send(response.body); //reponse.body
    });
  })

//Login
app.post('/login',async(req, res) =>{  

    //console.log(req.body)

    var data= { 
        "OauthType":req.body.tokenObj.idpId,
        "AccessToken":req.body.accessToken,
        "Email":req.body.profileObj.email,
        "Device":"Web",
        "UserInfo": {"Email":req.body.profileObj.email,"Name":req.body.profileObj.name,"ImageURL":req.body.profileObj.imageUrl},
        "Profile":req.body
         }  

    console.log(data)

    var options = {
      'method': 'POST',
      'url': 'http://localhost:8888/login',
      //'body': JSON.stringify(data),
      'json': data,
      'headers': {'Content_Type': 'application/json'}
  };
    request(options, function (error, response){
        if (error) throw new Error(error);
        console.log(response)
        res.send(response); //reponse.body
        });
  })  

//CheckToken 
app.post('/checktoken',async(req, res) =>{  

    //取得{ Token: '', Device: '' }
    console.log(req.body)

    console.log("Connect to CheckToken")  

    var data = req.body

    var options = {
        'method': 'POST',
        'url': 'http://localhost:8888/checktoken',
        //'body': JSON.stringify(data),
        'json': data,
        'headers': {'Content_Type': 'application/json'}
    };
    request(options, function (error, response){
        if (error) throw new Error(error);
        console.log(response)
        res.send("response"); //reponse.body
    });
})








