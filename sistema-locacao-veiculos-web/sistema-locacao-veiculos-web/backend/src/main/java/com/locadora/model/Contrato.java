package com.locadora.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "contratos")
@EntityListeners(AuditingEntityListener.class)
public class Contrato {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 20, unique = true)
    private String numero;

    @ManyToOne
    @JoinColumn(name = "cliente_id")
    private Cliente cliente;

    @ManyToOne
    @JoinColumn(name = "veiculo_id")
    private Veiculo veiculo;

    @ManyToOne
    @JoinColumn(name = "motorista_id")
    private Motorista motorista;

    @Column(name = "data_inicio", nullable = false)
    private LocalDateTime dataInicio;

    @Column(name = "data_fim_previsto", nullable = false)
    private LocalDateTime dataFimPrevisto;

    @Column(name = "data_fim_efetivo")
    private LocalDateTime dataFimEfetivo;

    @Column(name = "quilometragem_inicial", nullable = false)
    private Integer quilometragemInicial;

    @Column(name = "quilometragem_final")
    private Integer quilometragemFinal;

    @Column(name = "valor_diaria", nullable = false, precision = 10, scale = 2)
    private BigDecimal valorDiaria;

    @Column(name = "valor_total_previsto", nullable = false, precision = 10, scale = 2)
    private BigDecimal valorTotalPrevisto;

    @Column(name = "valor_total_efetivo", precision = 10, scale = 2)
    private BigDecimal valorTotalEfetivo;

    @Column(name = "valor_caucao", precision = 10, scale = 2)
    private BigDecimal valorCaucao;

    @Column(name = "forma_pagamento", nullable = false, length = 30)
    private String formaPagamento;

    @Column(nullable = false, length = 20)
    private String status;

    @Column
    private String observacoes;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    @Column(name = "data_cadastro", nullable = false, updatable = false)
    @CreatedDate
    private LocalDateTime dataCadastro;

    @Column(name = "ultima_atualizacao", nullable = false)
    @LastModifiedDate
    private LocalDateTime ultimaAtualizacao;
}
