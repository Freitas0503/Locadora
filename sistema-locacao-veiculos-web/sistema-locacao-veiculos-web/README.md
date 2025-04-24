[![Netlify Status](https://api.netlify.com/api/v1/badges/your-netlify-badge-id/deploy-status)](https://app.netlify.com/sites/sistema-locacao-veiculos/deploys)

# Sistema de Controle de Locação de Veículos - Implantação Web

Este repositório contém o código-fonte do Sistema de Controle de Locação de Veículos adaptado para implantação web.

## Visão Geral

O Sistema de Controle de Locação de Veículos é uma aplicação completa para gerenciamento de locadoras de veículos, incluindo:

- Cadastro de veículos, clientes e motoristas
- Controle de manutenção dos veículos
- Gestão financeira (recebimentos de locação e despesas)
- Dashboard com cards e gráficos de resultados financeiros
- Controle de status dos veículos (alugado, em manutenção, vendido)
- Sistema de controle de acesso de usuários
- Funcionalidades de auditoria

## Arquitetura

O sistema utiliza uma arquitetura moderna de aplicação web:

- **Frontend**: HTML5, CSS3, JavaScript e Bootstrap 5
- **Backend**: Java 11 com Spring Boot 2.7
- **Banco de Dados**: PostgreSQL
- **Autenticação**: JWT (JSON Web Token)
- **Hospedagem**:
  - Frontend: Netlify
  - Backend: Render
  - Banco de Dados: Render PostgreSQL

## Acesso ao Sistema

O sistema está disponível online nos seguintes endereços:

- **Aplicação Web**: [https://sistema-locacao-veiculos.netlify.app](https://sistema-locacao-veiculos.netlify.app)
- **API Backend**: [https://sistema-locacao-veiculos-api.onrender.com/api](https://sistema-locacao-veiculos-api.onrender.com/api)

## Credenciais de Acesso

Para acessar o sistema, utilize as seguintes credenciais:

- **Usuário**: admin
- **Senha**: admin123

## Desenvolvimento Local

### Requisitos

- Java 11 ou superior
- Maven 3.6 ou superior
- Node.js 14 ou superior (opcional, para desenvolvimento frontend)
- PostgreSQL 12 ou superior

### Configuração do Backend

1. Clone este repositório
2. Navegue até a pasta `backend`
3. Configure o banco de dados no arquivo `src/main/resources/application.properties`
4. Execute o comando: `mvn spring-boot:run`

### Configuração do Frontend

1. Navegue até a pasta `frontend`
2. Abra o arquivo `assets/js/config.js` e ajuste a URL da API se necessário
3. Para desenvolvimento local, você pode usar qualquer servidor web estático:
   - Python: `python -m http.server 8080`
   - Node.js: `npx serve -s .`

## Implantação

### Backend (Render)

O backend está configurado para implantação automática no Render através do arquivo `render.yaml`. Para implantar manualmente:

1. Crie uma conta no [Render](https://render.com)
2. Crie um novo Web Service e conecte ao repositório GitHub
3. Configure as variáveis de ambiente conforme o arquivo `render.yaml`
4. Implante o serviço

### Frontend (Netlify)

O frontend está configurado para implantação automática no Netlify. Para implantar manualmente:

1. Crie uma conta no [Netlify](https://netlify.com)
2. Arraste e solte a pasta `frontend` no dashboard do Netlify
3. Configure o domínio personalizado se necessário

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para detalhes.
