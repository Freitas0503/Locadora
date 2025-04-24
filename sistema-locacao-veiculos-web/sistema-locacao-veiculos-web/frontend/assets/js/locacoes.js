// locacoes.js - Scripts específicos para as páginas de locações

document.addEventListener('DOMContentLoaded', function() {
    // Referência ao formulário de locação
    const locacaoForm = document.getElementById('locacaoForm');
    
    // Se estamos na página de cadastro de locações
    if (locacaoForm) {
        // Carregar clientes, motoristas e veículos disponíveis
        carregarClientes();
        carregarMotoristas();
        carregarVeiculosDisponiveis();
        
        // Configurar data de início como hoje
        const dataInicio = document.getElementById('dataInicio');
        const horaInicio = document.getElementById('horaInicio');
        const dataPrevista = document.getElementById('dataPrevista');
        const horaPrevista = document.getElementById('horaPrevista');
        
        if (dataInicio && horaInicio) {
            const hoje = new Date();
            dataInicio.value = hoje.toISOString().split('T')[0];
            
            const horaAtual = hoje.getHours().toString().padStart(2, '0') + ':' + 
                             hoje.getMinutes().toString().padStart(2, '0');
            horaInicio.value = horaAtual;
            
            // Configurar data prevista como amanhã
            const amanha = new Date();
            amanha.setDate(amanha.getDate() + 1);
            dataPrevista.value = amanha.toISOString().split('T')[0];
            horaPrevista.value = horaAtual;
        }
        
        // Atualizar valor total quando mudar o tipo de locação ou quantidade de diárias
        const tipoLocacao = document.getElementById('tipoLocacao');
        const quantidadeDiarias = document.getElementById('quantidadeDiarias');
        const valorDiaria = document.getElementById('valorDiaria');
        const valorTotal = document.getElementById('valorTotal');
        const veiculo = document.getElementById('veiculo');
        
        if (tipoLocacao && quantidadeDiarias && valorDiaria && valorTotal && veiculo) {
            // Quando selecionar um veículo, atualizar o valor da diária
            veiculo.addEventListener('change', function() {
                const veiculoId = this.value;
                if (veiculoId) {
                    // Em um ambiente real, isso seria uma chamada à API
                    // Por enquanto, usamos dados simulados
                    const veiculos = {
                        '1': 120.00, // GOL
                        '2': 180.00, // COROLLA
                        '3': 110.00, // ONIX
                        '4': 150.00, // ECOSPORT
                        '5': 170.00  // TORO
                    };
                    
                    valorDiaria.value = veiculos[veiculoId] || 0;
                    
                    // Atualizar o valor total
                    atualizarValorTotal();
                } else {
                    valorDiaria.value = '';
                    valorTotal.value = '';
                }
            });
            
            // Quando mudar o tipo de locação, atualizar o valor total
            tipoLocacao.addEventListener('change', function() {
                atualizarValorTotal();
            });
            
            // Quando mudar a quantidade de diárias, atualizar o valor total
            quantidadeDiarias.addEventListener('change', function() {
                atualizarValorTotal();
            });
            
            // Função para atualizar o valor total
            function atualizarValorTotal() {
                const tipo = tipoLocacao.value;
                const diarias = parseFloat(quantidadeDiarias.value) || 0;
                const valorDiariaFloat = parseFloat(valorDiaria.value) || 0;
                
                let valorTotalFloat = 0;
                
                if (tipo === 'DIARIA') {
                    valorTotalFloat = valorDiariaFloat * diarias;
                } else if (tipo === 'SEMANAL') {
                    // Valor semanal com 5% de desconto
                    valorTotalFloat = valorDiariaFloat * 7 * 0.95 * (diarias / 7);
                } else if (tipo === 'MENSAL') {
                    // Valor mensal com 10% de desconto
                    valorTotalFloat = valorDiariaFloat * 30 * 0.90 * (diarias / 30);
                } else if (tipo === 'PERSONALIZADO') {
                    valorTotalFloat = valorDiariaFloat * diarias;
                }
                
                valorTotal.value = valorTotalFloat.toFixed(2);
            }
        }
        
        // Atualizar status de pagamento e valor pago
        const statusPagamento = document.getElementById('statusPagamento');
        const valorPago = document.getElementById('valorPago');
        
        if (statusPagamento && valorPago) {
            statusPagamento.addEventListener('change', function() {
                if (this.value === 'PAGO') {
                    valorPago.value = valorTotal.value;
                } else if (this.value === 'PENDENTE') {
                    valorPago.value = '0.00';
                }
            });
        }
        
        // Botões para buscar cliente, motorista e veículo
        const btnBuscarCliente = document.getElementById('btnBuscarCliente');
        const btnNovoCliente = document.getElementById('btnNovoCliente');
        const btnBuscarMotorista = document.getElementById('btnBuscarMotorista');
        const btnNovoMotorista = document.getElementById('btnNovoMotorista');
        const btnBuscarVeiculo = document.getElementById('btnBuscarVeiculo');
        
        if (btnBuscarCliente) {
            btnBuscarCliente.addEventListener('click', function() {
                // Em um ambiente real, isso abriria um modal de busca
                alert('Funcionalidade de busca avançada de cliente será implementada aqui.');
            });
        }
        
        if (btnNovoCliente) {
            btnNovoCliente.addEventListener('click', function() {
                window.location.href = '../clientes/cadastrar.html';
            });
        }
        
        if (btnBuscarMotorista) {
            btnBuscarMotorista.addEventListener('click', function() {
                // Em um ambiente real, isso abriria um modal de busca
                alert('Funcionalidade de busca avançada de motorista será implementada aqui.');
            });
        }
        
        if (btnNovoMotorista) {
            btnNovoMotorista.addEventListener('click', function() {
                window.location.href = '../motoristas/cadastrar.html';
            });
        }
        
        if (btnBuscarVeiculo) {
            btnBuscarVeiculo.addEventListener('click', function() {
                // Em um ambiente real, isso abriria um modal de busca
                alert('Funcionalidade de busca avançada de veículo será implementada aqui.');
            });
        }
        
        // Submissão do formulário
        locacaoForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            if (validateForm('locacaoForm')) {
                const locacaoData = getFormData('locacaoForm');
                
                // Em um ambiente real, isso seria uma chamada à API
                console.log('Dados da locação a serem enviados:', locacaoData);
                
                // Simulação de envio para a API
                setTimeout(function() {
                    showAlert('Locação cadastrada com sucesso!', 'success');
                    
                    // Redirecionar para a lista de locações após 2 segundos
                    setTimeout(function() {
                        window.location.href = 'listar.html';
                    }, 2000);
                }, 1000);
            }
        });
    }
    
    // Se estamos na página de listagem de locações
    const locacoesTable = document.getElementById('locacoesTable');
    if (locacoesTable) {
        // Carregar lista de locações
        carregarLocacoes();
        
        // Configurar eventos para os botões de ação
        document.addEventListener('click', function(event) {
            // Botão de visualizar
            if (event.target.classList.contains('btn-view') || 
                event.target.closest('.btn-view')) {
                const locacaoId = event.target.closest('tr').dataset.id;
                window.location.href = `visualizar.html?id=${locacaoId}`;
            }
            
            // Botão de editar
            if (event.target.classList.contains('btn-edit') || 
                event.target.closest('.btn-edit')) {
                const locacaoId = event.target.closest('tr').dataset.id;
                window.location.href = `editar.html?id=${locacaoId}`;
            }
            
            // Botão de devolver
            if (event.target.classList.contains('btn-return') || 
                event.target.closest('.btn-return')) {
                const locacaoId = event.target.closest('tr').dataset.id;
                window.location.href = `devolucao.html?id=${locacaoId}`;
            }
            
            // Botão de cancelar
            if (event.target.classList.contains('btn-cancel') || 
                event.target.closest('.btn-cancel')) {
                const locacaoId = event.target.closest('tr').dataset.id;
                const cliente = event.target.closest('tr').querySelector('td:nth-child(2)').textContent;
                
                confirmAction(`Deseja realmente cancelar a locação do cliente ${cliente}?`, function() {
                    // Em um ambiente real, isso seria uma chamada à API
                    console.log(`Cancelando locação ID: ${locacaoId}`);
                    
                    // Simulação de cancelamento
                    setTimeout(function() {
                        event.target.closest('tr').classList.add('table-danger');
                        event.target.closest('tr').querySelector('td:nth-child(6)').textContent = 'Cancelada';
                        showAlert('Locação cancelada com sucesso!', 'success');
                    }, 1000);
                });
            }
        });
    }
});

// Função para carregar clientes
function carregarClientes() {
    const clienteSelect = document.getElementById('cliente');
    
    if (!clienteSelect) return;
    
    // Limpar o select
    clienteSelect.innerHTML = '<option value="">Selecione...</option>';
    
    // Em um ambiente real, isso seria uma chamada à API
    // Por enquanto, usamos dados simulados
    setTimeout(function() {
        // Dados simulados de clientes
        const clientes = [
            { id: 1, nome: 'João da Silva' },
            { id: 2, nome: 'Empresa ABC Ltda' },
            { id: 3, nome: 'Maria Oliveira' },
            { id: 4, nome: 'Comércio XYZ Ltda' },
            { id: 5, nome: 'Pedro Santos' }
        ];
        
        // Adicionar os clientes ao select
        clientes.forEach(function(cliente) {
            const option = document.createElement('option');
            option.value = cliente.id;
            option.textContent = cliente.nome;
            clienteSelect.appendChild(option);
        });
    }, 500);
}

// Função para carregar motoristas
function carregarMotoristas() {
    const motoristaSelect = document.getElementById('motorista');
    
    if (!motoristaSelect) return;
    
    // Limpar o select
    motoristaSelect.innerHTML = '<option value="">Selecione...</option>';
    
    // Em um ambiente real, isso seria uma chamada à API
    // Por enquanto, usamos dados simulados
    setTimeout(function() {
        // Dados simulados de motoristas
        const motoristas = [
            { id: 1, nome: 'Carlos Oliveira' },
            { id: 2, nome: 'Ana Paula Silva' },
            { id: 3, nome: 'Roberto Santos' },
            { id: 4, nome: 'Fernanda Lima' },
            { id: 5, nome: 'Marcelo Costa' }
        ];
        
        // Adicionar os motoristas ao select
        motoristas.forEach(function(motorista) {
            const option = document.createElement('option');
            option.value = motorista.id;
            option.textContent = motorista.nome;
            motoristaSelect.appendChild(option);
        });
    }, 500);
}

// Função para carregar veículos disponíveis
function carregarVeiculosDisponiveis() {
    const veiculoSelect = document.getElementById('veiculo');
    
    if (!veiculoSelect) return;
    
    // Limpar o select
    veiculoSelect.innerHTML = '<option value="">Selecione...</option>';
    
    // Em um ambiente real, isso seria uma chamada à API
    // Por enquanto, usamos dados simulados
    setTimeout(function() {
        // Dados simulados de veículos disponíveis
        const veiculos = [
            { id: 1, placa: 'ABC-1234', modelo: 'GOL', marca: 'VOLKSWAGEN' },
            { id: 4, placa: 'JKL-3456', modelo: 'ECOSPORT', marca: 'FORD' },
            { id: 5, placa: 'MNO-7890', modelo: 'TORO', marca: 'FIAT' }
        ];
        
        // Adicionar os veículos ao select
        veiculos.forEach(function(veiculo) {
            const option = document.createElement('option');
            option.value = veiculo.id;
            option.textContent = `${veiculo.placa} - ${veiculo.marca} ${veiculo.modelo}`;
            veiculoSelect.appendChild(option);
        });
    }, 500);
}

// Função para carregar lista de locações
function carregarLocacoes() {
    const locacoesTableBody = document.querySelector('#locacoesTable tbody');
    
    if (!locacoesTableBody) return;
    
    // Limpar a tabela
    locacoesTableBody.innerHTML = '<tr><td colspan="8" class="text-center">Carregando...</td></tr>';
    
    // Em um ambiente real, isso seria uma chamada à API
    // Por enquanto, usamos dados simulados
    setTimeout(function() {
        // Dados simulados de locações
        const locacoes = [
            {
                id: 1,
                cliente: 'João da Silva',
                veiculo: 'VOLKSWAGEN GOL - ABC-1234',
                dataInicio: '2025-04-20',
                dataPrevista: '2025-04-25',
                status: 'ATIVA',
                valorTotal: 600.00
            },
            {
                id: 2,
                cliente: 'Empresa ABC Ltda',
                veiculo: 'TOYOTA COROLLA - DEF-5678',
                dataInicio: '2025-04-15',
                dataPrevista: '2025-04-30',
                status: 'ATIVA',
                valorTotal: 2700.00
            },
            {
                id: 3,
                cliente: 'Maria Oliveira',
                veiculo: 'CHEVROLET ONIX - GHI-9012',
                dataInicio: '2025-04-10',
                dataPrevista: '2025-04-17',
                status: 'FINALIZADA',
                valorTotal: 770.00
            },
            {
                id: 4,
                cliente: 'Comércio XYZ Ltda',
                veiculo: 'FORD ECOSPORT - JKL-3456',
                dataInicio: '2025-04-05',
                dataPrevista: '2025-05-05',
                status: 'ATIVA',
                valorTotal: 4500.00
            },
            {
                id: 5,
                cliente: 'Pedro Santos',
                veiculo: 'FIAT TORO - MNO-7890',
                dataInicio: '2025-04-01',
                dataPrevista: '2025-04-08',
                status: 'CANCELADA',
                valorTotal: 1190.00
            }
        ];
        
        // Limpar a tabela
        locacoesTableBody.innerHTML = '';
        
        // Adicionar as locações à tabela
        locacoes.forEach(function(locacao) {
            const tr = document.createElement('tr');
            tr.dataset.id = locacao.id;
            
            // Definir a classe da linha com base no status
            if (locacao.status === 'ATIVA') {
                tr.classList.add('table-success');
            } else if (locacao.status === 'FINALIZADA') {
                tr.classList.add('table-secondary');
            } else if (locacao.status === 'CANCELADA') {
                tr.classList.add('table-danger');
            }
            
            // Traduzir o status
            let statusText = locacao.status;
            if (locacao.status === 'ATIVA') statusText = 'Ativa';
            else if (locacao.status === 'FINALIZADA') statusText = 'Finalizada';
            else if (locacao.status === 'CANCELADA') statusText = 'Cancelada';
            else if (locacao.status === 'ATRASADA') statusText = 'Atrasada';
            
            // Formatar as datas
            const dataInicio = new Date(locacao.dataInicio).toLocaleDateString('pt-BR');
            const dataPrevista = new Date(locacao.dataPrevista).toLocaleDateString('pt-BR');
            
            tr.innerHTML = `
                <td>${locacao.id}</td>
                <td>${locacao.cliente}</td>
                <td>${locacao.veiculo}</td>
                <td>${dataInicio}</td>
                <td>${dataPrevista}</td>
                <td>${statusText}</td>
                <td>R$ ${locacao.valorTotal.toFixed(2)}</td>
                <td>
                    <button class="btn btn-sm btn-info btn-view" title="Visualizar">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn btn-sm btn-primary btn-edit" title="Editar">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-success btn-return" title="Devolver">
                        <i class="fas fa-undo"></i>
                    </button>
                    <button class="btn btn-sm btn-danger btn-cancel" title="Cancelar">
                        <i class="fas fa-times"></i>
                    </button>
                </td>
            `;
            
            locacoesTableBody.appendChild(tr);
        });
    }, 1000);
}
