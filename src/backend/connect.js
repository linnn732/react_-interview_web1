const Sequelize = require('sequelize');
/*const sequelize = new Sequelize('interview_db', '10', 'C108118122', {
    host: '163.18.26.236',
    port: 3306,
    dialect: 'mysql'
});*/

module.exports = new Sequelize('interview_db', '10', 'C108118122', {
    host: '163.18.26.236',
    port: 3306,
    dialect: 'mysql'
});
