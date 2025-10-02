package com.intellimarket.intelli_market.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "produto")
public class Produto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "AUTOID", unique = true, nullable = false, updatable = false)
    private Long id;

    @Column(name = "NOME", nullable = false)
    private String nome;

    @Column(name = "DESCRICAO")
    private String descricao;

    @Column(name = "VALOR", nullable = false)
    private Double valor;

    @Column(name = "QUANTIDADE", nullable = false)
    private Integer quantidade;

    @ManyToOne
    @JoinColumn(name = "SETOR_ID", nullable = false)
    private Setor setor;
}
