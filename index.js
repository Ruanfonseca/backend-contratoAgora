// index.js
const express = require('express');
const bodyParser = require('body-parser'); // Para lidar com o corpo da requisição
const cors = require('cors'); // Importa o pacote cors
const app = express();

// Habilita CORS para todas as origens (se quiser permitir de qualquer lugar)
app.use(cors());  // Agora o servidor permite requisições de qualquer origem

// Se você quiser restringir a origem, pode fazer assim:
// app.use(cors({
//   origin: 'http://localhost:3000'  // Apenas permite requisições de http://localhost:3000
// }));

// Middleware para parsear o corpo das requisições em JSON
app.use(bodyParser.json());

app.set('port', 8000);

// Usando o Router no Express
app.use('/server', require('./routes/payment.routes'));  // todas as rotas no arquivo 'routes.js' começam com '/'

// Inicia o servidor
app.listen(app.get('port'), '0.0.0.0', () => {
  console.log('Backend contrato agora escutando porta ' + app.get('port'));
});
