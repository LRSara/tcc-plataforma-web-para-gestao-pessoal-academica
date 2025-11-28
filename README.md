🎯 Objetivo

Esse sistema, é o meu trabalho de conclusão de curso (TCC), é uma plataforma web criada para auxiliar estudantes na organização da vida acadêmica. 
O sistema permite gerenciar tarefas, resumos, prazos importantes e acompanhar atividades do dia a dia de forma simples e intuitiva.
Além disso, possui fluxo de autenticação e recuperação de senha via e-mail.

📌 O que o projeto contém

- Backend (Laravel)

- API para autenticação, cadastro, tarefas e notificações

- Envio de e-mails, incluindo link de redefinição de senha

- Validações, tokens e fluxo de recuperação

- Conexão com banco de dados e migrações

- Frontend (React + TypeScript)

- Interface de uso simples e responsiva

- Consumo da API em todas as funcionalidades

- Tela de login, cadastro, tarefas, resumos e reset de senha

- Feedback visual (toasts, mensagens, redirecionamentos)

🚀 Como rodar o backend

- Entre na pasta backend

- Instale as dependências:

- composer install

- Crie o arquivo .env e configure o banco

- Gere a key da aplicação:

- php artisan key:generate

- Rode as migrações:

- php artisan migrate

Inicie o servidor:

- php artisan serve

💻 Como rodar o frontend

- Entre na pasta frontend

- Instale as dependências:

- npm install

- Inicie o projeto: npm start
