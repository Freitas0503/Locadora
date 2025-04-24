-- V1__create_initial_schema.sql
-- Script de migração inicial para o Sistema de Controle de Locação de Veículos

-- Extensões úteis
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Módulo de Autenticação e Autorização

-- Tabela de usuários
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    ativo BOOLEAN DEFAULT TRUE,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ultimo_acesso TIMESTAMP,
    tentativas_login INTEGER DEFAULT 0,
    bloqueado BOOLEAN DEFAULT FALSE
);

-- Tabela de perfis
CREATE TABLE perfis (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL UNIQUE,
    descricao VARCHAR(255),
    nivel_acesso INTEGER NOT NULL
);

-- Tabela de relacionamento entre usuários e perfis
CREATE TABLE usuarios_perfis (
    usuario_id INTEGER REFERENCES usuarios(id),
    perfil_id INTEGER REFERENCES perfis(id),
    PRIMARY KEY (usuario_id, perfil_id)
);

-- Tabela de permissões
CREATE TABLE permissoes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL UNIQUE,
    descricao VARCHAR(255),
    recurso VARCHAR(100) NOT NULL
);

-- Tabela de relacionamento entre perfis e permissões
CREATE TABLE perfis_permissoes (
    perfil_id INTEGER REFERENCES perfis(id),
    permissao_id INTEGER REFERENCES permissoes(id),
    PRIMARY KEY (perfil_id, permissao_id)
);

-- Tabela de auditoria
CREATE TABLE auditoria (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER REFERENCES usuarios(id),
    acao VARCHAR(50) NOT NULL,
    tabela VARCHAR(50) NOT NULL,
    registro_id INTEGER,
    dados_antigos JSONB,
    dados_novos JSONB,
    ip VARCHAR(45),
    data_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    detalhes TEXT
);

-- Módulo de Cadastros

-- Tabela de clientes
CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    tipo CHAR(1) NOT NULL CHECK (tipo IN ('F', 'J')), -- F: Física, J: Jurídica
    nome VARCHAR(100) NOT NULL,
    documento VARCHAR(20) NOT NULL UNIQUE, -- CPF ou CNPJ
    email VARCHAR(100),
    telefone VARCHAR(20),
    celular VARCHAR(20),
    data_nascimento DATE, -- Para pessoa física
    endereco VARCHAR(150),
    numero VARCHAR(10),
    complemento VARCHAR(50),
    bairro VARCHAR(50),
    cidade VARCHAR(50),
    estado CHAR(2),
    cep VARCHAR(10),
    observacoes TEXT,
    ativo BOOLEAN DEFAULT TRUE,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ultima_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de motoristas
CREATE TABLE motoristas (
    id SERIAL PRIMARY KEY,
    cliente_id INTEGER REFERENCES clientes(id),
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(14) NOT NULL UNIQUE,
    rg VARCHAR(20),
    data_nascimento DATE NOT NULL,
    cnh VARCHAR(20) NOT NULL UNIQUE,
    categoria_cnh VARCHAR(5) NOT NULL,
    validade_cnh DATE NOT NULL,
    foto_cnh VARCHAR(255), -- Caminho para o arquivo
    endereco VARCHAR(150),
    numero VARCHAR(10),
    complemento VARCHAR(50),
    bairro VARCHAR(50),
    cidade VARCHAR(50),
    estado CHAR(2),
    cep VARCHAR(10),
    telefone VARCHAR(20),
    celular VARCHAR(20) NOT NULL,
    email VARCHAR(100),
    observacoes TEXT,
    ativo BOOLEAN DEFAULT TRUE,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ultima_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de categorias de veículos
CREATE TABLE categorias_veiculos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL UNIQUE,
    descricao VARCHAR(255)
);

-- Tabela de marcas de veículos
CREATE TABLE marcas_veiculos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL UNIQUE
);

-- Tabela de modelos de veículos
CREATE TABLE modelos_veiculos (
    id SERIAL PRIMARY KEY,
    marca_id INTEGER REFERENCES marcas_veiculos(id),
    nome VARCHAR(50) NOT NULL,
    categoria_id INTEGER REFERENCES categorias_veiculos(id),
    UNIQUE (marca_id, nome)
);

-- Tabela de veículos
CREATE TABLE veiculos (
    id SERIAL PRIMARY KEY,
    placa VARCHAR(10) NOT NULL UNIQUE,
    renavam VARCHAR(30) NOT NULL UNIQUE,
    chassi VARCHAR(30) NOT NULL UNIQUE,
    modelo_id INTEGER REFERENCES modelos_veiculos(id),
    ano_fabricacao INTEGER NOT NULL,
    ano_modelo INTEGER NOT NULL,
    cor VARCHAR(30) NOT NULL,
    combustivel VARCHAR(20) NOT NULL,
    quilometragem INTEGER NOT NULL DEFAULT 0,
    capacidade_passageiros INTEGER NOT NULL,
    capacidade_bagageiro VARCHAR(30),
    ar_condicionado BOOLEAN DEFAULT FALSE,
    direcao_hidraulica BOOLEAN DEFAULT FALSE,
    cambio_automatico BOOLEAN DEFAULT FALSE,
    vidro_eletrico BOOLEAN DEFAULT FALSE,
    trava_eletrica BOOLEAN DEFAULT FALSE,
    alarme BOOLEAN DEFAULT FALSE,
    som BOOLEAN DEFAULT FALSE,
    airbag BOOLEAN DEFAULT FALSE,
    abs BOOLEAN DEFAULT FALSE,
    valor_compra DECIMAL(10,2),
    data_compra DATE,
    valor_venda DECIMAL(10,2),
    data_venda DATE,
    valor_diaria DECIMAL(10,2) NOT NULL,
    valor_semanal DECIMAL(10,2),
    valor_mensal DECIMAL(10,2),
    status VARCHAR(20) NOT NULL CHECK (status IN ('DISPONIVEL', 'ALUGADO', 'MANUTENCAO', 'VENDIDO', 'INATIVO')),
    observacoes TEXT,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ultima_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de fornecedores
CREATE TABLE fornecedores (
    id SERIAL PRIMARY KEY,
    razao_social VARCHAR(100) NOT NULL,
    nome_fantasia VARCHAR(100),
    cnpj VARCHAR(20) NOT NULL UNIQUE,
    inscricao_estadual VARCHAR(20),
    endereco VARCHAR(150),
    numero VARCHAR(10),
    complemento VARCHAR(50),
    bairro VARCHAR(50),
    cidade VARCHAR(50),
    estado CHAR(2),
    cep VARCHAR(10),
    telefone VARCHAR(20),
    celular VARCHAR(20),
    email VARCHAR(100),
    contato VARCHAR(100),
    tipo_servico VARCHAR(100), -- Oficina, Seguradora, Posto, etc.
    observacoes TEXT,
    ativo BOOLEAN DEFAULT TRUE,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ultima_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Módulo de Locação

-- Tabela de contratos
CREATE TABLE contratos (
    id SERIAL PRIMARY KEY,
    numero VARCHAR(20) NOT NULL UNIQUE,
    cliente_id INTEGER REFERENCES clientes(id),
    veiculo_id INTEGER REFERENCES veiculos(id),
    motorista_id INTEGER REFERENCES motoristas(id),
    data_inicio TIMESTAMP NOT NULL,
    data_fim_previsto TIMESTAMP NOT NULL,
    data_fim_efetivo TIMESTAMP,
    quilometragem_inicial INTEGER NOT NULL,
    quilometragem_final INTEGER,
    valor_diaria DECIMAL(10,2) NOT NULL,
    valor_total_previsto DECIMAL(10,2) NOT NULL,
    valor_total_efetivo DECIMAL(10,2),
    valor_caucao DECIMAL(10,2),
    forma_pagamento VARCHAR(30) NOT NULL,
    status VARCHAR(20) NOT NULL CHECK (status IN ('RESERVADO', 'EM_ANDAMENTO', 'FINALIZADO', 'CANCELADO')),
    observacoes TEXT,
    usuario_id INTEGER REFERENCES usuarios(id),
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ultima_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de itens de checklist
CREATE TABLE checklist_itens (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao VARCHAR(255),
    categoria VARCHAR(50) NOT NULL, -- Documentação, Exterior, Interior, Motor, etc.
    ativo BOOLEAN DEFAULT TRUE
);

-- Tabela de checklist de locação
CREATE TABLE checklist_locacao (
    id SERIAL PRIMARY KEY,
    contrato_id INTEGER REFERENCES contratos(id),
    tipo CHAR(1) NOT NULL CHECK (tipo IN ('S', 'E')), -- S: Saída, E: Entrada
    data_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    usuario_id INTEGER REFERENCES usuarios(id),
    observacoes TEXT
);

-- Tabela de itens de checklist de locação
CREATE TABLE checklist_locacao_itens (
    checklist_id INTEGER REFERENCES checklist_locacao(id),
    item_id INTEGER REFERENCES checklist_itens(id),
    status CHAR(1) NOT NULL CHECK (status IN ('O', 'D', 'N')), -- O: OK, D: Danificado, N: Não aplicável
    observacao TEXT,
    foto VARCHAR(255), -- Caminho para o arquivo
    PRIMARY KEY (checklist_id, item_id)
);

-- Tabela de ocorrências de locação
CREATE TABLE ocorrencias_locacao (
    id SERIAL PRIMARY KEY,
    contrato_id INTEGER REFERENCES contratos(id),
    tipo VARCHAR(50) NOT NULL, -- Acidente, Multa, Pane, etc.
    data_hora TIMESTAMP NOT NULL,
    descricao TEXT NOT NULL,
    local VARCHAR(255),
    valor DECIMAL(10,2),
    responsavel VARCHAR(50), -- Cliente, Locadora, Terceiros
    status VARCHAR(20) NOT NULL, -- Pendente, Em análise, Resolvido
    usuario_id INTEGER REFERENCES usuarios(id),
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ultima_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Módulo Financeiro

-- Tabela de plano de contas
CREATE TABLE plano_contas (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(20) NOT NULL UNIQUE,
    descricao VARCHAR(100) NOT NULL,
    tipo CHAR(1) NOT NULL CHECK (tipo IN ('R', 'D')), -- R: Receita, D: Despesa
    pai_id INTEGER REFERENCES plano_contas(id),
    ativo BOOLEAN DEFAULT TRUE
);

-- Tabela de recebimentos
CREATE TABLE recebimentos (
    id SERIAL PRIMARY KEY,
    contrato_id INTEGER REFERENCES contratos(id),
    plano_conta_id INTEGER REFERENCES plano_contas(id),
    data_vencimento DATE NOT NULL,
    data_recebimento DATE,
    valor DECIMAL(10,2) NOT NULL,
    forma_pagamento VARCHAR(30),
    status VARCHAR(20) NOT NULL CHECK (status IN ('PENDENTE', 'RECEBIDO', 'ATRASADO', 'CANCELADO')),
    observacoes TEXT,
    usuario_id INTEGER REFERENCES usuarios(id),
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ultima_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de despesas
CREATE TABLE despesas (
    id SERIAL PRIMARY KEY,
    veiculo_id INTEGER REFERENCES veiculos(id),
    fornecedor_id INTEGER REFERENCES fornecedores(id),
    plano_conta_id INTEGER REFERENCES plano_contas(id),
    descricao VARCHAR(255) NOT NULL,
    data_vencimento DATE NOT NULL,
    data_pagamento DATE,
    valor DECIMAL(10,2) NOT NULL,
    forma_pagamento VARCHAR(30),
    numero_documento VARCHAR(50),
    status VARCHAR(20) NOT NULL CHECK (status IN ('PENDENTE', 'PAGO', 'ATRASADO', 'CANCELADO')),
    observacoes TEXT,
    usuario_id INTEGER REFERENCES usuarios(id),
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ultima_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Módulo de Manutenção

-- Tabela de tipos de manutenção
CREATE TABLE tipos_manutencao (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL UNIQUE,
    descricao VARCHAR(255),
    periodicidade_km INTEGER, -- Quilometragem para manutenção preventiva
    periodicidade_tempo INTEGER -- Meses para manutenção preventiva
);

-- Tabela de manutenções
CREATE TABLE manutencoes (
    id SERIAL PRIMARY KEY,
    veiculo_id INTEGER REFERENCES veiculos(id),
    tipo_manutencao_id INTEGER REFERENCES tipos_manutencao(id),
    fornecedor_id INTEGER REFERENCES fornecedores(id),
    data_solicitacao DATE NOT NULL,
    data_inicio DATE,
    data_fim DATE,
    quilometragem INTEGER NOT NULL,
    descricao TEXT NOT NULL,
    valor_estimado DECIMAL(10,2),
    valor_efetivo DECIMAL(10,2),
    status VARCHAR(20) NOT NULL CHECK (status IN ('AGENDADA', 'EM_ANDAMENTO', 'CONCLUIDA', 'CANCELADA')),
    observacoes TEXT,
    usuario_id INTEGER REFERENCES usuarios(id),
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ultima_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de itens de manutenção
CREATE TABLE itens_manutencao (
    id SERIAL PRIMARY KEY,
    manutencao_id INTEGER REFERENCES manutencoes(id),
    descricao VARCHAR(255) NOT NULL,
    quantidade INTEGER NOT NULL DEFAULT 1,
    valor_unitario DECIMAL(10,2) NOT NULL,
    valor_total DECIMAL(10,2) NOT NULL
);

-- Módulo de Documentação

-- Tabela de documentos de veículos
CREATE TABLE documentos_veiculos (
    id SERIAL PRIMARY KEY,
    veiculo_id INTEGER REFERENCES veiculos(id),
    tipo VARCHAR(50) NOT NULL, -- CRLV, IPVA, Seguro, etc.
    numero VARCHAR(50),
    data_emissao DATE NOT NULL,
    data_vencimento DATE NOT NULL,
    valor DECIMAL(10,2),
    arquivo VARCHAR(255), -- Caminho para o arquivo
    observacoes TEXT,
    status VARCHAR(20) NOT NULL CHECK (status IN ('VIGENTE', 'VENCIDO', 'PENDENTE', 'CANCELADO')),
    usuario_id INTEGER REFERENCES usuarios(id),
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ultima_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de multas
CREATE TABLE multas (
    id SERIAL PRIMARY KEY,
    veiculo_id INTEGER REFERENCES veiculos(id),
    contrato_id INTEGER REFERENCES contratos(id),
    motorista_id INTEGER REFERENCES motoristas(id),
    data_infracao DATE NOT NULL,
    local_infracao VARCHAR(255),
    codigo_infracao VARCHAR(50),
    descricao TEXT NOT NULL,
    pontos INTEGER,
    valor DECIMAL(10,2) NOT NULL,
    data_vencimento DATE NOT NULL,
    data_pagamento DATE,
    responsavel VARCHAR(50), -- Cliente, Locadora, Motorista
    status VARCHAR(20) NOT NULL CHECK (status IN ('PENDENTE', 'PAGO', 'CONTESTADO', 'CANCELADO')),
    arquivo VARCHAR(255), -- Caminho para o arquivo
    observacoes TEXT,
    usuario_id INTEGER REFERENCES usuarios(id),
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ultima_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criação de índices para otimização de consultas
CREATE INDEX idx_veiculos_status ON veiculos(status);
CREATE INDEX idx_contratos_status ON contratos(status);
CREATE INDEX idx_contratos_cliente_id ON contratos(cliente_id);
CREATE INDEX idx_contratos_veiculo_id ON contratos(veiculo_id);
CREATE INDEX idx_manutencoes_veiculo_id ON manutencoes(veiculo_id);
CREATE INDEX idx_manutencoes_status ON manutencoes(status);
CREATE INDEX idx_recebimentos_status ON recebimentos(status);
CREATE INDEX idx_despesas_status ON despesas(status);
CREATE INDEX idx_auditoria_usuario_id ON auditoria(usuario_id);
CREATE INDEX idx_auditoria_data_hora ON auditoria(data_hora);
CREATE INDEX idx_documentos_veiculos_vencimento ON documentos_veiculos(data_vencimento);
