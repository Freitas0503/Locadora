// veiculos.js - Scripts específicos para as páginas de veículos

document.addEventListener('DOMContentLoaded', function() {
    // Referência ao formulário de veículo
    const veiculoForm = document.getElementById('veiculoForm');
    
    // Se estamos na página de cadastro de veículos
    if (veiculoForm) {
        // Carregar modelos quando a marca for selecionada
        const marcaSelect = document.getElementById('marca');
        const modeloSelect = document.getElementById('modelo');
        const categoriaSelect = document.getElementById('categoria');
        
        if (marcaSelect && modeloSelect) {
            marcaSelect.addEventListener('change', function() {
                const marcaId = this.value;
                if (marcaId) {
                    // Em um ambiente real, isso seria uma chamada à API
                    // Por enquanto, usamos dados simulados
                    carregarModelosPorMarca(marcaId);
                } else {
                    // Limpar o select de modelos
                    modeloSelect.innerHTML = '<option value="">Selecione a marca primeiro...</option>';
                    modeloSelect.disabled = true;
                    
                    // Limpar e desabilitar o select de categorias
                    categoriaSelect.innerHTML = '<option value="">Selecione o modelo primeiro...</option>';
                    categoriaSelect.disabled = true;
                }
            });
            
            modeloSelect.addEventListener('change', function() {
                const modeloId = this.value;
                if (modeloId) {
                    // Em um ambiente real, isso seria uma chamada à API
                    // Por enquanto, usamos dados simulados
                    carregarCategoriaPorModelo(modeloId);
                } else {
                    // Limpar e desabilitar o select de categorias
                    categoriaSelect.innerHTML = '<option value="">Selecione o modelo primeiro...</option>';
                    categoriaSelect.disabled = true;
                }
            });
        }
        
        // Calcular valores semanais e mensais com base na diária
        const valorDiariaInput = document.getElementById('valorDiaria');
        const valorSemanalInput = document.getElementById('valorSemanal');
        const valorMensalInput = document.getElementById('valorMensal');
        
        if (valorDiariaInput && valorSemanalInput && valorMensalInput) {
            valorDiariaInput.addEventListener('input', function() {
                const valorDiaria = parseFloat(this.value) || 0;
                
                // Valor semanal com 5% de desconto
                const valorSemanal = valorDiaria * 7 * 0.95;
                valorSemanalInput.value = valorSemanal.toFixed(2);
                
                // Valor mensal com 10% de desconto
                const valorMensal = valorDiaria * 30 * 0.90;
                valorMensalInput.value = valorMensal.toFixed(2);
            });
        }
        
        // Formatar a placa do veículo
        const placaInput = document.getElementById('placa');
        if (placaInput) {
            placaInput.addEventListener('blur', function() {
                this.value = formatLicensePlate(this.value);
            });
        }
        
        // Submissão do formulário
        veiculoForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            if (validateForm('veiculoForm')) {
                const veiculoData = getFormData('veiculoForm');
                
                // Em um ambiente real, isso seria uma chamada à API
                console.log('Dados do veículo a serem enviados:', veiculoData);
                
                // Simulação de envio para a API
                setTimeout(function() {
                    showAlert('Veículo cadastrado com sucesso!', 'success');
                    
                    // Redirecionar para a lista de veículos após 2 segundos
                    setTimeout(function() {
                        window.location.href = 'listar.html';
                    }, 2000);
                }, 1000);
            }
        });
    }
    
    // Se estamos na página de listagem de veículos
    const veiculosTable = document.getElementById('veiculosTable');
    if (veiculosTable) {
        // Carregar lista de veículos
        carregarVeiculos();
        
        // Configurar eventos para os botões de ação
        document.addEventListener('click', function(event) {
            // Botão de editar
            if (event.target.classList.contains('btn-edit') || 
                event.target.closest('.btn-edit')) {
                const veiculoId = event.target.closest('tr').dataset.id;
                window.location.href = `editar.html?id=${veiculoId}`;
            }
            
            // Botão de excluir
            if (event.target.classList.contains('btn-delete') || 
                event.target.closest('.btn-delete')) {
                const veiculoId = event.target.closest('tr').dataset.id;
                const placa = event.target.closest('tr').querySelector('td:nth-child(2)').textContent;
                
                confirmAction(`Deseja realmente excluir o veículo ${placa}?`, function() {
                    // Em um ambiente real, isso seria uma chamada à API
                    console.log(`Excluindo veículo ID: ${veiculoId}`);
                    
                    // Simulação de exclusão
                    setTimeout(function() {
                        event.target.closest('tr').remove();
                        showAlert('Veículo excluído com sucesso!', 'success');
                    }, 1000);
                });
            }
        });
    }
});

// Função para carregar modelos por marca
function carregarModelosPorMarca(marcaId) {
    const modeloSelect = document.getElementById('modelo');
    
    // Limpar o select de modelos
    modeloSelect.innerHTML = '<option value="">Carregando...</option>';
    modeloSelect.disabled = true;
    
    // Em um ambiente real, isso seria uma chamada à API
    // Por enquanto, usamos dados simulados
    setTimeout(function() {
        modeloSelect.innerHTML = '<option value="">Selecione...</option>';
        
        // Dados simulados de modelos por marca
        const modelos = {
            '1': [ // VOLKSWAGEN
                {id: 1, nome: 'GOL'},
                {id: 2, nome: 'VIRTUS'},
                {id: 3, nome: 'T-CROSS'},
                {id: 4, nome: 'AMAROK'}
            ],
            '2': [ // FIAT
                {id: 5, nome: 'ARGO'},
                {id: 6, nome: 'CRONOS'},
                {id: 7, nome: 'PULSE'},
                {id: 8, nome: 'TORO'}
            ],
            '3': [ // CHEVROLET
                {id: 9, nome: 'ONIX'},
                {id: 10, nome: 'CRUZE'},
                {id: 11, nome: 'TRACKER'},
                {id: 12, nome: 'S10'}
            ],
            '4': [ // FORD
                {id: 13, nome: 'KA'},
                {id: 14, nome: 'FUSION'},
                {id: 15, nome: 'ECOSPORT'},
                {id: 16, nome: 'RANGER'}
            ],
            '5': [ // TOYOTA
                {id: 17, nome: 'ETIOS'},
                {id: 18, nome: 'COROLLA'},
                {id: 19, nome: 'RAV4'},
                {id: 20, nome: 'HILUX'}
            ]
        };
        
        // Adicionar opções ao select
        if (modelos[marcaId]) {
            modelos[marcaId].forEach(function(modelo) {
                const option = document.createElement('option');
                option.value = modelo.id;
                option.textContent = modelo.nome;
                modeloSelect.appendChild(option);
            });
        }
        
        modeloSelect.disabled = false;
    }, 500);
}

// Função para carregar categoria por modelo
function carregarCategoriaPorModelo(modeloId) {
    const categoriaSelect = document.getElementById('categoria');
    
    // Limpar o select de categorias
    categoriaSelect.innerHTML = '<option value="">Carregando...</option>';
    categoriaSelect.disabled = true;
    
    // Em um ambiente real, isso seria uma chamada à API
    // Por enquanto, usamos dados simulados
    setTimeout(function() {
        // Dados simulados de categorias por modelo
        const categorias = {
            '1': {id: 1, nome: 'HATCH'}, // GOL
            '2': {id: 2, nome: 'SEDAN'}, // VIRTUS
            '3': {id: 3, nome: 'SUV'}, // T-CROSS
            '4': {id: 4, nome: 'PICKUP'}, // AMAROK
            '5': {id: 1, nome: 'HATCH'}, // ARGO
            '6': {id: 2, nome: 'SEDAN'}, // CRONOS
            '7': {id: 3, nome: 'SUV'}, // PULSE
            '8': {id: 4, nome: 'PICKUP'}, // TORO
            '9': {id: 1, nome: 'HATCH'}, // ONIX
            '10': {id: 2, nome: 'SEDAN'}, // CRUZE
            '11': {id: 3, nome: 'SUV'}, // TRACKER
            '12': {id: 4, nome: 'PICKUP'}, // S10
            '13': {id: 1, nome: 'HATCH'}, // KA
            '14': {id: 2, nome: 'SEDAN'}, // FUSION
            '15': {id: 3, nome: 'SUV'}, // ECOSPORT
            '16': {id: 4, nome: 'PICKUP'}, // RANGER
            '17': {id: 1, nome: 'HATCH'}, // ETIOS
            '18': {id: 2, nome: 'SEDAN'}, // COROLLA
            '19': {id: 3, nome: 'SUV'}, // RAV4
            '20': {id: 4, nome: 'PICKUP'} // HILUX
        };
        
        // Definir a categoria com base no modelo
        if (categorias[modeloId]) {
            categoriaSelect.innerHTML = '';
            const option = document.createElement('option');
            option.value = categorias[modeloId].id;
            option.textContent = categorias[modeloId].nome;
            categoriaSelect.appendChild(option);
            categoriaSelect.value = categorias[modeloId].id;
        } else {
            categoriaSelect.innerHTML = '<option value="">Categoria não encontrada</option>';
        }
        
        categoriaSelect.disabled = true; // Mantém desabilitado pois é determinado pelo modelo
    }, 500);
}

// Função para carregar lista de veículos
function carregarVeiculos() {
    const veiculosTableBody = document.querySelector('#veiculosTable tbody');
    
    if (!veiculosTableBody) return;
    
    // Limpar a tabela
    veiculosTableBody.innerHTML = '<tr><td colspan="8" class="text-center">Carregando...</td></tr>';
    
    // Em um ambiente real, isso seria uma chamada à API
    // Por enquanto, usamos dados simulados
    setTimeout(function() {
        // Dados simulados de veículos
        const veiculos = [
            {
                id: 1,
                placa: 'ABC-1234',
                modelo: 'GOL',
                marca: 'VOLKSWAGEN',
                ano: '2020/2021',
                cor: 'BRANCO',
                status: 'DISPONIVEL',
                valorDiaria: 120.00
            },
            {
                id: 2,
                placa: 'DEF-5678',
                modelo: 'COROLLA',
                marca: 'TOYOTA',
                ano: '2021/2022',
                cor: 'PRETO',
                status: 'ALUGADO',
                valorDiaria: 180.00
            },
            {
                id: 3,
                placa: 'GHI-9012',
                modelo: 'ONIX',
                marca: 'CHEVROLET',
                ano: '2019/2020',
                cor: 'PRATA',
                status: 'MANUTENCAO',
                valorDiaria: 110.00
            },
            {
                id: 4,
                placa: 'JKL-3456',
                modelo: 'ECOSPORT',
                marca: 'FORD',
                ano: '2020/2021',
                cor: 'VERMELHO',
                status: 'DISPONIVEL',
                valorDiaria: 150.00
            },
            {
                id: 5,
                placa: 'MNO-7890',
                modelo: 'TORO',
                marca: 'FIAT',
                ano: '2022/2023',
                cor: 'BRANCO',
                status: 'DISPONIVEL',
                valorDiaria: 170.00
            }
        ];
        
        // Limpar a tabela
        veiculosTableBody.innerHTML = '';
        
        // Adicionar os veículos à tabela
        veiculos.forEach(function(veiculo) {
            const tr = document.createElement('tr');
            tr.dataset.id = veiculo.id;
            
            // Definir a classe da linha com base no status
            if (veiculo.status === 'ALUGADO') {
                tr.classList.add('table-success');
            } else if (veiculo.status === 'MANUTENCAO') {
                tr.classList.add('table-warning');
            } else if (veiculo.status === 'INATIVO') {
                tr.classList.add('table-secondary');
            }
            
            // Traduzir o status
            let statusText = veiculo.status;
            if (veiculo.status === 'DISPONIVEL') statusText = 'Disponível';
            else if (veiculo.status === 'ALUGADO') statusText = 'Alugado';
            else if (veiculo.status === 'MANUTENCAO') statusText = 'Em Manutenção';
            else if (veiculo.status === 'INATIVO') statusText = 'Inativo';
            else if (veiculo.status === 'VENDIDO') statusText = 'Vendido';
            
            tr.innerHTML = `
                <td>${veiculo.id}</td>
                <td>${veiculo.placa}</td>
                <td>${veiculo.marca} ${veiculo.modelo}</td>
                <td>${veiculo.ano}</td>
                <td>${veiculo.cor}</td>
                <td>${statusText}</td>
                <td>R$ ${veiculo.valorDiaria.toFixed(2)}</td>
                <td>
                    <button class="btn btn-sm btn-primary btn-edit" title="Editar">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-danger btn-delete" title="Excluir">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            
            veiculosTableBody.appendChild(tr);
        });
    }, 1000);
}
