const express = require('express');
const routersPerson = require('./src/routes/pessoa');
const routersFilme = require('./src/routes/filme'); // Importando as rotas de filmes
const database = require('./src/config/database');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.use("/person", routersPerson);
app.use("/filme", routersFilme); // Usando as rotas de filmes

const PORT = 3000;

database.db
    .sync({ force: false })
    .then((_) => {
        console.info("Banco conectado com sucesso");
        app.listen(PORT, () => {
            console.info(`Servidor rodando na porta ${PORT}`);
        });
    })
    .catch((e) => {
        console.error(`Conexão com o banco de dados falhou: ${e.message}`);
    });