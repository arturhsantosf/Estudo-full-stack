// Importa o módulo express, que é o framework para criar APIs
const cors = require('cors')//importa o módulo cors para permitir requisições de diferentes origens
const express = require('express');

//importa modulo mongoose para conectar com o banco de dados
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://arturhsantosf_db_user:npMXyMvKh1NPEUlG@aumiaus.6cpsoey.mongodb.net/AuMiaus')
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso!')
  })
  .catch((error) => {
    console.error('Erro ao conectar com o banco de dados:', error)
  })//exibe uma mensagem no console informando que houve um erro ao conectar com o banco de dados

  const FaleConoscoSchema = new mongoose.Schema({
    nome: String,
    email: String,
    mensagem: String
  })//define o schema do modelo FaleConosco, que representa os dados do formulário de contato
  const FaleConosco = mongoose.model('FaleConosco', FaleConoscoSchema)//cria o modelo FaleConoscoModel com base no schema definido anteriormente


// Cria uma instância do Express para configurar nossa API 
const app = express() 
app.use(cors())//permite requisições de diferentes origens
// Define a porta do servidor local como 3000
// Configura o Express para interpretar requisições com corpo em JSON
app.use(express.json())

app.post('/', (req, res) => {
  //obter os dados do formulário enviados pelo front-end
  const { nome, email, mensagem } = req.body

  //consultar o corpo da requisição para acessar os dados do formulário
const novofaleconosco = new FaleConosco({nome, email, mensagem})//cria um novo documento do modelo FaleConosco with os dados do formulário enviados pelo front-end
 novofaleconosco.save()

 return res.status(200).json({ message: 'Mensagem enviada com sucesso!' })//retorna uma resposta de sucesso para o front-end
 // Inicia o servidor na porta 3000 e exibe uma mensagem no console informando que a API está rodando
})
 app.listen(3000, () => {
    console.log(`API rodando em http://localhost:3000`)
 })

