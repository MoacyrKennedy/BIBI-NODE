# BIBI - Backend do Sistema de Caronas

BIBI é uma aplicação de caronas que conecta motoristas e passageiros, permitindo o compartilhamento de viagens de forma segura e eficiente.

## 🚀 Funcionalidades

- **Autenticação**
  - Registro de usuários (motoristas e passageiros)
  - Login com JWT
  - Proteção de rotas

- **Usuários**
  - Gerenciamento de perfil
  - Sistema de avaliação
  - Histórico de caronas

- **Veículos**
  - Cadastro de veículos
  - Gerenciamento de veículos por motorista
  - Validação de dados do veículo

- **Caronas**
  - Criação de caronas
  - Busca por caronas próximas (geolocalização)
  - Sistema de solicitação de caronas
  - Gerenciamento de status das caronas

## 🛠️ Tecnologias

- Node.js
- Express
- MongoDB
- JWT para autenticação
- Mongoose para modelagem de dados
- Express Validator para validação
- CORS para segurança

## 🏗️ Arquitetura

O projeto segue uma arquitetura MVC (Model-View-Controller) com algumas adaptações para APIs REST:

```
src/
├── config/
│   └── database.js         # Configuração do MongoDB
├── controllers/
│   ├── authController.js   # Controlador de autenticação
│   ├── userController.js   # Controlador de usuários
│   ├── rideController.js   # Controlador de caronas
│   └── vehicleController.js # Controlador de veículos
├── models/
│   ├── User.js            # Modelo de usuário
│   ├── Ride.js            # Modelo de carona
│   └── Vehicle.js         # Modelo de veículo
├── routes/
│   ├── auth.routes.js     # Rotas de autenticação
│   ├── user.routes.js     # Rotas de usuário
│   ├── ride.routes.js     # Rotas de caronas
│   └── vehicle.routes.js  # Rotas de veículos
├── middleware/
│   ├── auth.js            # Middleware de autenticação
│   └── validation.js      # Middleware de validação
└── app.js                 # Arquivo principal da aplicação
```

### Camadas da Aplicação

1. **Models**: Representam as entidades do banco de dados e contêm a lógica de negócios relacionada aos dados
   - Schemas do Mongoose
   - Validações de dados
   - Métodos de modelo

2. **Controllers**: Gerenciam as requisições HTTP e coordenam as interações entre Models e clientes
   - Processamento de requisições
   - Manipulação de dados
   - Retorno de respostas

3. **Routes**: Definem os endpoints da API e direcionam as requisições para os controllers apropriados
   - Definição de rotas
   - Middleware de autenticação
   - Validação de dados

4. **Middleware**: Funções que processam as requisições antes dos controllers
   - Autenticação JWT
   - Validação de dados
   - Tratamento de erros

5. **Config**: Configurações do projeto
   - Conexão com banco de dados
   - Variáveis de ambiente
   - Configurações de segurança

## 📋 Pré-requisitos

- Node.js (v14 ou superior)
- MongoDB
- NPM ou Yarn

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/MoacyrKennedy/BIBI-NODE.git
cd BIBI-NODE
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```
Edite o arquivo `.env` com suas configurações:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/bibi
JWT_SECRET=sua_chave_secreta_aqui
NODE_ENV=development
```

4. Inicie o servidor:
```bash
npm run dev
```

## 📚 Documentação da API

### Autenticação

#### Registro de Usuário
- **POST** `/api/auth/register`
```json
{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "123456",
  "phone": "11999999999",
  "role": "driver"
}
```

#### Login
- **POST** `/api/auth/login`
```json
{
  "email": "joao@email.com",
  "password": "123456"
}
```

### Veículos

#### Cadastrar Veículo
- **POST** `/api/vehicles`
```json
{
  "brand": "Toyota",
  "model": "Corolla",
  "year": 2020,
  "color": "Prata",
  "licensePlate": "ABC1234",
  "capacity": 4
}
```

### Caronas

#### Criar Carona
- **POST** `/api/rides`
```json
{
  "vehicle": "id_do_veiculo",
  "origin": {
    "coordinates": [-23.550520, -46.633308],
    "address": "Av. Paulista, 1000"
  },
  "destination": {
    "coordinates": [-23.557821, -46.639680],
    "address": "Rua Augusta, 500"
  },
  "departureTime": "2024-04-13T15:00:00Z",
  "availableSeats": 3,
  "price": 15.00
}
```

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## ✨ Autor

Feito por Moacyr Kennedy 