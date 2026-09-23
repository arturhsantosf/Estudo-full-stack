// Script para manipular o formulário de contato
const formulario = document.getElementById('form-contato');

// Adiciona um evento de envio ao formulário
formulario.addEventListener('submit', function (event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    const nome = event.target.nome.value; // Obtém o valor do campo de nome
    const email = event.target.email.value; // Obtém o valor do campo de email
    const mensagem = event.target.mensagem.value; // Obtém o valor do campo de mensagem

    // cria um objeto com os dados do formulário
    const dadosFormulario = {
        nome: nome,
        email: email,
        mensagem: mensagem
    };
    // conversão do objeto em uma string JSON
    const dadosFormularioJSON = JSON.stringify(dadosFormulario);
    
    //chamada fetch para enviar os dados do formulário para o servidor
    fetch('http://localhost:3000/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: dadosFormularioJSON
    })
    //resposta do servidor é convertida em JSON
    .then(response => response.json())
    .then(data => {
        alert('Mensagem enviada com sucesso!'); // Exibe uma mensagem de sucesso para o usuário

        //reseta os campos do formulário após o envio
        event.target.reset();
    })
    //tratamento de erros caso ocorra algum problema na requisição
    .catch(error => {
        //exibe uma mensagem de erro no console do navegador
        console.error('Erro:', error);
        alert('Ocorreu um erro ao enviar a mensagem.'); // Exibe uma mensagem de erro para o usuário
    });

    });