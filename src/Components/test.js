
/* GET home page. 
const express = require('express')
const app = express()
const port = 3000

// route setting
app.get('/', (req, res) => {
  res.send('This is my first Express app')
})

// create server
app.listen(port, () => {
  console.log(`server listen to http://localhost:${port}`)
})*/



const Sequelize = require('sequelize');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//將request進來的 data 轉成 json()
/*app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));*/
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// 監聽於 8080 端口
const port = 8080
app.listen(port, () => {
        console.log(`server listen to http://localhost:${port}`)
      })

// 建立連線
const sequelize = new Sequelize('interview_db', '10', 'C108118122', {
        host: '163.18.26.236',
        port: 3306,
        dialect: 'mysql'
    });
    
//定義Object ivw_email
const ivw_email = sequelize.define('ivw_email', {
        // 定義 Model 屬性
        email: {     　　　 // 欄位名稱
          type: Sequelize.STRING,  //  資料型態
          allowNull: false,　　　// 能不能為空，預設是 true
          primaryKey: true
        }

      }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'ivw_email'
        // Other model options go here
      });

//定義Object ivw_token
const ivw_token = sequelize.define('ivw_token', {
        // 定義 Model 屬性
        token: {     　　　 // 欄位名稱
          type: Sequelize.STRING,  //  資料型態
          allowNull: false,　　　// 能不能為空，預設是 true
          primaryKey: true
        }
      }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'ivw_token'
        // Other model options go here
      });
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






  