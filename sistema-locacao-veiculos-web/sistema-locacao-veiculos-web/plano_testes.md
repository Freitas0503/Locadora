# Plano de Testes do Sistema de Locação de Veículos Implantado

## 1. Testes de Acessibilidade

### 1.1 Acesso ao Frontend
- **Objetivo**: Verificar se o frontend está acessível pela URL pública
- **Passos**:
  1. Acessar https://sistema-locacao-veiculos.netlify.app
  2. Verificar se a página inicial carrega corretamente
  3. Verificar se todos os recursos estáticos (CSS, JS, imagens) são carregados
- **Resultado Esperado**: Página inicial carrega completamente sem erros de console

### 1.2 Acesso ao Backend
- **Objetivo**: Verificar se a API está acessível pela URL pública
- **Passos**:
  1. Acessar https://sistema-locacao-veiculos-api.onrender.com/api/actuator/health
  2. Verificar se o endpoint de saúde retorna status 200 OK
- **Resultado Esperado**: Resposta JSON com status "UP"

## 2. Testes de Autenticação

### 2.1 Login
- **Objetivo**: Verificar se o sistema de login funciona corretamente
- **Passos**:
  1. Acessar a página inicial
  2. Inserir credenciais válidas (admin/admin123)
  3. Clicar no botão "Entrar"
- **Resultado Esperado**: Login bem-sucedido, redirecionamento para o dashboard

### 2.2 Logout
- **Objetivo**: Verificar se o sistema de logout funciona corretamente
- **Passos**:
  1. Fazer login no sistema
  2. Clicar no botão "Sair"
- **Resultado Esperado**: Logout bem-sucedido, redirecionamento para a página de login

### 2.3 Proteção de Rotas
- **Objetivo**: Verificar se as rotas protegidas exigem autenticação
- **Passos**:
  1. Limpar cookies e localStorage
  2. Tentar acessar diretamente uma página protegida (ex: dashboard)
- **Resultado Esperado**: Redirecionamento para a página de login

## 3. Testes Funcionais

### 3.1 Dashboard
- **Objetivo**: Verificar se o dashboard carrega corretamente com dados
- **Passos**:
  1. Fazer login no sistema
  2. Acessar o dashboard
- **Resultado Esperado**: Dashboard exibe cards de status e gráficos corretamente

### 3.2 Cadastro de Veículo
- **Objetivo**: Verificar se o cadastro de veículos funciona corretamente
- **Passos**:
  1. Fazer login no sistema
  2. Acessar a página de cadastro de veículos
  3. Preencher o formulário com dados válidos
  4. Enviar o formulário
- **Resultado Esperado**: Veículo cadastrado com sucesso, mensagem de confirmação exibida

### 3.3 Listagem de Veículos
- **Objetivo**: Verificar se a listagem de veículos funciona corretamente
- **Passos**:
  1. Fazer login no sistema
  2. Acessar a página de listagem de veículos
- **Resultado Esperado**: Lista de veículos exibida corretamente

### 3.4 Cadastro de Cliente
- **Objetivo**: Verificar se o cadastro de clientes funciona corretamente
- **Passos**:
  1. Fazer login no sistema
  2. Acessar a página de cadastro de clientes
  3. Preencher o formulário com dados válidos
  4. Enviar o formulário
- **Resultado Esperado**: Cliente cadastrado com sucesso, mensagem de confirmação exibida

### 3.5 Cadastro de Locação
- **Objetivo**: Verificar se o cadastro de locações funciona corretamente
- **Passos**:
  1. Fazer login no sistema
  2. Acessar a página de cadastro de locações
  3. Selecionar cliente e veículo
  4. Preencher datas e valores
  5. Enviar o formulário
- **Resultado Esperado**: Locação cadastrada com sucesso, mensagem de confirmação exibida

## 4. Testes de Integração

### 4.1 Comunicação Frontend-Backend
- **Objetivo**: Verificar se o frontend se comunica corretamente com o backend
- **Passos**:
  1. Fazer login no sistema
  2. Monitorar as requisições de rede no console do navegador
  3. Realizar operações que envolvam chamadas à API
- **Resultado Esperado**: Requisições HTTP bem-sucedidas, respostas corretas da API

### 4.2 CORS
- **Objetivo**: Verificar se a configuração CORS está funcionando corretamente
- **Passos**:
  1. Fazer login no sistema
  2. Monitorar as requisições de rede no console do navegador
- **Resultado Esperado**: Ausência de erros CORS nas requisições

## 5. Testes de Responsividade

### 5.1 Desktop
- **Objetivo**: Verificar se o sistema funciona corretamente em telas grandes
- **Passos**:
  1. Acessar o sistema em um navegador desktop
  2. Navegar pelas principais páginas
- **Resultado Esperado**: Interface exibida corretamente, sem problemas de layout

### 5.2 Tablet
- **Objetivo**: Verificar se o sistema funciona corretamente em tablets
- **Passos**:
  1. Acessar o sistema em um tablet ou usar o modo de emulação do navegador
  2. Navegar pelas principais páginas
- **Resultado Esperado**: Interface adaptada para tablet, sem problemas de layout

### 5.3 Mobile
- **Objetivo**: Verificar se o sistema funciona corretamente em smartphones
- **Passos**:
  1. Acessar o sistema em um smartphone ou usar o modo de emulação do navegador
  2. Navegar pelas principais páginas
- **Resultado Esperado**: Interface adaptada para mobile, sem problemas de layout

## 6. Testes de Segurança

### 6.1 HTTPS
- **Objetivo**: Verificar se a conexão HTTPS está funcionando corretamente
- **Passos**:
  1. Acessar o sistema pela URL pública
  2. Verificar o status da conexão no navegador
- **Resultado Esperado**: Conexão segura (HTTPS) estabelecida, sem avisos de segurança

### 6.2 Proteção de Dados Sensíveis
- **Objetivo**: Verificar se dados sensíveis estão protegidos
- **Passos**:
  1. Fazer login no sistema
  2. Acessar páginas com dados sensíveis
  3. Verificar se os dados são transmitidos de forma segura
- **Resultado Esperado**: Dados sensíveis transmitidos apenas via HTTPS, tokens JWT armazenados de forma segura

## 7. Testes de Performance

### 7.1 Tempo de Carregamento
- **Objetivo**: Verificar o tempo de carregamento das páginas
- **Passos**:
  1. Usar ferramentas como Lighthouse ou PageSpeed Insights
  2. Analisar o tempo de carregamento das principais páginas
- **Resultado Esperado**: Tempo de carregamento aceitável (< 3 segundos)

### 7.2 Otimização de Recursos
- **Objetivo**: Verificar se os recursos estáticos estão otimizados
- **Passos**:
  1. Usar ferramentas como Lighthouse ou PageSpeed Insights
  2. Analisar a otimização de imagens, CSS e JavaScript
- **Resultado Esperado**: Recursos otimizados, pontuação boa em ferramentas de análise

## 8. Relatório de Testes

Após a execução dos testes, será gerado um relatório contendo:

- Resumo dos testes executados
- Resultados obtidos
- Problemas identificados
- Recomendações de melhorias

Este relatório será utilizado para validar a implantação do sistema e identificar possíveis ajustes necessários antes da entrega final ao usuário.
