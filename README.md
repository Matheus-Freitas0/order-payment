# Order Payment

## Descrição
`Order Payment` é uma aplicação Node.js que gerencia o processamento de pagamentos para pedidos feitos no sistema `Order Manager`. Este sistema é responsável por receber requisições de pagamento, validar os dados e processar as transações, garantindo a segurança e a integridade das informações.

Order-manager(https://github.com/Matheus-Freitas0/orders-manager)
## Tecnologias Utilizadas
- **Node.js**
- **TypeScript**
- **Express**
- **Mongoose** (para conexão com o MongoDB)
- **RabbitMQ** (para comunicação com o `Order Manager`)
- **Axios** (para requisições HTTP)
- **Jest** (testes unitários)
- **Nodemon** (ambiente de desenvolvimento)

## Funcionalidades
- **Processamento de Pagamentos**: Recebe e processa pedidos de pagamento enviados pelo sistema `Order Manager`.
- **Validação de Dados**: Implementação de uma estratégia de validação para garantir a integridade dos dados de pagamento.
- **Integração com RabbitMQ**: Utiliza RabbitMQ para receber mensagens de pagamento do `Order Manager`, garantindo a comunicação assíncrona entre os sistemas.

## Estrutura do Projeto
- **/config**: Configurações do MongoDB e RabbitMQ, incluindo a configuração do servidor Express.
- **/strategies**: Implementação de estratégias de validação de pagamento.
- **/listeners**: Escutadores para processar mensagens recebidas do `Order Manager`.
- **/models**: Definições dos modelos de dados (e.g., `Payment`).
- **/routes**: Definições das rotas para a API de pagamentos.

## Configuração e Execução

### Pré-requisitos
- Node.js (v18 ou superior)
- MongoDB
- RabbitMQ

### Instalação
## 1. Clone o repositório:

    git clone git@github.com:Matheus-Freitas0/order-payment.git
   
## 2. Instale as dependências:

     npm install
    
## 3. Configure o banco de dados MongoDB e RabbitMQ.

Crie um arquivo .env com as variáveis de ambiente necessárias (exemplo: dados de conexão com o MongoDB, configuração do RabbitMQ, etc.).

# Scripts

### Compilar o projeto:

    npm run build
    
### Iniciar o servidor em produção:

    npm start
    
### Iniciar o servidor em modo de desenvolvimento:

    npm run start:dev
    
## Rodar testes unitários:

    npm test
    
## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Licença
Este projeto está licenciado sob a licença ISC.
