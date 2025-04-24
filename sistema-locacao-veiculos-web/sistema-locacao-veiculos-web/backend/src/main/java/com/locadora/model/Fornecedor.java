package com.locadora.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "fornecedores")
@EntityListeners(AuditingEntityListener.class)
public class Fornecedor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "razao_social", nullable = false, length = 100)
    private String razaoSocial;

    @Column(name = "nome_fantasia", length = 100)
    private String nomeFantasia;

    @Column(nullable = false, length = 20, unique = true)
    private String cnpj;

    @Column(name = "inscricao_estadual", length = 20)
    private String inscricaoEstadual;

    @Column(length = 150)
    private String endereco;

    @Column(length = 10)
    private String numero;

    @Column(length = 50)
    private String complemento;

    @Column(length = 50)
    private String bairro;

    @Column(length = 50)
    private String cidade;

    @Column(length = 2)
    private String estado;

    @Column(length = 10)
    private String cep;

    @Column(length = 20)
    private String telefone;

    @Column(length = 20)
    private String celular;

    @Column(length = 100)
    private String email;

    @Column(length = 100)
    private String contato;

    @Column(name = "tipo_servico", length = 100)
    private String tipoServico;

    @Column
    private String observacoes;

    @Column(nullable = false)
    private Boolean ativo = true;

    @Column(name = "data_cadastro", nullable = false, updatable = false)
    @CreatedDate
    private LocalDateTime dataCadastro;

    @Column(name = "ultima_atualizacao", nullable = false)
    @LastModifiedDate
    private LocalDateTime ultimaAtualizacao;
}
