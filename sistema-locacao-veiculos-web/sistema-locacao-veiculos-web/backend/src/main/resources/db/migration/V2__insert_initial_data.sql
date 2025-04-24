-- V2__insert_initial_data.sql
-- Script de migração para inserção de dados iniciais

-- Inserir perfis padrão
INSERT INTO perfis (nome, descricao, nivel_acesso) VALUES
('ADMINISTRADOR', 'Acesso total ao sistema', 100),
('GERENTE', 'Acesso gerencial ao sistema', 80),
('ATENDENTE', 'Acesso às funcionalidades de atendimento', 50),
('FINANCEIRO', 'Acesso às funcionalidades financeiras', 60),
('MANUTENÇÃO', 'Acesso às funcionalidades de manutenção', 40);

-- Inserir usuário administrador padrão (senha: admin123)
INSERT INTO usuarios (nome, email, senha, ativo) VALUES
('Administrador', 'admin@locadora.com', crypt('admin123', gen_salt('bf')), TRUE);

-- Relacionar usuário administrador ao perfil administrador
INSERT INTO usuarios_perfis (usuario_id, perfil_id) VALUES (1, 1);

-- Inserir permissões básicas
INSERT INTO permissoes (nome, descricao, recurso) VALUES
('USUARIO_VISUALIZAR', 'Visualizar usuários', 'usuarios'),
('USUARIO_CRIAR', 'Criar usuários', 'usuarios'),
('USUARIO_EDITAR', 'Editar usuários', 'usuarios'),
('USUARIO_EXCLUIR', 'Excluir usuários', 'usuarios'),
('CLIENTE_VISUALIZAR', 'Visualizar clientes', 'clientes'),
('CLIENTE_CRIAR', 'Criar clientes', 'clientes'),
('CLIENTE_EDITAR', 'Editar clientes', 'clientes'),
('CLIENTE_EXCLUIR', 'Excluir clientes', 'clientes'),
('VEICULO_VISUALIZAR', 'Visualizar veículos', 'veiculos'),
('VEICULO_CRIAR', 'Criar veículos', 'veiculos'),
('VEICULO_EDITAR', 'Editar veículos', 'veiculos'),
('VEICULO_EXCLUIR', 'Excluir veículos', 'veiculos'),
('CONTRATO_VISUALIZAR', 'Visualizar contratos', 'contratos'),
('CONTRATO_CRIAR', 'Criar contratos', 'contratos'),
('CONTRATO_EDITAR', 'Editar contratos', 'contratos'),
('CONTRATO_EXCLUIR', 'Excluir contratos', 'contratos'),
('FINANCEIRO_VISUALIZAR', 'Visualizar financeiro', 'financeiro'),
('FINANCEIRO_GERENCIAR', 'Gerenciar financeiro', 'financeiro'),
('MANUTENCAO_VISUALIZAR', 'Visualizar manutenções', 'manutencoes'),
('MANUTENCAO_GERENCIAR', 'Gerenciar manutenções', 'manutencoes'),
('RELATORIO_VISUALIZAR', 'Visualizar relatórios', 'relatorios'),
('DASHBOARD_VISUALIZAR', 'Visualizar dashboard', 'dashboard');

-- Relacionar permissões ao perfil administrador
INSERT INTO perfis_permissoes (perfil_id, permissao_id)
SELECT 1, id FROM permissoes;

-- Inserir categorias de veículos padrão
INSERT INTO categorias_veiculos (nome, descricao) VALUES
('HATCH', 'Veículos hatchback compactos'),
('SEDAN', 'Veículos sedan médios'),
('SUV', 'Veículos utilitários esportivos'),
('PICKUP', 'Caminhonetes'),
('LUXO', 'Veículos de luxo'),
('VAN', 'Vans e minivans');

-- Inserir tipos de manutenção padrão
INSERT INTO tipos_manutencao (nome, descricao, periodicidade_km, periodicidade_tempo) VALUES
('TROCA DE ÓLEO', 'Troca de óleo do motor e filtro de óleo', 10000, 6),
('REVISÃO COMPLETA', 'Revisão completa do veículo', 20000, 12),
('TROCA DE FILTROS', 'Troca de filtros de ar, combustível e cabine', 10000, 6),
('TROCA DE PASTILHAS', 'Troca de pastilhas de freio', 30000, NULL),
('ALINHAMENTO E BALANCEAMENTO', 'Alinhamento e balanceamento das rodas', 10000, 6),
('TROCA DE PNEUS', 'Substituição dos pneus', 50000, 36);

-- Inserir itens de checklist padrão
INSERT INTO checklist_itens (nome, descricao, categoria, ativo) VALUES
('CRLV', 'Certificado de Registro e Licenciamento de Veículo', 'DOCUMENTAÇÃO', TRUE),
('MANUAL', 'Manual do proprietário', 'DOCUMENTAÇÃO', TRUE),
('SEGURO', 'Apólice de seguro', 'DOCUMENTAÇÃO', TRUE),
('ESTEPE', 'Pneu estepe', 'ACESSÓRIOS', TRUE),
('MACACO', 'Macaco hidráulico', 'ACESSÓRIOS', TRUE),
('CHAVE DE RODA', 'Chave de roda', 'ACESSÓRIOS', TRUE),
('TRIÂNGULO', 'Triângulo de sinalização', 'ACESSÓRIOS', TRUE),
('EXTINTOR', 'Extintor de incêndio', 'ACESSÓRIOS', TRUE),
('FARÓIS', 'Funcionamento dos faróis', 'EXTERIOR', TRUE),
('LANTERNAS', 'Funcionamento das lanternas', 'EXTERIOR', TRUE),
('PISCAS', 'Funcionamento das setas', 'EXTERIOR', TRUE),
('PNEUS', 'Estado dos pneus', 'EXTERIOR', TRUE),
('PARA-BRISA', 'Estado do para-brisa', 'EXTERIOR', TRUE),
('LIMPADORES', 'Funcionamento dos limpadores de para-brisa', 'EXTERIOR', TRUE),
('RETROVISORES', 'Estado dos retrovisores', 'EXTERIOR', TRUE),
('PINTURA', 'Estado da pintura', 'EXTERIOR', TRUE),
('AMASSADOS', 'Verificação de amassados', 'EXTERIOR', TRUE),
('ARRANHÕES', 'Verificação de arranhões', 'EXTERIOR', TRUE),
('BANCOS', 'Estado dos bancos', 'INTERIOR', TRUE),
('CINTO DE SEGURANÇA', 'Funcionamento dos cintos de segurança', 'INTERIOR', TRUE),
('AR CONDICIONADO', 'Funcionamento do ar condicionado', 'INTERIOR', TRUE),
('VIDROS ELÉTRICOS', 'Funcionamento dos vidros elétricos', 'INTERIOR', TRUE),
('TRAVAS ELÉTRICAS', 'Funcionamento das travas elétricas', 'INTERIOR', TRUE),
('RÁDIO', 'Funcionamento do rádio/som', 'INTERIOR', TRUE),
('PAINEL', 'Funcionamento do painel de instrumentos', 'INTERIOR', TRUE),
('TAPETES', 'Estado dos tapetes', 'INTERIOR', TRUE),
('FORRAÇÃO', 'Estado da forração interna', 'INTERIOR', TRUE),
('NÍVEL DE ÓLEO', 'Verificação do nível de óleo', 'MOTOR', TRUE),
('NÍVEL DE ÁGUA', 'Verificação do nível de água do radiador', 'MOTOR', TRUE),
('BATERIA', 'Estado da bateria', 'MOTOR', TRUE);

-- Inserir plano de contas básico
INSERT INTO plano_contas (codigo, descricao, tipo, pai_id, ativo) VALUES
('1', 'RECEITAS', 'R', NULL, TRUE);

INSERT INTO plano_contas (codigo, descricao, tipo, pai_id, ativo) VALUES
('1.1', 'RECEITAS OPERACIONAIS', 'R', 1, TRUE);

INSERT INTO plano_contas (codigo, descricao, tipo, pai_id, ativo) VALUES
('1.1.1', 'LOCAÇÃO DE VEÍCULOS', 'R', 2, TRUE),
('1.1.2', 'DIÁRIAS EXTRAS', 'R', 2, TRUE),
('1.1.3', 'MULTAS CONTRATUAIS', 'R', 2, TRUE);

INSERT INTO plano_contas (codigo, descricao, tipo, pai_id, ativo) VALUES
('1.2', 'RECEITAS NÃO OPERACIONAIS', 'R', 1, TRUE);

INSERT INTO plano_contas (codigo, descricao, tipo, pai_id, ativo) VALUES
('1.2.1', 'VENDA DE VEÍCULOS', 'R', 6, TRUE);

INSERT INTO plano_contas (codigo, descricao, tipo, pai_id, ativo) VALUES
('2', 'DESPESAS', 'D', NULL, TRUE);

INSERT INTO plano_contas (codigo, descricao, tipo, pai_id, ativo) VALUES
('2.1', 'DESPESAS OPERACIONAIS', 'D', 8, TRUE);

INSERT INTO plano_contas (codigo, descricao, tipo, pai_id, ativo) VALUES
('2.1.1', 'MANUTENÇÃO DE VEÍCULOS', 'D', 9, TRUE),
('2.1.2', 'COMBUSTÍVEL', 'D', 9, TRUE),
('2.1.3', 'SEGURO', 'D', 9, TRUE),
('2.1.4', 'IPVA', 'D', 9, TRUE),
('2.1.5', 'LICENCIAMENTO', 'D', 9, TRUE),
('2.1.6', 'MULTAS DE TRÂNSITO', 'D', 9, TRUE);

INSERT INTO plano_contas (codigo, descricao, tipo, pai_id, ativo) VALUES
('2.2', 'DESPESAS ADMINISTRATIVAS', 'D', 8, TRUE);

INSERT INTO plano_contas (codigo, descricao, tipo, pai_id, ativo) VALUES
('2.2.1', 'SALÁRIOS', 'D', 16, TRUE),
('2.2.2', 'ALUGUEL', 'D', 16, TRUE),
('2.2.3', 'ÁGUA', 'D', 16, TRUE),
('2.2.4', 'ENERGIA ELÉTRICA', 'D', 16, TRUE),
('2.2.5', 'TELEFONE E INTERNET', 'D', 16, TRUE),
('2.2.6', 'MATERIAL DE ESCRITÓRIO', 'D', 16, TRUE);

-- Inserir algumas marcas de veículos
INSERT INTO marcas_veiculos (nome) VALUES
('VOLKSWAGEN'),
('FIAT'),
('CHEVROLET'),
('FORD'),
('TOYOTA'),
('HONDA'),
('HYUNDAI'),
('RENAULT'),
('NISSAN'),
('MERCEDES-BENZ');

-- Inserir alguns modelos de veículos
INSERT INTO modelos_veiculos (marca_id, nome, categoria_id) VALUES
(1, 'GOL', 1),
(1, 'VIRTUS', 2),
(1, 'T-CROSS', 3),
(1, 'AMAROK', 4),
(2, 'ARGO', 1),
(2, 'CRONOS', 2),
(2, 'PULSE', 3),
(2, 'TORO', 4),
(3, 'ONIX', 1),
(3, 'CRUZE', 2),
(3, 'TRACKER', 3),
(3, 'S10', 4),
(4, 'KA', 1),
(4, 'FUSION', 2),
(4, 'ECOSPORT', 3),
(4, 'RANGER', 4),
(5, 'ETIOS', 1),
(5, 'COROLLA', 2),
(5, 'RAV4', 3),
(5, 'HILUX', 4);

-- Criar funções e triggers

-- Função para registrar auditoria
CREATE OR REPLACE FUNCTION fn_registrar_auditoria()
RETURNS TRIGGER AS $$
BEGIN
    IF (TG_OP = 'DELETE') THEN
        INSERT INTO auditoria (usuario_id, acao, tabela, registro_id, dados_antigos, dados_novos)
        VALUES (current_setting('app.usuario_id', true)::integer, 'DELETE', TG_TABLE_NAME, OLD.id, row_to_json(OLD), NULL);
        RETURN OLD;
    ELSIF (TG_OP = 'UPDATE') THEN
        INSERT INTO auditoria (usuario_id, acao, tabela, registro_id, dados_antigos, dados_novos)
        VALUES (current_setting('app.usuario_id', true)::integer, 'UPDATE', TG_TABLE_NAME, NEW.id, row_to_json(OLD), row_to_json(NEW));
        RETURN NEW;
    ELSIF (TG_OP = 'INSERT') THEN
        INSERT INTO auditoria (usuario_id, acao, tabela, registro_id, dados_antigos, dados_novos)
        VALUES (current_setting('app.usuario_id', true)::integer, 'INSERT', TG_TABLE_NAME, NEW.id, NULL, row_to_json(NEW));
        RETURN NEW;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger para atualizar status do veículo quando um contrato é iniciado ou finalizado
CREATE OR REPLACE FUNCTION fn_atualizar_status_veiculo()
RETURNS TRIGGER AS $$
BEGIN
    IF (TG_OP = 'INSERT') THEN
        IF (NEW.status = 'EM_ANDAMENTO') THEN
            UPDATE veiculos SET status = 'ALUGADO' WHERE id = NEW.veiculo_id;
        END IF;
    ELSIF (TG_OP = 'UPDATE') THEN
        IF (OLD.status != 'FINALIZADO' AND NEW.status = 'FINALIZADO') THEN
            UPDATE veiculos SET 
                status = 'DISPONIVEL',
                quilometragem = NEW.quilometragem_final
            WHERE id = NEW.veiculo_id;
        ELSIF (OLD.status != 'EM_ANDAMENTO' AND NEW.status = 'EM_ANDAMENTO') THEN
            UPDATE veiculos SET status = 'ALUGADO' WHERE id = NEW.veiculo_id;
        END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_contratos_atualizar_status_veiculo
AFTER INSERT OR UPDATE ON contratos
FOR EACH ROW
EXECUTE FUNCTION fn_atualizar_status_veiculo();

-- Trigger para atualizar quilometragem do veículo após manutenção
CREATE OR REPLACE FUNCTION fn_atualizar_quilometragem_veiculo_manutencao()
RETURNS TRIGGER AS $$
BEGIN
    IF (TG_OP = 'UPDATE') THEN
        IF (OLD.status != 'CONCLUIDA' AND NEW.status = 'CONCLUIDA') THEN
            UPDATE veiculos SET 
                quilometragem = NEW.quilometragem
            WHERE id = NEW.veiculo_id;
        END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_manutencoes_atualizar_quilometragem
AFTER UPDATE ON manutencoes
FOR EACH ROW
EXECUTE FUNCTION fn_atualizar_quilometragem_veiculo_manutencao();

-- Função para calcular valor total do contrato
CREATE OR REPLACE FUNCTION fn_calcular_valor_contrato(
    p_data_inicio TIMESTAMP,
    p_data_fim_previsto TIMESTAMP,
    p_valor_diaria DECIMAL(10,2)
)
RETURNS DECIMAL(10,2) AS $$
DECLARE
    v_dias INTEGER;
    v_valor_total DECIMAL(10,2);
BEGIN
    v_dias := EXTRACT(DAY FROM (p_data_fim_previsto - p_data_inicio)) + 1;
    v_valor_total := v_dias * p_valor_diaria;
    RETURN v_valor_total;
END;
$$ LANGUAGE plpgsql;

-- Trigger para calcular valor total previsto do contrato
CREATE OR REPLACE FUNCTION fn_calcular_valor_total_contrato()
RETURNS TRIGGER AS $$
BEGIN
    NEW.valor_total_previsto := fn_calcular_valor_contrato(NEW.data_inicio, NEW.data_fim_previsto, NEW.valor_diaria);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_contratos_calcular_valor_total
BEFORE INSERT OR UPDATE OF data_inicio, data_fim_previsto, valor_diaria ON contratos
FOR EACH ROW
EXECUTE FUNCTION fn_calcular_valor_total_contrato();

-- Função para verificar documentos próximos do vencimento
CREATE OR REPLACE FUNCTION fn_verificar_documentos_vencimento(p_dias INTEGER)
RETURNS TABLE (
    id INTEGER,
    veiculo_id INTEGER,
    placa VARCHAR(10),
    tipo VARCHAR(50),
    data_vencimento DATE,
    dias_restantes INTEGER
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        d.id,
        d.veiculo_id,
        v.placa,
        d.tipo,
        d.data_vencimento,
        (d.data_vencimento - CURRENT_DATE) AS dias_restantes
    FROM 
        documentos_veiculos d
    JOIN 
        veiculos v ON d.veiculo_id = v.id
    WHERE 
        d.status = 'VIGENTE'
        AND (d.data_vencimento - CURRENT_DATE) <= p_dias
    ORDER BY 
        d.data_vencimento;
END;
$$ LANGUAGE plpgsql;

-- Função para verificar manutenções preventivas necessárias
CREATE OR REPLACE FUNCTION fn_verificar_manutencoes_preventivas()
RETURNS TABLE (
    veiculo_id INTEGER,
    placa VARCHAR(10),
    tipo_manutencao_id INTEGER,
    tipo_manutencao VARCHAR(50),
    quilometragem_atual INTEGER,
    quilometragem_proxima INTEGER,
    meses_desde_ultima INTEGER
) AS $$
BEGIN
    RETURN QUERY
    WITH ultima_manutencao AS (
        SELECT 
            m.veiculo_id,
            m.tipo_manutencao_id,
            MAX(m.data_fim) AS ultima_data,
            MAX(m.quilometragem) AS ultima_quilometragem
        FROM 
            manutencoes m
        WHERE 
            m.status = 'CONCLUIDA'
        GROUP BY 
            m.veiculo_id, m.tipo_manutencao_id
    )
    SELECT 
        v.id AS veiculo_id,
        v.placa,
        tm.id AS tipo_manutencao_id,
        tm.nome AS tipo_manutencao,
        v.quilometragem AS quilometragem_atual,
        COALESCE(um.ultima_quilometragem, 0) + tm.periodicidade_km AS quilometragem_proxima,
        EXTRACT(MONTH FROM AGE(CURRENT_DATE, COALESCE(um.ultima_data, v.data_cadastro::DATE)))::INTEGER AS meses_desde_ultima
    FROM 
        veiculos v
    CROSS JOIN 
        tipos_manutencao tm
    LEFT JOIN 
        ultima_manutencao um ON v.id = um.veiculo_id AND tm.id = um.tipo_manutencao_id
    WHERE 
        v.status != 'VENDIDO'
        AND v.status != 'INATIVO'
        AND (
            (tm.periodicidade_km IS NOT NULL AND v.quilometragem >= COALESCE(um.ultima_quilometragem, 0) + tm.periodicidade_km - 500)
            OR
            (tm.periodicidade_tempo IS NOT NULL AND EXTRACT(MONTH FROM AGE(CURRENT_DATE, COALESCE(um.ultima_data, v.data_cadastro::DATE)))::INTEGER >= tm.periodicidade_tempo)
        );
END;
$$ LANGUAGE plpgsql;
