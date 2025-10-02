package com.intellimarket.intelli_market.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "venda")
public class Venda {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "AUTOID", unique = true, nullable = false, updatable = false)
    private Long id;

    @Column(name = "DATA", nullable = false)
    private LocalDateTime data = LocalDateTime.now();

    @Column(name = "TOTAL", nullable = false)
    private Double total;

    @ManyToOne
    @JoinColumn(name = "USUARIO_ID", nullable = false)
    @JsonIgnore
    private Usuario usuario;

    @OneToMany(mappedBy = "venda", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<ItemVenda> itens = new ArrayList<>();
}
