## Curso NodesJS da Rocketseat

[NLW#4] Trilha Node.js - curso da Rocketseat
[Link para o evento](https://nextlevelweek.com/episodios/node/1/edicao/4)


### Dia 1 - Rumo ao Próximo Nível

No primeiro dia vamos aprender os conceitos básicos sobre o que é uma API, entender o que é o NodeJS, onde ele tem sido utilizado e qual problema ele veio solucionar e também. Vamos também conhecer o TypeScript e entender como ele irá nos ajudar durante o desenvolvimento da nossa aplicação. Já nessa aula vamos dar início ao desenvolvimento da nossa API, colocando em prática alguns dos conceitos aprendidos.

- [ ]  Introdução ao NodesJS
- [ ]  Setup inicial


### Dia 2 - Banco de Dados

No segundo dia vamos iniciar a configuração do banco de dados na nossa aplicação, aprendendo algumas formas possíveis para realizar o acesso do banco de dados através do Nodejs. Vamos entender os conceitos de migrations, models e criar nossa primeira tabela de usuário. Também nessa aula iremos aprender e criar nosso primeiro Controller, isolando toda regra para dentro dele.

- [ ]  Conhecendo as formas de trabalhar com banco de dados na aplicação
- [ ]  Configurar o TypeORM na aplicação
- [ ]  Criar migration de usuário
- [ ]  Criar model de usuário
- [ ]  Criar controller do usuário
- [ ]  Criar rota do usuário


### Dia 3 - Testando a nossa aplicação

No terceiro dia vamos conhecer o conceito de Repository e como podemos utilizar ele para separar as responsabilidades nos componentes corretos. Vamos também dar inícios aos testes automatizados e entender os benefícios que eles trazem para a nossa aplicação.


### Dia 4 - Envio de e-mail

No quarto dia vamos aprender como enviar e-mail, utilizando templates customizados com informações vindas do banco de dados. Vamos aprender também como utilizar variáveis de ambiente dentro da aplicação


### Anotações

#### Conexões com DB

- Drivers nativos
- [Knex.js](http://knexjs.org)
- ORM: [TypeORM](https://typeorm.io)

Migrations

- Usuarios: 
- yarn add uuid
- yarn add @types/uuid -D

Use [Beekeeper Studio](https://www.beekeeperstudio.io/) for sqlite

#### Testes Automatizados

- Unitários
    ex: testes isolados de cada função
- Integração
    ex: request -> routes -> controllers -> repository
    <- way back>
- Ponta a Ponta (E2E)
    ex: Comportamento

Usaremos aqui o JEST
- yarn add jest @types/jest -D

Criar arquivo de configuração
- yarn jest --init

Caso use TypeScript, temos que instalar para usar como "preset":
- yarn add ts-jest -D

Para simular requiseições HTTP:
- yarn add supertest @types/supertest -D

#### Envio de email

- [Nodemailer](https://nodemailer.com) - as mail client
- [Ethereal](https://ethereal.email) - to send email
- [Handlebars](https://handlebarsjs.com/) - create semantic templates
- [Emmet Documentation](https://docs.emmet.io/cheat-sheet/)

Para gerar dados fake: [FakerJs](http://marak.github.io/faker.js/)

