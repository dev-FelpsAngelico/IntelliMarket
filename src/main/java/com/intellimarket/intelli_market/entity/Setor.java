package com.intellimarket.intelli_market.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.UUID;

import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "setor")
public class Setor {

    @Id
    @UUID
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "AUTOID", updatable = false, nullable = false)
    private String id;

    @Column(name = "NOME", nullable = false)
    private String nome;

    @Column(name = "LOCALIZACAO")
    private String localizacao;

    @OneToMany(mappedBy = "setor", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Produto> produtos;
}
