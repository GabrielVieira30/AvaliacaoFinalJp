const serviceFilme = require('../src/services/filme');
const Filme = require('../src/models/filme');

jest.mock('../src/models/filme'); // Mockando o modelo Filme

describe('Service Filme', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Limpa os mocks após cada teste
    });

    test('Deve retornar todos os filmes', async () => {
        const filmesMock = [{ id: 1, titulo: 'Filme 1' }, { id: 2, titulo: 'Filme 2' }];
        Filme.findAll.mockResolvedValue(filmesMock);

        const filmes = await serviceFilme.GetFilmes();
        expect(filmes).toEqual(filmesMock);
        expect(Filme.findAll).toHaveBeenCalled();
    });

    test('Deve criar um novo filme', async () => {
        const novoFilme = { titulo: 'Filme 1', classificacaoIndicativa: 'PG', diretor: 'Diretor 1' };
        Filme.create.mockResolvedValue(novoFilme);

        const filme = await serviceFilme.CreateFilme('Filme 1', 'PG', 'Diretor 1');
        expect(filme).toEqual(novoFilme);
        expect(Filme.create).toHaveBeenCalledWith(novoFilme);
    });

    test('Deve atualizar um filme existente', async () => {
        const filmeExistente = { id: 1, titulo: 'Filme 1', classificacaoIndicativa: 'PG', diretor: 'Diretor 1' };
        const filmeAtualizado = { ...filmeExistente, titulo: 'Filme Atualizado' };

        Filme.findByPk.mockResolvedValue(filmeExistente);
        Filme.prototype.save = jest.fn().mockResolvedValue(filmeAtualizado);

        const filme = await serviceFilme.UpdateFilme(1, 'Filme Atualizado');
        expect(filme).toEqual(filmeAtualizado);
        expect(Filme.findByPk).toHaveBeenCalledWith(1);
    });

    test('Deve deletar um filme existente', async () => {
        const filmeExistente = { id: 1, titulo: 'Filme 1' };
        Filme.findByPk.mockResolvedValue(filmeExistente);
        Filme.prototype.destroy = jest.fn().mockResolvedValue();

        const response = await serviceFilme.DeleteFilme(1);
        expect(response).toEqual({ msg: "Filme deletado com sucesso" });
        expect(Filme.findByPk).toHaveBeenCalledWith(1);
        expect(filmeExistente.destroy).toHaveBeenCalled();
    });
});