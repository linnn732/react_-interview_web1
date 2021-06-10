const Sequelize = require('sequelize');
var sequelize = require('../connect.js');
module.exports = sequelize.define('ivw_email', {
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