package com.locadora.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClienteDTO {

    private Long id;
    
    @NotBlank(message = "O tipo é obrigatório")
    @Pattern(regexp = "[FJ]", message = "O tipo deve ser F (Física) ou J (Jurídica)")
    private String tipo;
    
    @NotBlank(message = "O nome é obrigatório")
    @Size(min = 3, max = 100, message = "O nome deve ter entre 3 e 100 caracteres")
    private String nome;
    
    @NotBlank(message = "O documento é obrigatório")
    @Size(max = 20, message = "O documento deve ter no máximo 20 caracteres")
    private String documento;
    
    @Size(max = 100, message = "O email deve ter no máximo 100 caracteres")
    private String email;
    
    @Size(max = 20, message = "O telefone deve ter no máximo 20 caracteres")
    private String telefone;
    
    @Size(max = 20, message = "O celular deve ter no máximo 20 caracteres")
    private String celular;
    
    private LocalDate dataNascimento;
    
    @Size(max = 150, message = "O endereço deve ter no máximo 150 caracteres")
    private String endereco;
    
    @Size(max = 10, message = "O número deve ter no máximo 10 caracteres")
    private String numero;
    
    @Size(max = 50, message = "O complemento deve ter no máximo 50 caracteres")
    private String complemento;
    
    @Size(max = 50, message = "O bairro deve ter no máximo 50 caracteres")
    private String bairro;
    
    @Size(max = 50, message = "A cidade deve ter no máximo 50 caracteres")
    private String cidade;
    
    @Size(max = 2, message = "O estado deve ter 2 caracteres")
    private String estado;
    
    @Size(max = 10, message = "O CEP deve ter no máximo 10 caracteres")
    private String cep;
    
    private String observacoes;
    
    @NotNull(message = "O status ativo é obrigatório")
    private Boolean ativo;
}
