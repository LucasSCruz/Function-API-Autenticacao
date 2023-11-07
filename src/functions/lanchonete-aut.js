const { app } = require('@azure/functions');
const jwt = require('jsonwebtoken');
const secretKey = 'ETSF2dSZAv';

app.http('lanchonete-autenticacao-cpf', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);

        const cpf = request.query.get('CPF') || await request.text();

        var parametro = cpf
        var url = 'http://20.206.231.9/api/clientes/cpf/' + parametro;
          
          
        fetch(url)
           .then(function (response) {
              if (response.status === 200) {

                const payload = {
                    user_id: response.body.cpf,
                    username: response.body.username,
                    role: 'user',
                  };
                  
                  const token = jwt.sign(payload, secretKey, { expiresIn: '20min' });

                   result =  token;   
                } else {  
                    result = '401 Unauthorized';
                }
            })

        return { body: `Usuário encontrado!, ${result}!` };
    }
});
