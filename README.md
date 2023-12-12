# Trybe Futebol Clube

Bem-vindo ao repositório do Trybe Futebol Clube! Este projeto é uma aplicação desenvolvida em TypeScript que fornece informações partidas e classificações de futebol.
Este é um projeto full stack monorepo e o frontend foi construído por outro time.

## Recursos

- **Backend**: Construído em TypeScript utilizando a arquitetura MSC (Model, Service, Controller) para formar a API que alimenta o frontend.

- **Banco de dados MySQL**: Utiliza um banco de dados Sequelize para alimentar o serviço de backend

- **Dockerizado**: Execute a aplicação em contêineres Docker para facilitar a implantação e o desenvolvimento.

- **Cobertura de testes**: O backend é coberto por testes utilizando as bibliotecas sinon e chai.

## Como Iniciar

Siga estas etapas para executar o projeto em um contêiner Docker:

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/trybe-futebol-clube.git
   ```

2. Navegue até o diretório do projeto:

   ```bash
   cd trybe-futebol-clube
   ```

3. Execute a aplicação:

   ```bash
   npm run compose:up
   ```
   Esse comando é responsável por executar o docker-compose e subir todos os contêiners da aplicação.

Acesse a aplicação em http://localhost:3000.
