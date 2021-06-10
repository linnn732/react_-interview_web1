const Sequelize = require('sequelize');
var sequelize = require('../connect.js');
module.exports = sequelize.define('Table_UserData', {
    // 定義 Model 屬性
    UserData_ID:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    OauthType:{
        type: Sequelize.STRING,
        allowNull: false　　
    },
    AccessToken:{
        type: Sequelize.STRING,
        allowNull: false
    },
    Email:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    Device:{
        type: Sequelize.STRING,
        allowNull: false　　
    },
    Token:{
        type: Sequelize.STRING,
        allowNull: true
    }
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'Table_UserData'
    // Other model options go here
  });