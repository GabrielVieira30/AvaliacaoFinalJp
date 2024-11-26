const Filme = require('../models/filme');


class ServiceFilme {
    async GetFilmes() {
        try {
            return await Filme.findAll();
        } catch (error) {
            throw new Error("Erro ao buscar filmes: " + error.message);
        }
    }

    async CreateFilme(titulo, classificacaoIndicativa, diretor) {
        try {
            return await Filme.create({ titulo, classificacaoIndicativa, diretor });
        } catch (error) {
            throw new Error("Erro ao criar filme: " + error.message);
        }
    }

    async UpdateFilme(id, titulo, classificacaoIndicativa, diretor) {
        try {
            const filme = await Filme.findByPk(id);
            if (!filme) throw new Error("Filme não encontrado");
            filme.titulo = titulo || filme.titulo;
            filme.classificacaoIndicativa = classificacaoIndicativa || filme.classificacaoIndicativa;
            filme.diretor = diretor || filme.diretor;
            await filme.save();
            return filme;
        } catch (error) {
            throw new Error("Erro ao atualizar filme: " + error.message);
        }
    }

    async DeleteFilme(id) {
        try {
            const filme = await Filme.findByPk(id);
            if (!filme) throw new Error("Filme não encontrado");
            await filme.destroy();
            return { msg: "Filme deletado com sucesso" };
        } catch (error) {
            throw new Error("Erro ao deletar filme: " + error.message);
        }
    }
}

module.exports = new ServiceFilme();