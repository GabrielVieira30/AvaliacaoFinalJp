const Cliente = require('../models/cliente');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class ServiceCliente {
    async GetClientes() {
        return Cliente.findAll();
    }

    async CreateCliente(nome, email, senha) {
        const hashSenha = await bcrypt.hash(senha, 12);
        return Cliente.create({ nome, email, senha: hashSenha });
    }

    async UpdateCliente(id, nome, email, senha) {
        const cliente = await Cliente.findByPk(id);
        if (!cliente) throw new Error("Cliente não encontrado");
        cliente.nome = nome || cliente.nome;
        cliente.email = email || cliente.email;
        if (senha) {
            cliente.senha = await bcrypt.hash(senha, 12);
        }
        await cliente.save();
        return cliente;
    }

    async DeleteCliente(id) {
        const cliente = await Cliente.findByPk(id);
        if (!cliente) throw new Error("Cliente não encontrado");
        return cliente.destroy();
    }

    async Login(email, senha) {
        const cliente = await Cliente.findOne({ where: { email } });
        if (!cliente || !(await bcrypt.compare(senha, cliente.senha))) {
            throw new Error("Email ou senha inválido!");
        }
        return jwt.sign({ id: cliente.id }, 'segredo', { expiresIn: 60 * 60 });
    }
}

module.exports = new ServiceCliente();