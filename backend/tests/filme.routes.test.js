const request = require('supertest');
const express = require('express');
const app = express();
const routersFilme = require('../src/routes/filme');

app.use(express.json());
app.use('/filme', routersFilme);

jest.mock('../src/services/filme');

describe('Rotas Filme', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Limpa os mocks após cada teste
    });

    test('GET /filme deve retornar todos os filmes', async () => {
        const filmesMock = [{ id: 1, titulo: 'Filme 1' }, { id: 2, titulo: 'Filme 2' }];
        const responseMock = { json: jest.fn() };
        serviceFilme.GetFilmes.mockResolvedValue(filmesMock);

        const response = await request(app).get('/filme');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(filmesMock);
    });

    test('POST /filme deve criar um novo filme', async () => {
        const novoFilme = { titulo : 'Filme 1', classificacaoIndicativa: 'PG', diretor: 'Diretor 1' };
        serviceFilme.CreateFilme.mockResolvedValue(novoFilme);

        const response = await request(app)
            .post('/filme')
            .send(novoFilme);

        expect(response.status).toBe(201);
        expect(response.body).toEqual(novoFilme);
    });

    test('PUT /filme/:id deve atualizar um filme existente', async () => {
        const filmeAtualizado = { titulo: 'Filme Atualizado', classificacaoIndicativa: 'PG', diretor: 'Diretor 1' };
        serviceFilme.UpdateFilme.mockResolvedValue(filmeAtualizado);

        const response = await request(app)
            .put('/filme/1')
            .send(filmeAtualizado);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(filmeAtualizado);
    });

    test('DELETE /filme/:id deve deletar um filme existente', async () => {
        serviceFilme.DeleteFilme.mockResolvedValue({ msg: "Filme deletado com sucesso" });

        const response = await request(app).delete('/filme/1');

        expect(response.status).toBe(204);
        expect(response.body).toEqual({ msg: "Filme deletado com sucesso" });
    });
});