package com.locadora.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "motoristas")
@EntityListeners(AuditingEntityListener.class)
public class Motorista {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "cliente_id")
    private Cliente cliente;

    @Column(nullable = false, length = 100)
    private String nome;

    @Column(nullable = false, length = 14, unique = true)
    private String cpf;

    @Column(length = 20)
    private String rg;

    @Column(name = "data_nascimento", nullable = false)
    private LocalDate dataNascimento;

    @Column(nullable = false, length = 20, unique = true)
    private String cnh;

    @Column(name = "categoria_cnh", nullable = false, length = 5)
    private String categoriaCnh;

    @Column(name = "validade_cnh", nullable = false)
    private LocalDate validadeCnh;

    @Column(name = "foto_cnh", length = 255)
    private String fotoCnh;

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

    @Column(nullable = false, length = 20)
    private String celular;

    @Column(length = 100)
    private String email;

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
