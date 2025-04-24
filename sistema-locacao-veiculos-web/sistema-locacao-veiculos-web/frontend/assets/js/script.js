// script.js - Funções gerais para o Sistema de Controle de Locação de Veículos

document.addEventListener('DOMContentLoaded', function() {
    // Toggle do sidebar
    document.getElementById('sidebarCollapse').addEventListener('click', function() {
        document.getElementById('sidebar').classList.toggle('active');
        document.getElementById('content').classList.toggle('active');
    });

    // Inicializar tooltips do Bootstrap
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Inicializar popovers do Bootstrap
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    var popoverList = popoverTriggerList.map(function(popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });

    // Função para formatar valores monetários
    window.formatCurrency = function(value) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    };

    // Função para formatar datas
    window.formatDate = function(dateString) {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('pt-BR', options);
    };

    // Função para formatar CPF/CNPJ
    window.formatDocument = function(doc) {
        if (!doc) return '';
        
        // Remove caracteres não numéricos
        doc = doc.replace(/\D/g, '');
        
        if (doc.length === 11) {
            // CPF
            return doc.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
        } else if (doc.length === 14) {
            // CNPJ
            return doc.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
        }
        
        return doc;
    };

    // Função para formatar telefone/celular
    window.formatPhone = function(phone) {
        if (!phone) return '';
        
        // Remove caracteres não numéricos
        phone = phone.replace(/\D/g, '');
        
        if (phone.length === 11) {
            // Celular com DDD
            return phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        } else if (phone.length === 10) {
            // Telefone fixo com DDD
            return phone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
        }
        
        return phone;
    };

    // Função para formatar placa de veículo
    window.formatLicensePlate = function(plate) {
        if (!plate) return '';
        
        // Remove espaços e caracteres especiais
        plate = plate.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
        
        if (plate.length === 7) {
            // Formato antigo: ABC1234
            if (/^[A-Z]{3}\d{4}$/.test(plate)) {
                return plate.replace(/([A-Z]{3})(\d{4})/, '$1-$2');
            }
            // Formato Mercosul: ABC1D23
            else if (/^[A-Z]{3}\d[A-Z]\d{2}$/.test(plate)) {
                return plate.replace(/([A-Z]{3})(\d[A-Z]\d{2})/, '$1-$2');
            }
        }
        
        return plate;
    };

    // Função para validar CPF
    window.validateCPF = function(cpf) {
        cpf = cpf.replace(/\D/g, '');
        
        if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
        
        let sum = 0;
        let remainder;
        
        for (let i = 1; i <= 9; i++) {
            sum += parseInt(cpf.substring(i-1, i)) * (11 - i);
        }
        
        remainder = (sum * 10) % 11;
        if (remainder === 10 || remainder === 11) remainder = 0;
        if (remainder !== parseInt(cpf.substring(9, 10))) return false;
        
        sum = 0;
        for (let i = 1; i <= 10; i++) {
            sum += parseInt(cpf.substring(i-1, i)) * (12 - i);
        }
        
        remainder = (sum * 10) % 11;
        if (remainder === 10 || remainder === 11) remainder = 0;
        if (remainder !== parseInt(cpf.substring(10, 11))) return false;
        
        return true;
    };

    // Função para validar CNPJ
    window.validateCNPJ = function(cnpj) {
        cnpj = cnpj.replace(/\D/g, '');
        
        if (cnpj.length !== 14 || /^(\d)\1{13}$/.test(cnpj)) return false;
        
        let size = cnpj.length - 2;
        let numbers = cnpj.substring(0, size);
        let digits = cnpj.substring(size);
        let sum = 0;
        let pos = size - 7;
        
        for (let i = size; i >= 1; i--) {
            sum += numbers.charAt(size - i) * pos--;
            if (pos < 2) pos = 9;
        }
        
        let result = sum % 11 < 2 ? 0 : 11 - sum % 11;
        if (result !== parseInt(digits.charAt(0))) return false;
        
        size = size + 1;
        numbers = cnpj.substring(0, size);
        sum = 0;
        pos = size - 7;
        
        for (let i = size; i >= 1; i--) {
            sum += numbers.charAt(size - i) * pos--;
            if (pos < 2) pos = 9;
        }
        
        result = sum % 11 < 2 ? 0 : 11 - sum % 11;
        if (result !== parseInt(digits.charAt(1))) return false;
        
        return true;
    };

    // Função para mostrar mensagens de alerta
    window.showAlert = function(message, type = 'success') {
        const alertPlaceholder = document.getElementById('alertPlaceholder') || document.createElement('div');
        
        if (!document.getElementById('alertPlaceholder')) {
            alertPlaceholder.id = 'alertPlaceholder';
            alertPlaceholder.className = 'position-fixed top-0 end-0 p-3';
            document.body.appendChild(alertPlaceholder);
        }
        
        const wrapper = document.createElement('div');
        wrapper.innerHTML = `
            <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;
        
        alertPlaceholder.appendChild(wrapper);
        
        // Auto-remover após 5 segundos
        setTimeout(() => {
            const alert = wrapper.querySelector('.alert');
            if (alert) {
                const bsAlert = new bootstrap.Alert(alert);
                bsAlert.close();
            }
        }, 5000);
    };

    // Função para confirmar ações
    window.confirmAction = function(message, callback) {
        if (confirm(message)) {
            callback();
        }
    };

    // Função para fazer requisições AJAX
    window.makeRequest = function(url, method = 'GET', data = null) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(method, url);
            xhr.setRequestHeader('Content-Type', 'application/json');
            
            xhr.onload = function() {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(JSON.parse(xhr.responseText));
                } else {
                    reject({
                        status: xhr.status,
                        statusText: xhr.statusText,
                        response: xhr.responseText
                    });
                }
            };
            
            xhr.onerror = function() {
                reject({
                    status: xhr.status,
                    statusText: xhr.statusText,
                    response: xhr.responseText
                });
            };
            
            if (data) {
                xhr.send(JSON.stringify(data));
            } else {
                xhr.send();
            }
        });
    };

    // Função para obter parâmetros da URL
    window.getUrlParameter = function(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        const results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    // Função para preencher um formulário com dados de um objeto
    window.fillFormWithData = function(formId, data) {
        const form = document.getElementById(formId);
        if (!form) return;
        
        Object.keys(data).forEach(key => {
            const input = form.elements[key];
            if (input) {
                if (input.type === 'checkbox') {
                    input.checked = data[key];
                } else if (input.type === 'radio') {
                    const radio = form.querySelector(`input[name="${key}"][value="${data[key]}"]`);
                    if (radio) radio.checked = true;
                } else if (input.tagName === 'SELECT') {
                    input.value = data[key];
                } else {
                    input.value = data[key];
                }
            }
        });
    };

    // Função para obter dados de um formulário como objeto
    window.getFormData = function(formId) {
        const form = document.getElementById(formId);
        if (!form) return {};
        
        const formData = new FormData(form);
        const data = {};
        
        for (let [key, value] of formData.entries()) {
            const input = form.elements[key];
            
            if (input.type === 'checkbox') {
                data[key] = input.checked;
            } else if (input.type === 'number') {
                data[key] = value === '' ? null : Number(value);
            } else {
                data[key] = value;
            }
        }
        
        return data;
    };

    // Função para validar um formulário
    window.validateForm = function(formId) {
        const form = document.getElementById(formId);
        if (!form) return true;
        
        // Adiciona a classe 'was-validated' para ativar a validação visual do Bootstrap
        form.classList.add('was-validated');
        
        // Verifica se o formulário é válido
        return form.checkValidity();
    };
});
