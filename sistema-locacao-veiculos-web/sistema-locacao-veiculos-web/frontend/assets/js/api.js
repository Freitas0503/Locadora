// api.js - Adaptação das chamadas de API para ambiente de produção

// Importar configurações globais
// Nota: config.js deve ser carregado antes deste arquivo

// Funções de API para autenticação
const AuthAPI = {
    // Login de usuário
    login: async function(username, password) {
        try {
            return await API.post(ENDPOINTS.auth.login, { username, password });
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            throw error;
        }
    },
    
    // Logout de usuário
    logout: async function() {
        try {
            const result = await API.post(ENDPOINTS.auth.logout);
            // Limpar tokens do localStorage
            localStorage.removeItem(CONFIG.auth.tokenKey);
            localStorage.removeItem(CONFIG.auth.refreshTokenKey);
            return result;
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
            throw error;
        }
    },
    
    // Verificar se o usuário está autenticado
    isAuthenticated: function() {
        const token = localStorage.getItem(CONFIG.auth.tokenKey);
        return !!token;
    },
    
    // Obter informações do usuário atual
    getCurrentUser: async function() {
        try {
            return await API.get(`${ENDPOINTS.usuarios.base}/me`);
        } catch (error) {
            console.error('Erro ao obter usuário atual:', error);
            throw error;
        }
    }
};

// Funções de API para veículos
const VeiculosAPI = {
    // Listar todos os veículos
    listar: async function(params = {}) {
        try {
            return await API.get(ENDPOINTS.veiculos.base, params);
        } catch (error) {
            console.error('Erro ao listar veículos:', error);
            throw error;
        }
    },
    
    // Obter veículo por ID
    obterPorId: async function(id) {
        try {
            return await API.get(`${ENDPOINTS.veiculos.base}/${id}`);
        } catch (error) {
            console.error(`Erro ao obter veículo ${id}:`, error);
            throw error;
        }
    },
    
    // Cadastrar novo veículo
    cadastrar: async function(veiculo) {
        try {
            return await API.post(ENDPOINTS.veiculos.base, veiculo);
        } catch (error) {
            console.error('Erro ao cadastrar veículo:', error);
            throw error;
        }
    },
    
    // Atualizar veículo existente
    atualizar: async function(id, veiculo) {
        try {
            return await API.put(`${ENDPOINTS.veiculos.base}/${id}`, veiculo);
        } catch (error) {
            console.error(`Erro ao atualizar veículo ${id}:`, error);
            throw error;
        }
    },
    
    // Excluir veículo
    excluir: async function(id) {
        try {
            return await API.delete(`${ENDPOINTS.veiculos.base}/${id}`);
        } catch (error) {
            console.error(`Erro ao excluir veículo ${id}:`, error);
            throw error;
        }
    },
    
    // Listar veículos disponíveis para locação
    listarDisponiveis: async function(params = {}) {
        try {
            return await API.get(ENDPOINTS.veiculos.disponiveis, params);
        } catch (error) {
            console.error('Erro ao listar veículos disponíveis:', error);
            throw error;
        }
    },
    
    // Listar categorias de veículos
    listarCategorias: async function() {
        try {
            return await API.get(ENDPOINTS.veiculos.categorias);
        } catch (error) {
            console.error('Erro ao listar categorias de veículos:', error);
            throw error;
        }
    },
    
    // Listar marcas de veículos
    listarMarcas: async function() {
        try {
            return await API.get(ENDPOINTS.veiculos.marcas);
        } catch (error) {
            console.error('Erro ao listar marcas de veículos:', error);
            throw error;
        }
    },
    
    // Listar modelos de veículos por marca
    listarModelosPorMarca: async function(marcaId) {
        try {
            return await API.get(`${ENDPOINTS.veiculos.modelos}?marcaId=${marcaId}`);
        } catch (error) {
            console.error(`Erro ao listar modelos da marca ${marcaId}:`, error);
            throw error;
        }
    }
};

// Funções de API para clientes
const ClientesAPI = {
    // Listar todos os clientes
    listar: async function(params = {}) {
        try {
            return await API.get(ENDPOINTS.clientes.base, params);
        } catch (error) {
            console.error('Erro ao listar clientes:', error);
            throw error;
        }
    },
    
    // Obter cliente por ID
    obterPorId: async function(id) {
        try {
            return await API.get(`${ENDPOINTS.clientes.base}/${id}`);
        } catch (error) {
            console.error(`Erro ao obter cliente ${id}:`, error);
            throw error;
        }
    },
    
    // Cadastrar novo cliente
    cadastrar: async function(cliente) {
        try {
            return await API.post(ENDPOINTS.clientes.base, cliente);
        } catch (error) {
            console.error('Erro ao cadastrar cliente:', error);
            throw error;
        }
    },
    
    // Atualizar cliente existente
    atualizar: async function(id, cliente) {
        try {
            return await API.put(`${ENDPOINTS.clientes.base}/${id}`, cliente);
        } catch (error) {
            console.error(`Erro ao atualizar cliente ${id}:`, error);
            throw error;
        }
    },
    
    // Excluir cliente
    excluir: async function(id) {
        try {
            return await API.delete(`${ENDPOINTS.clientes.base}/${id}`);
        } catch (error) {
            console.error(`Erro ao excluir cliente ${id}:`, error);
            throw error;
        }
    }
};

// Funções de API para locações
const LocacoesAPI = {
    // Listar todas as locações
    listar: async function(params = {}) {
        try {
            return await API.get(ENDPOINTS.locacoes.base, params);
        } catch (error) {
            console.error('Erro ao listar locações:', error);
            throw error;
        }
    },
    
    // Obter locação por ID
    obterPorId: async function(id) {
        try {
            return await API.get(`${ENDPOINTS.locacoes.base}/${id}`);
        } catch (error) {
            console.error(`Erro ao obter locação ${id}:`, error);
            throw error;
        }
    },
    
    // Cadastrar nova locação
    cadastrar: async function(locacao) {
        try {
            return await API.post(ENDPOINTS.locacoes.base, locacao);
        } catch (error) {
            console.error('Erro ao cadastrar locação:', error);
            throw error;
        }
    },
    
    // Atualizar locação existente
    atualizar: async function(id, locacao) {
        try {
            return await API.put(`${ENDPOINTS.locacoes.base}/${id}`, locacao);
        } catch (error) {
            console.error(`Erro ao atualizar locação ${id}:`, error);
            throw error;
        }
    },
    
    // Finalizar locação (devolução)
    finalizar: async function(id, dadosDevolucao) {
        try {
            return await API.post(`${ENDPOINTS.locacoes.base}/${id}/finalizar`, dadosDevolucao);
        } catch (error) {
            console.error(`Erro ao finalizar locação ${id}:`, error);
            throw error;
        }
    },
    
    // Cancelar locação
    cancelar: async function(id, motivo) {
        try {
            return await API.post(`${ENDPOINTS.locacoes.base}/${id}/cancelar`, { motivo });
        } catch (error) {
            console.error(`Erro ao cancelar locação ${id}:`, error);
            throw error;
        }
    },
    
    // Listar locações ativas
    listarAtivas: async function(params = {}) {
        try {
            return await API.get(ENDPOINTS.locacoes.ativas, params);
        } catch (error) {
            console.error('Erro ao listar locações ativas:', error);
            throw error;
        }
    },
    
    // Listar locações atrasadas
    listarAtrasadas: async function(params = {}) {
        try {
            return await API.get(ENDPOINTS.locacoes.atrasadas, params);
        } catch (error) {
            console.error('Erro ao listar locações atrasadas:', error);
            throw error;
        }
    }
};

// Funções de API para dashboard
const DashboardAPI = {
    // Obter resumo geral
    obterResumo: async function() {
        try {
            return await API.get(ENDPOINTS.dashboard.resumo);
        } catch (error) {
            console.error('Erro ao obter resumo do dashboard:', error);
            throw error;
        }
    },
    
    // Obter dados de veículos para dashboard
    obterDadosVeiculos: async function() {
        try {
            return await API.get(ENDPOINTS.dashboard.veiculos);
        } catch (error) {
            console.error('Erro ao obter dados de veículos para dashboard:', error);
            throw error;
        }
    },
    
    // Obter dados financeiros para dashboard
    obterDadosFinanceiros: async function(periodo = 'mensal') {
        try {
            return await API.get(`${ENDPOINTS.dashboard.financeiro}?periodo=${periodo}`);
        } catch (error) {
            console.error('Erro ao obter dados financeiros para dashboard:', error);
            throw error;
        }
    },
    
    // Obter alertas para dashboard
    obterAlertas: async function() {
        try {
            return await API.get(ENDPOINTS.dashboard.alertas);
        } catch (error) {
            console.error('Erro ao obter alertas para dashboard:', error);
            throw error;
        }
    }
};

// Exportar APIs para uso global
window.AuthAPI = AuthAPI;
window.VeiculosAPI = VeiculosAPI;
window.ClientesAPI = ClientesAPI;
window.LocacoesAPI = LocacoesAPI;
window.DashboardAPI = DashboardAPI;
