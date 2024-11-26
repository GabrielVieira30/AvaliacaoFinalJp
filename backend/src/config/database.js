// src/config/database.js
const { Sequelize } = require('sequelize');

class Database {
    constructor() {
        this.init();
    }

    init() {
        this.db = new Sequelize({
            database: 'Locadora', // Novo nome do banco de dados
            host: 'localhost',
            username: 'root',
            dialect: 'mysql',
            password: ''
        });
    }
}

module.exports = new Database();