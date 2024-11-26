const express = require('express');
const router = express.Router();
const serviceFilme = require('../services/filme');

// Rota para obter todos os filmes
router.get('/', async (req, res) => {
    try {
        const filmes = await serviceFilme.GetFilmes();
        res.json(filmes);
    } catch (error) {
        res.status(500).send({ msg: error.message });
    }
});

// Rota para criar um novo filme
router.post('/', async (req, res) => {
    try {
        const { titulo, classificacaoIndicativa, diretor } = req.body;
        const filme = await serviceFilme.CreateFilme(titulo, classificacaoIndicativa, diretor);
        res.status(201).json(filme);
    } catch (error) {
        res.status(500).send({ msg: error.message });
    }
});

// Rota para atualizar um filme
router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { titulo, classificacaoIndicativa, diretor } = req.body;
        const filme = await serviceFilme.UpdateFilme(id, titulo, classificacaoIndicativa, diretor);
        res.json(filme);
    } catch (error) {
        res.status(500).send({ msg: error.message });
    }
});

// Rota para deletar um filme
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const response = await serviceFilme.DeleteFilme(id);
        res.status(204).send(response);
    } catch (error) {
        res.status(500).send({ msg: error.message });
    }
});

module.exports = router;