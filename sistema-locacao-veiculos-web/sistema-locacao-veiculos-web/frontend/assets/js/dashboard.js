// dashboard.js - Script para a página de dashboard

document.addEventListener('DOMContentLoaded', function() {
    // Verificar autenticação
    checkAuthentication();
    
    // Carregar dados do dashboard
    loadDashboardData();
    
    // Configurar eventos
    setupEventListeners();
});

// Verificar se o usuário está autenticado
function checkAuthentication() {
    // Em um ambiente real, isso verificaria o token JWT
    const isAuthenticated = localStorage.getItem(CONFIG.auth.tokenKey);
    
    if (!isAuthenticated) {
        // Mostrar modal de login
        const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
        loginModal.show();
    } else {
        // Carregar informações do usuário
        loadUserInfo();
    }
}

// Carregar informações do usuário atual
async function loadUserInfo() {
    try {
        // Em um ambiente real, isso seria uma chamada à API
        // Por enquanto, usamos dados simulados
        const userData = {
            nome: 'Administrador',
            email: 'admin@locaveiculos.com',
            perfil: 'Administrador'
        };
        
        // Atualizar nome do usuário na interface
        document.getElementById('currentUserName').textContent = userData.nome;
    } catch (error) {
        console.error('Erro ao carregar informações do usuário:', error);
    }
}

// Carregar dados do dashboard
async function loadDashboardData() {
    try {
        // Em um ambiente real, isso seria uma chamada à API
        // Por enquanto, usamos dados simulados
        
        // Carregar contadores
        loadCounters();
        
        // Carregar gráficos
        loadCharts();
        
        // Carregar atividades recentes
        loadRecentActivities();
        
        // Carregar alertas
        loadAlerts();
    } catch (error) {
        console.error('Erro ao carregar dados do dashboard:', error);
        showToast('Erro', 'Não foi possível carregar os dados do dashboard. Tente novamente mais tarde.', 'error');
    }
}

// Carregar contadores
function loadCounters() {
    // Em um ambiente real, isso seria uma chamada à API
    // Por enquanto, usamos dados simulados
    
    // Atualizar contadores na interface
    document.getElementById('veiculosDisponiveisCount').textContent = '15';
    document.getElementById('locacoesAtivasCount').textContent = '8';
    document.getElementById('manutencoesPendentesCount').textContent = '3';
    document.getElementById('contratosAtrasadosCount').textContent = '2';
}

// Carregar gráficos
function loadCharts() {
    // Gráfico de Receitas x Despesas
    loadFinanceiroChart('mensal');
    
    // Gráfico de Status dos Veículos
    loadVeiculosStatusChart();
}

// Carregar gráfico financeiro
function loadFinanceiroChart(periodo) {
    // Em um ambiente real, isso seria uma chamada à API
    // Por enquanto, usamos dados simulados
    
    let labels, receitas, despesas;
    
    if (periodo === 'mensal') {
        labels = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'];
        receitas = [12000, 15000, 18000, 16000, 17000, 19000];
        despesas = [8000, 9000, 10000, 9500, 11000, 12000];
    } else if (periodo === 'trimestral') {
        labels = ['1º Tri', '2º Tri', '3º Tri', '4º Tri'];
        receitas = [45000, 52000, 58000, 60000];
        despesas = [27000, 32000, 35000, 38000];
    } else { // anual
        labels = ['2022', '2023', '2024', '2025'];
        receitas = [180000, 210000, 240000, 115000];
        despesas = [120000, 140000, 160000, 70000];
    }
    
    // Destruir gráfico existente se houver
    if (window.financeiroChart instanceof Chart) {
        window.financeiroChart.destroy();
    }
    
    // Criar novo gráfico
    const ctx = document.getElementById('financeiroChart').getContext('2d');
    window.financeiroChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Receitas',
                    data: receitas,
                    backgroundColor: 'rgba(40, 167, 69, 0.7)',
                    borderColor: 'rgba(40, 167, 69, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Despesas',
                    data: despesas,
                    backgroundColor: 'rgba(220, 53, 69, 0.7)',
                    borderColor: 'rgba(220, 53, 69, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(context.parsed.y);
                            }
                            return label;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
                        }
                    }
                }
            }
        }
    });
}

// Carregar gráfico de status dos veículos
function loadVeiculosStatusChart() {
    // Em um ambiente real, isso seria uma chamada à API
    // Por enquanto, usamos dados simulados
    
    const data = {
        labels: ['Disponíveis', 'Alugados', 'Em Manutenção', 'Vendidos'],
        datasets: [{
            data: [15, 8, 3, 2],
            backgroundColor: [
                'rgba(40, 167, 69, 0.7)',
                'rgba(0, 123, 255, 0.7)',
                'rgba(255, 193, 7, 0.7)',
                'rgba(108, 117, 125, 0.7)'
            ],
            borderColor: [
                'rgba(40, 167, 69, 1)',
                'rgba(0, 123, 255, 1)',
                'rgba(255, 193, 7, 1)',
                'rgba(108, 117, 125, 1)'
            ],
            borderWidth: 1
        }]
    };
    
    // Destruir gráfico existente se houver
    if (window.veiculosStatusChart instanceof Chart) {
        window.veiculosStatusChart.destroy();
    }
    
    // Criar novo gráfico
    const ctx = document.getElementById('veiculosStatusChart').getContext('2d');
    window.veiculosStatusChart = new Chart(ctx, {
        type: 'doughnut',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                }
            }
        }
    });
}

// Carregar atividades recentes
function loadRecentActivities() {
    // Em um ambiente real, isso seria uma chamada à API
    // Por enquanto, usamos os dados já presentes no HTML
}

// Carregar alertas
function loadAlerts() {
    // Em um ambiente real, isso seria uma chamada à API
    // Por enquanto, usamos os dados já presentes no HTML
    
    // Atualizar contador de notificações
    const alertCount = document.querySelectorAll('#alertasList .list-group-item').length;
    document.querySelector('.notification-badge').textContent = alertCount;
}

// Configurar eventos
function setupEventListeners() {
    // Evento de toggle do sidebar
    document.getElementById('sidebarCollapse').addEventListener('click', function() {
        document.getElementById('sidebar').classList.toggle('active');
    });
    
    // Evento de submissão do formulário de login
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault();
        handleLogin();
    });
    
    // Eventos de logout
    document.getElementById('btnLogout').addEventListener('click', handleLogout);
    document.getElementById('menuLogout').addEventListener('click', handleLogout);
    
    // Eventos para alternar período do gráfico financeiro
    document.querySelectorAll('[data-period]').forEach(button => {
        button.addEventListener('click', function() {
            // Remover classe active de todos os botões
            document.querySelectorAll('[data-period]').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Adicionar classe active ao botão clicado
            this.classList.add('active');
            
            // Carregar gráfico com o período selecionado
            loadFinanceiroChart(this.dataset.period);
        });
    });
}

// Função para lidar com o login
function handleLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Em um ambiente real, isso seria uma chamada à API
    // Por enquanto, usamos uma validação simples
    if (username === 'admin' && password === 'admin123') {
        // Simular token JWT
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwibmFtZSI6IkFkbWluaXN0cmFkb3IiLCJpYXQiOjE2MTYyMzkwMjJ9';
        
        // Salvar token no localStorage
        localStorage.setItem(CONFIG.auth.tokenKey, token);
        
        // Fechar modal de login
        const loginModal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
        loginModal.hide();
        
        // Carregar informações do usuário
        loadUserInfo();
        
        // Carregar dados do dashboard
        loadDashboardData();
        
        // Mostrar mensagem de boas-vindas
        showToast('Bem-vindo', 'Login realizado com sucesso!', 'success');
    } else {
        // Mostrar mensagem de erro
        const loginError = document.getElementById('loginError');
        loginError.textContent = 'Usuário ou senha inválidos.';
        loginError.classList.remove('d-none');
    }
}

// Função para lidar com o logout
function handleLogout() {
    // Em um ambiente real, isso seria uma chamada à API
    
    // Remover token do localStorage
    localStorage.removeItem(CONFIG.auth.tokenKey);
    localStorage.removeItem(CONFIG.auth.refreshTokenKey);
    
    // Redirecionar para a página de login
    window.location.reload();
}

// Função para mostrar toast
function showToast(title, message, type = 'info') {
    const toast = document.getElementById('alertToast');
    const toastTitle = document.getElementById('toastTitle');
    const toastMessage = document.getElementById('toastMessage');
    
    // Definir título e mensagem
    toastTitle.textContent = title;
    toastMessage.textContent = message;
    
    // Definir classe de acordo com o tipo
    toast.className = 'toast';
    if (type === 'success') {
        toast.classList.add('bg-success', 'text-white');
    } else if (type === 'error') {
        toast.classList.add('bg-danger', 'text-white');
    } else if (type === 'warning') {
        toast.classList.add('bg-warning', 'text-dark');
    } else {
        toast.classList.add('bg-info', 'text-white');
    }
    
    // Mostrar toast
    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();
}
