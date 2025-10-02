package com.intellimarket.intelli_market.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "item_venda")
public class ItemVenda {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name = "QUANTIDADE", nullable = false)
    private Integer quantidade;

    @Column(name = "PRECO_UNITARIO", nullable = false)
    private Double precoUnitario;

    @ManyToOne
    @JoinColumn(name = "VENDA_ID", nullable = false)
    @JsonIgnore
    private Venda venda;

    @ManyToOne
    @JoinColumn(name = "PRODUTO_ID", nullable = false)
    private Produto produto;
}
