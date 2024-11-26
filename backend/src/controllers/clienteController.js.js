// c:\Users\gabriel.alves9\Documents\AvaliacaoFinalJp\backend\src\controllers\clienteController.js
const serviceCliente = require('../services/cliente');

class ClienteController {
    async getClientes(req, res) {
        try {
            const clientes = await serviceCliente.GetClientes();
            res.json(clientes);
        } catch (error) {
            res.status(500).send({ msg: error.message });
        }
    }

    async createCliente(req, res) {
        const { nome, email, senha } = req.body;
        try {
            const cliente = await serviceCliente.CreateCliente(nome, email, senha);
            res.status(201).json(cliente);
        } catch (error) {
            res.status(400).send({ msg: error.message });
        }
    }

    async updateCliente(req, res) {
        const { id } = req.params;
        const { nome, email, senha } = req.body;
        try {
            const cliente = await serviceCliente.UpdateCliente(id, nome, email, senha);
            res.json(cliente);
        } catch (error) {
            res.status(404).send({ msg: error.message });
        }
    }

    async deleteCliente(req, res) {
        const { id } = req.params;
        try {
            await serviceCliente.DeleteCliente(id);
            res.status(204).send();
        } catch (error) {
            res.status(404).send({ msg: error.message });
        }
    }

    async login(req, res) {
        const { email, senha } = req.body;
        try {
            const token = await serviceCliente.Login(email, senha);
            res.json({ token });
        } catch (error) {
            res.status(401).send({ msg: error.message });
        }
    }
}

module.exports = new ClienteController();