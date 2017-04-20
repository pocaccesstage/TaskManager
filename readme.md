# POC Accesstage #

## Introdução ##

Apresentamos uma aplicação que foi construída em microserviços usando Spring Boot, Spring Cloud, Spring Security, Eureka Zuul, Ribbon, Feign e Docker.

O gerenciador de tarefas tem layout responsivo, possui autenticação de usuários e uma página com controles CRUD(create, replace, update e delete).

### Elementos funcionais ###

Aplicação foi decomposta em 2 microserviços principais: Login e Tarefas.

#### Login ####

Contém lógica de negócio para autenticação de usuários.

#### Tarefas ####

Contém lógica de negócio para gerenciar as tarefas.

### Elementos de infra-estrutura ###

Utilizamos o Docker Hub para hospedar as imagens base da aplicação e o Docker para administração dos containers.

Os microserviços utilizam o PostgreSQL para persistência dos dados.


## Deploy ##

Passo1: Acessar a pasta YAML dentro do projeto

Passo2: Usar os arquivos YAML para  criação do banco de dados e deploy de microserviços através do DashBoard do Kubernetes

As imagens Docker do microserviço estão no repositório público do Docker Hub

## Acesso ##

Acesso ao github pelo url: 
