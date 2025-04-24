package com.locadora.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "modelos_veiculos")
public class ModeloVeiculo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "marca_id")
    private MarcaVeiculo marca;

    @Column(nullable = false, length = 50)
    private String nome;

    @ManyToOne
    @JoinColumn(name = "categoria_id")
    private CategoriaVeiculo categoria;
}
