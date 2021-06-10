const Sequelize = require('sequelize');
var sequelize = require('../connect.js');
//定義Object ivw_token
module.exports = sequelize.define('ivw_token', {
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