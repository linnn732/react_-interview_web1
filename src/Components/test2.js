const Sequelize = require('sequelize');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '100mb', parameterLimit: 1000000 }));

const sequelize = new Sequelize('interview_db', '10', 'C108118122', {
    host: '163.18.26.236',
    port: 3306,
    dialect: 'mysql'
});


const ivw_email = sequelize.define('ivw_email', {
    // 定義 Model 屬性
    email: {     　　　 // 欄位名稱
      type: Sequelize.STRING,  //  資料型態
      allowNull: false　　　// 能不能為空，預設是 true
    },
    token_id: {
      type: Sequelize.INTEGER
      // allowNull defaults to true
    }
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'ivw_email'
    // Other model options go here
  });

app.post('/test', function (request, response) {
    return ivw_email.create({
        email: request.body['email'],
        token_id: request.body["token_id"]
    }).then(function (users) {
        if (users) {
            response.send(users);
        } else {
            response.status(400).send('Error in insert new record');
        }
    });
});
const ivw_token = sequelize.define('ivw_token', {
  // 定義 Model 屬性
  token: {     　　　 // 欄位名稱
    type: Sequelize.STRING,  //  資料型態
    allowNull: false,　　// 能不能為空，預設是 true
    primaryKey: true
  }
}, {
  timestamps: false,
  freezeTableName: true,
  tableName: 'ivw_token'
  // Other model options go here
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

const port = 3000
app.listen(port, () => {
        console.log(`server listen to http://localhost:${port}`)
      })
     
/*sequelize.sync({ force: true }).then(() => {
        // 寫入對映欄位名稱的資料內容
        ivw_email.create({
          // 記得 value 字串要加上引號
          email:'C108118122',
          token_id: 11
        }).then(() => {
          // 執行成功後會印出文字
          console.log('successfully created!!') 
        });
      });*/