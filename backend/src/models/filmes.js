const { Sequelize, DataTypes } = require('sequelize');
const database = require('../config/database');

const Filme = database.db.define('Filmes', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    classificacaoIndicativa: {
        type: DataTypes.STRING
    },
    diretor: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Filme;