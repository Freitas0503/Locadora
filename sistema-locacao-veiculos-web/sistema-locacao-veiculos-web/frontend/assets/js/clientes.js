// clientes.js - Scripts específicos para as páginas de clientes

document.addEventListener('DOMContentLoaded', function() {
    // Referência ao formulário de cliente
    const clienteForm = document.getElementById('clienteForm');
    
    // Se estamos na página de cadastro de clientes
    if (clienteForm) {
        // Elementos do formulário
        const tipoPF = document.getElementById('tipoPF');
        const tipoPJ = document.getElementById('tipoPJ');
        const divPessoaFisica = document.getElementById('divPessoaFisica');
        const divPessoaJuridica = document.getElementById('divPessoaJuridica');
        const labelDocumento = document.getElementById('labelDocumento');
        const documento = document.getElementById('documento');
        
        // Alternar entre Pessoa Física e Jurídica
        tipoPF.addEventListener('change', function() {
            if (this.checked) {
                divPessoaFisica.style.display = 'flex';
                divPessoaJuridica.style.display = 'none';
                labelDocumento.textContent = 'CPF*';
                documento.placeholder = '000.000.000-00';
                documento.value = '';
            }
        });
        
        tipoPJ.addEventListener('change', function() {
            if (this.checked) {
                divPessoaFisica.style.display = 'none';
                divPessoaJuridica.style.display = 'flex';
                labelDocumento.textContent = 'CNPJ*';
                documento.placeholder = '00.000.000/0000-00';
                documento.value = '';
            }
        });
        
        // Formatar CPF/CNPJ
        documento.addEventListener('blur', function() {
            const tipo = document.querySelector('input[name="tipo"]:checked').value;
            if (tipo === 'F') {
                this.value = formatDocument(this.value);
            } else {
                this.value = formatDocument(this.value);
            }
        });
        
        // Formatar telefone e celular
        const telefone = document.getElementById('telefone');
        const celular = document.getElementById('celular');
        
        if (telefone) {
            telefone.addEventListener('blur', function() {
                this.value = formatPhone(this.value);
            });
        }
        
        if (celular) {
            celular.addEventListener('blur', function() {
                this.value = formatPhone(this.value);
            });
        }
        
        // Buscar endereço pelo CEP
        const cep = document.getElementById('cep');
        if (cep) {
            cep.addEventListener('blur', function() {
                const cepValue = this.value.replace(/\D/g, '');
                if (cepValue.length === 8) {
                    buscarEnderecoPorCEP(cepValue);
                }
            });
        }
        
        // Submissão do formulário
        clienteForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Validar CPF/CNPJ
            const tipo = document.querySelector('input[name="tipo"]:checked').value;
            const docValue = documento.value.replace(/\D/g, '');
            
            if (tipo === 'F' && docValue.length > 0) {
                if (!validateCPF(docValue)) {
                    documento.setCustomValidity('CPF inválido');
                    documento.reportValidity();
                    return;
                } else {
                    documento.setCustomValidity('');
                }
            } else if (tipo === 'J' && docValue.length > 0) {
                if (!validateCNPJ(docValue)) {
                    documento.setCustomValidity('CNPJ inválido');
                    documento.reportValidity();
                    return;
                } else {
                    documento.setCustomValidity('');
                }
            }
            
            if (validateForm('clienteForm')) {
                const clienteData = getFormData('clienteForm');
                
                // Em um ambiente real, isso seria uma chamada à API
                console.log('Dados do cliente a serem enviados:', clienteData);
                
                // Simulação de envio para a API
                setTimeout(function() {
                    showAlert('Cliente cadastrado com sucesso!', 'success');
                    
                    // Redirecionar para a lista de clientes após 2 segundos
                    setTimeout(function() {
                        window.location.href = 'listar.html';
                    }, 2000);
                }, 1000);
            }
        });
    }
    
    // Se estamos na página de listagem de clientes
    const clientesTable = document.getElementById('clientesTable');
    if (clientesTable) {
        // Carregar lista de clientes
        carregarClientes();
        
        // Configurar eventos para os botões de ação
        document.addEventListener('click', function(event) {
            // Botão de editar
            if (event.target.classList.contains('btn-edit') || 
                event.target.closest('.btn-edit')) {
                const clienteId = event.target.closest('tr').dataset.id;
                window.location.href = `editar.html?id=${clienteId}`;
            }
            
            // Botão de excluir
            if (event.target.classList.contains('btn-delete') || 
                event.target.closest('.btn-delete')) {
                const clienteId = event.target.closest('tr').dataset.id;
                const nome = event.target.closest('tr').querySelector('td:nth-child(2)').textContent;
                
                confirmAction(`Deseja realmente excluir o cliente ${nome}?`, function() {
                    // Em um ambiente real, isso seria uma chamada à API
                    console.log(`Excluindo cliente ID: ${clienteId}`);
                    
                    // Simulação de exclusão
                    setTimeout(function() {
                        event.target.closest('tr').remove();
                        showAlert('Cliente excluído com sucesso!', 'success');
                    }, 1000);
                });
            }
        });
    }
});

// Função para buscar endereço pelo CEP
function buscarEnderecoPorCEP(cep) {
    // Em um ambiente real, isso seria uma chamada à API de CEP
    // Por enquanto, usamos dados simulados
    
    // Simulação de busca de CEP
    const endereco = document.getElementById('endereco');
    const bairro = document.getElementById('bairro');
    const cidade = document.getElementById('cidade');
    const estado = document.getElementById('estado');
    
    // Indicar que está buscando
    endereco.value = 'Buscando...';
    bairro.value = '';
    cidade.value = '';
    estado.value = '';
    
    // Simulação de delay de rede
    setTimeout(function() {
        // Dados simulados para alguns CEPs
        const ceps = {
            '01001000': {
                logradouro: 'Praça da Sé',
                bairro: 'Sé',
                cidade: 'São Paulo',
                estado: 'SP'
            },
            '20010000': {
                logradouro: 'Avenida Rio Branco',
                bairro: 'Centro',
                cidade: 'Rio de Janeiro',
                estado: 'RJ'
            },
            '70070900': {
                logradouro: 'Esplanada dos Ministérios',
                bairro: 'Zona Cívico-Administrativa',
                cidade: 'Brasília',
                estado: 'DF'
            }
        };
        
        if (ceps[cep]) {
            endereco.value = ceps[cep].logradouro;
            bairro.value = ceps[cep].bairro;
            cidade.value = ceps[cep].cidade;
            estado.value = ceps[cep].estado;
            
            // Focar no campo número
            document.getElementById('numero').focus();
        } else {
            endereco.value = '';
            showAlert('CEP não encontrado', 'warning');
        }
    }, 1000);
}

// Função para carregar lista de clientes
function carregarClientes() {
    const clientesTableBody = document.querySelector('#clientesTable tbody');
    
    if (!clientesTableBody) return;
    
    // Limpar a tabela
    clientesTableBody.innerHTML = '<tr><td colspan="7" class="text-center">Carregando...</td></tr>';
    
    // Em um ambiente real, isso seria uma chamada à API
    // Por enquanto, usamos dados simulados
    setTimeout(function() {
        // Dados simulados de clientes
        const clientes = [
            {
                id: 1,
                tipo: 'F',
                nome: 'João da Silva',
                documento: '123.456.789-00',
                email: 'joao.silva@email.com',
                telefone: '(11) 98765-4321',
                ativo: true
            },
            {
                id: 2,
                tipo: 'J',
                nome: 'Empresa ABC Ltda',
                documento: '12.345.678/0001-90',
                email: 'contato@empresaabc.com.br',
                telefone: '(11) 3456-7890',
                ativo: true
            },
            {
                id: 3,
                tipo: 'F',
                nome: 'Maria Oliveira',
                documento: '987.654.321-00',
                email: 'maria.oliveira@email.com',
                telefone: '(11) 91234-5678',
                ativo: true
            },
            {
                id: 4,
                tipo: 'J',
                nome: 'Comércio XYZ Ltda',
                documento: '98.765.432/0001-10',
                email: 'contato@comercioxyz.com.br',
                telefone: '(11) 2345-6789',
                ativo: false
            },
            {
                id: 5,
                tipo: 'F',
                nome: 'Pedro Santos',
                documento: '456.789.123-00',
                email: 'pedro.santos@email.com',
                telefone: '(11) 97654-3210',
                ativo: true
            }
        ];
        
        // Limpar a tabela
        clientesTableBody.innerHTML = '';
        
        // Adicionar os clientes à tabela
        clientes.forEach(function(cliente) {
            const tr = document.createElement('tr');
            tr.dataset.id = cliente.id;
            
            // Definir a classe da linha com base no status
            if (!cliente.ativo) {
                tr.classList.add('table-secondary');
            }
            
            // Traduzir o tipo
            let tipoText = cliente.tipo === 'F' ? 'Pessoa Física' : 'Pessoa Jurídica';
            
            tr.innerHTML = `
                <td>${cliente.id}</td>
                <td>${cliente.nome}</td>
                <td>${tipoText}</td>
                <td>${cliente.documento}</td>
                <td>${cliente.email || '-'}</td>
                <td>${cliente.telefone || '-'}</td>
                <td>
                    <button class="btn btn-sm btn-primary btn-edit" title="Editar">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-danger btn-delete" title="Excluir">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            
            clientesTableBody.appendChild(tr);
        });
    }, 1000);
}
