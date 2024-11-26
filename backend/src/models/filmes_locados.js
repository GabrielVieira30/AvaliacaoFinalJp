const { Sequelize, DataTypes } = require('sequelize');
const database = require('../config/database');
const Cliente = require('./cliente');
const Filme = require('./filme');

const FilmesLocados = database.db.define('Filmes_Locados', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idFilme: {
        type: DataTypes.INTEGER,
        references: {
            model: Filme,
            key: 'id'
        }
    },
    idCliente: {
        type: DataTypes.INTEGER,
        references: {
            model: Cliente,
            key: 'id'
        }
    },
    dataLocacao: {
        type: DataTypes.DATE,
        allowNull: false
    },
    dataDevolucao: {
        type: DataTypes.DATE
    }
});

module.exports = FilmesLocados;