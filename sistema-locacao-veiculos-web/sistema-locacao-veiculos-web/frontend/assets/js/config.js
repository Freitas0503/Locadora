// config.js - Configuração da API para ambiente de produção

// URL base da API em produção
const API_URL = 'https://sistema-locacao-veiculos-api.onrender.com/api';

// Configurações globais
const CONFIG = {
    // URL base da API
    apiUrl: API_URL,
    
    // Timeout para requisições (em milissegundos)
    requestTimeout: 30000,
    
    // Versão do sistema
    version: '1.0.0',
    
    // Ambiente (production, development)
    environment: 'production',
    
    // Configurações de paginação padrão
    pagination: {
        defaultPageSize: 10,
        pageSizeOptions: [5, 10, 20, 50, 100]
    },
    
    // Configurações de cache
    cache: {
        enabled: true,
        duration: 300000 // 5 minutos em milissegundos
    },
    
    // Configurações de autenticação
    auth: {
        tokenKey: 'locacao_veiculos_token',
        refreshTokenKey: 'locacao_veiculos_refresh_token',
        tokenExpiration: 86400000 // 24 horas em milissegundos
    }
};

// Endpoints da API
const ENDPOINTS = {
    // Autenticação
    auth: {
        login: `${API_URL}/auth/login`,
        logout: `${API_URL}/auth/logout`,
        refresh: `${API_URL}/auth/refresh`,
        forgotPassword: `${API_URL}/auth/forgot-password`,
        resetPassword: `${API_URL}/auth/reset-password`
    },
    
    // Usuários
    usuarios: {
        base: `${API_URL}/usuarios`,
        perfis: `${API_URL}/usuarios/perfis`,
        permissoes: `${API_URL}/usuarios/permissoes`
    },
    
    // Veículos
    veiculos: {
        base: `${API_URL}/veiculos`,
        categorias: `${API_URL}/veiculos/categorias`,
        marcas: `${API_URL}/veiculos/marcas`,
        modelos: `${API_URL}/veiculos/modelos`,
        status: `${API_URL}/veiculos/status`,
        disponiveis: `${API_URL}/veiculos/disponiveis`
    },
    
    // Clientes
    clientes: {
        base: `${API_URL}/clientes`,
        pessoasFisicas: `${API_URL}/clientes/pessoas-fisicas`,
        pessoasJuridicas: `${API_URL}/clientes/pessoas-juridicas`
    },
    
    // Motoristas
    motoristas: {
        base: `${API_URL}/motoristas`
    },
    
    // Locações
    locacoes: {
        base: `${API_URL}/locacoes`,
        ativas: `${API_URL}/locacoes/ativas`,
        finalizadas: `${API_URL}/locacoes/finalizadas`,
        atrasadas: `${API_URL}/locacoes/atrasadas`
    },
    
    // Financeiro
    financeiro: {
        receitas: `${API_URL}/financeiro/receitas`,
        despesas: `${API_URL}/financeiro/despesas`,
        relatorios: `${API_URL}/financeiro/relatorios`
    },
    
    // Manutenções
    manutencoes: {
        base: `${API_URL}/manutencoes`,
        preventivas: `${API_URL}/manutencoes/preventivas`,
        corretivas: `${API_URL}/manutencoes/corretivas`
    },
    
    // Documentos
    documentos: {
        base: `${API_URL}/documentos`,
        veiculos: `${API_URL}/documentos/veiculos`,
        motoristas: `${API_URL}/documentos/motoristas`
    },
    
    // Fornecedores
    fornecedores: {
        base: `${API_URL}/fornecedores`
    },
    
    // Dashboard
    dashboard: {
        resumo: `${API_URL}/dashboard/resumo`,
        veiculos: `${API_URL}/dashboard/veiculos`,
        financeiro: `${API_URL}/dashboard/financeiro`,
        locacoes: `${API_URL}/dashboard/locacoes`,
        alertas: `${API_URL}/dashboard/alertas`
    }
};

// Funções utilitárias para requisições HTTP
const API = {
    // Função para obter headers padrão com autenticação
    getHeaders: function() {
        const token = localStorage.getItem(CONFIG.auth.tokenKey);
        return {
            'Content-Type': 'application/json',
            'Authorization': token ? `Bearer ${token}` : ''
        };
    },
    
    // GET request
    get: async function(url, params = {}) {
        const queryParams = new URLSearchParams(params).toString();
        const fullUrl = queryParams ? `${url}?${queryParams}` : url;
        
        try {
            const response = await fetch(fullUrl, {
                method: 'GET',
                headers: this.getHeaders(),
                timeout: CONFIG.requestTimeout
            });
            
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Erro na requisição GET:', error);
            throw error;
        }
    },
    
    // POST request
    post: async function(url, data = {}) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: this.getHeaders(),
                body: JSON.stringify(data),
                timeout: CONFIG.requestTimeout
            });
            
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Erro na requisição POST:', error);
            throw error;
        }
    },
    
    // PUT request
    put: async function(url, data = {}) {
        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: this.getHeaders(),
                body: JSON.stringify(data),
                timeout: CONFIG.requestTimeout
            });
            
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Erro na requisição PUT:', error);
            throw error;
        }
    },
    
    // DELETE request
    delete: async function(url) {
        try {
            const response = await fetch(url, {
                method: 'DELETE',
                headers: this.getHeaders(),
                timeout: CONFIG.requestTimeout
            });
            
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Erro na requisição DELETE:', error);
            throw error;
        }
    }
};

// Exportar configurações para uso global
window.CONFIG = CONFIG;
window.ENDPOINTS = ENDPOINTS;
window.API = API;
