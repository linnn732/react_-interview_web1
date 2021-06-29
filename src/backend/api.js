var ivw_email = require('./models/email.js');
var ivw_token = require('./models/token.js');
var Table_UserData = require('./models/UserData.js');
var sd = require('silly-datetime');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const port = 8888
app.listen(port, () => {
    console.log(`server listen to http://localhost:${port}`)
})

//  insert 資料 => ivw_email
app.post('/addemail', function (request, response) {
    return ivw_email.create({
        email: request.body["email"]

    }).then(function (users) {
        if (users) {
            response.send(users);
        } else {
            response.status(400).send('Error in insert new record');
        }
    });
});
//  insert 資料 => ivw_token
app.post('/addtoken', function (request, response) {
    return ivw_token.create({
        token: request.body["token"]
    }).then(function (users) {
        if (users) {
            response.send(users);
        } else {
            response.status(400).send('Error in insert new record');
        }
    });
});

app.post('/checktoken', function (request, response) {

    //console.log(request.body)
    // 1. 看Json的Token是否為空值
    // 2. 比對時間戳記是否超時
    // 3. 比對帳號
    // 4. 是否有此Token

    console.log("--------------開始四個Check");

    //取到Token
    let Token = request.body.Token
    console.log(Token)

    // if (Token == null) {
    //     console.log("Token is null")
    //     //response.send("Error")
    // } else {
    //     console.log("Get Token")
    //     //response.send("Success")
    // }
    // console.log("--------------");

    //取得Token中的時間戳
    let token_str = Token.toString();
    let token_time = token_str.substr(-13);
    console.log(token_time);

    //取得系統當前時間
    var t = new Date();
    var time = t.getTime();//時間戳
    console.log(time)

    //str to int
    var Server_Time = parseInt(time)
    var Token_Time = parseInt(token_time)
    //開始比較
    // if (Token_Time > Server_Time) {
    //     console.log("憑證有效")
    //     response.send("Success")
    // } else if (Token_Time < Server_Time) {
    //     console.log("憑證無效")
    //     response.send("Error")
    // }

   // console.log("--------------");

   if (Token == null || undefined) {
        console.log("Token is null")
        response.send("Error")
    } else {
        console.log("Get Token")

        if(Token_Time < Server_Time){
            console.log("憑證無效")
            response.send("Error")
        }else{
            console.log("憑證有效")

            //取得Token中的帳號
            let token_email = token_str.slice(0, -13);
            console.log(token_email);

            //查詢是否有此帳號
            Table_UserData.findOne({
                where: {
                    'Email': token_email
                } // 查詢條件
            }).then(result => {
                console.log("有這個帳號")
                //如果有，print出資料
                //console.log(JSON.stringify(result))
                //response.json(result) 
            }).catch(err => {
                response.send("Error")
                console.log(err)
            })

            console.log("--------------");

            //查詢是否有此Token
            Table_UserData.findOne({
                where: {
                    'Token': request.body.Token
                } // 查詢條件
            }).then(result => {
                console.log("有這個Token")
                console.log("四個檢查全數過關")
                response.send("Success")
                //如果有，print出資料
                //console.log(JSON.stringify(result))
                //response.json(result) 
            }).catch(err => {
                response.send("Error")
                console.log(err)
            })
        }
     }
});

//  login 
app.post('/login', function (request, response) {

    //查看 request 資料
    //console.log(request.body)

    Table_UserData.findOrCreate({
        //如果沒有會新增
        defaults: {
            OauthType: request.body["OauthType"],
            AccessToken: request.body["AccessToken"],
            Email: request.body["Email"],
            Device: request.body["Device"]
        },
        where: { //以信箱做查詢
            'Email': request.body.Email
        }
    }).then(val => {
        // console.log("getval")
        console.log(val)

        console.log("--------------");

        //取得系統當前時間
        var t = new Date();
        var time = t.getTime();//轉成時間戳timestamp
        console.log(t)
        console.log(time)

        //系統時間+15分鐘
        var nt = new Date();
        nt.setTime(time + 1000 * 60 * 15);//設定比當前時間多15分鐘
        var newtime = nt.getTime();
        console.log(nt)
        console.log(newtime)

        //生成 TOken
        var Token = request.body.Email + newtime
        console.log(Token)

        console.log("--------------");

        Table_UserData.findOne({
            where: {
                Email: request.body.Email
            }
        }).then(user => {
            // 在 () 裡面用 {} 大括號包住要更新的內容
            user.update({
                Token: Token,
                AccessToken: request.body["AccessToken"]
            });
        }).then(() => {
            console.log('update done!');
        });

        //傳回去
        response.send(Token)
    })
});
