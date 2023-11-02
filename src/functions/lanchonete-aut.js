const { app } = require('@azure/functions');

app.http('lanchonete-autenticacao-cpf', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);

        const cpf = request.query.get('CPF') || await request.text();

        var parametro = cpf
        var url = 'https://20.242.211.18/api/clientes/cpf/' + parametro;

        fetch(url)
           .then(function (response) {
              if (response.status === 200) {
                   result =  response.json(); 
                } else {  
                    result = 'Erro na requisição GET';
                }
            })

        return { body: `Usuário encontrado!, ${result}!` };
    }
});
