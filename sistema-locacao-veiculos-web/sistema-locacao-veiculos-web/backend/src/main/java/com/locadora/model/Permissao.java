package com.locadora.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "permissoes")
public class Permissao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 50, unique = true)
    private String nome;

    @Column(length = 255)
    private String descricao;

    @Column(nullable = false, length = 100)
    private String recurso;

    @ManyToMany(mappedBy = "permissoes")
    private Set<Perfil> perfis = new HashSet<>();
}
