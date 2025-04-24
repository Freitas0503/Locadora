package com.locadora.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VeiculoDTO {

    private Long id;
    
    @NotBlank(message = "A placa é obrigatória")
    @Size(max = 10, message = "A placa deve ter no máximo 10 caracteres")
    private String placa;
    
    @NotBlank(message = "O RENAVAM é obrigatório")
    @Size(max = 30, message = "O RENAVAM deve ter no máximo 30 caracteres")
    private String renavam;
    
    @NotBlank(message = "O chassi é obrigatório")
    @Size(max = 30, message = "O chassi deve ter no máximo 30 caracteres")
    private String chassi;
    
    @NotNull(message = "O modelo é obrigatório")
    private Long modeloId;
    
    @NotNull(message = "O ano de fabricação é obrigatório")
    private Integer anoFabricacao;
    
    @NotNull(message = "O ano do modelo é obrigatório")
    private Integer anoModelo;
    
    @NotBlank(message = "A cor é obrigatória")
    @Size(max = 30, message = "A cor deve ter no máximo 30 caracteres")
    private String cor;
    
    @NotBlank(message = "O combustível é obrigatório")
    @Size(max = 20, message = "O combustível deve ter no máximo 20 caracteres")
    private String combustivel;
    
    @NotNull(message = "A quilometragem é obrigatória")
    private Integer quilometragem;
    
    @NotNull(message = "A capacidade de passageiros é obrigatória")
    private Integer capacidadePassageiros;
    
    @Size(max = 30, message = "A capacidade do bagageiro deve ter no máximo 30 caracteres")
    private String capacidadeBagageiro;
    
    private Boolean arCondicionado;
    
    private Boolean direcaoHidraulica;
    
    private Boolean cambioAutomatico;
    
    private Boolean vidroEletrico;
    
    private Boolean travaEletrica;
    
    private Boolean alarme;
    
    private Boolean som;
    
    private Boolean airbag;
    
    private Boolean abs;
    
    private BigDecimal valorCompra;
    
    private String dataCompra;
    
    private BigDecimal valorVenda;
    
    private String dataVenda;
    
    @NotNull(message = "O valor da diária é obrigatório")
    private BigDecimal valorDiaria;
    
    private BigDecimal valorSemanal;
    
    private BigDecimal valorMensal;
    
    @NotBlank(message = "O status é obrigatório")
    @Size(max = 20, message = "O status deve ter no máximo 20 caracteres")
    private String status;
    
    private String observacoes;
}
