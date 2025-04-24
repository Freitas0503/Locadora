package com.locadora.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "veiculos")
@EntityListeners(AuditingEntityListener.class)
public class Veiculo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 10, unique = true)
    private String placa;

    @Column(nullable = false, length = 30, unique = true)
    private String renavam;

    @Column(nullable = false, length = 30, unique = true)
    private String chassi;

    @ManyToOne
    @JoinColumn(name = "modelo_id")
    private ModeloVeiculo modelo;

    @Column(name = "ano_fabricacao", nullable = false)
    private Integer anoFabricacao;

    @Column(name = "ano_modelo", nullable = false)
    private Integer anoModelo;

    @Column(nullable = false, length = 30)
    private String cor;

    @Column(nullable = false, length = 20)
    private String combustivel;

    @Column(nullable = false)
    private Integer quilometragem = 0;

    @Column(name = "capacidade_passageiros", nullable = false)
    private Integer capacidadePassageiros;

    @Column(name = "capacidade_bagageiro", length = 30)
    private String capacidadeBagageiro;

    @Column(name = "ar_condicionado")
    private Boolean arCondicionado = false;

    @Column(name = "direcao_hidraulica")
    private Boolean direcaoHidraulica = false;

    @Column(name = "cambio_automatico")
    private Boolean cambioAutomatico = false;

    @Column(name = "vidro_eletrico")
    private Boolean vidroEletrico = false;

    @Column(name = "trava_eletrica")
    private Boolean travaEletrica = false;

    @Column
    private Boolean alarme = false;

    @Column
    private Boolean som = false;

    @Column
    private Boolean airbag = false;

    @Column
    private Boolean abs = false;

    @Column(name = "valor_compra", precision = 10, scale = 2)
    private BigDecimal valorCompra;

    @Column(name = "data_compra")
    private LocalDate dataCompra;

    @Column(name = "valor_venda", precision = 10, scale = 2)
    private BigDecimal valorVenda;

    @Column(name = "data_venda")
    private LocalDate dataVenda;

    @Column(name = "valor_diaria", nullable = false, precision = 10, scale = 2)
    private BigDecimal valorDiaria;

    @Column(name = "valor_semanal", precision = 10, scale = 2)
    private BigDecimal valorSemanal;

    @Column(name = "valor_mensal", precision = 10, scale = 2)
    private BigDecimal valorMensal;

    @Column(nullable = false, length = 20)
    private String status;

    @Column
    private String observacoes;

    @Column(name = "data_cadastro", nullable = false, updatable = false)
    @CreatedDate
    private LocalDateTime dataCadastro;

    @Column(name = "ultima_atualizacao", nullable = false)
    @LastModifiedDate
    private LocalDateTime ultimaAtualizacao;
}
