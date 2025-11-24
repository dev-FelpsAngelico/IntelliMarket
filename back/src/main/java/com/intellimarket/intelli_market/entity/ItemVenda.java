package com.intellimarket.intelli_market.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.Instant;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "item_venda")
public class ItemVenda {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @NotNull
    @Min(1)
    @Column(name = "QUANTIDADE", nullable = false)
    private Integer quantidade;

    @NotNull
    @Column(name = "PRECO_UNITARIO", nullable = false, precision = 12, scale = 2)
    private BigDecimal precoUnitario;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "VENDA_ID", nullable = false)
    @JsonIgnore
    private Venda venda;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PRODUTO_ID", nullable = false)
    private Produto produto;

    @CreationTimestamp
    @Column(name = "CREATED_AT", updatable = false)
    private Instant createdAt;

    @UpdateTimestamp
    @Column(name = "UPDATED_AT")
    private Instant updatedAt;

    @NotNull
    @Builder.Default
    @Column(name = "DESCONTO", nullable = false, precision = 12, scale = 2)
    private BigDecimal desconto = BigDecimal.ZERO;

    @NotNull
    @Builder.Default
    @Column(name = "TAXA", nullable = false, precision = 12, scale = 2)
    private BigDecimal taxa = BigDecimal.ZERO;

    @Size(max = 1000)
    @Column(name = "OBSERVACAO")
    private String observacao;

    @Size(max = 200)
    @Column(name = "PRODUTO_NOME_SNAPSHOT")
    private String produtoNomeSnapshot;

    @Size(max = 128)
    @Column(name = "PRODUTO_BARRA_SNAPSHOT")
    private String produtoCodigoBarrasSnapshot;

    @Transient
    public BigDecimal getSubtotal() {
        if (precoUnitario == null || quantidade == null)
            return BigDecimal.ZERO;
        return precoUnitario.multiply(BigDecimal.valueOf(quantidade));
    }

    @Transient
    public BigDecimal getTotal() {
        BigDecimal sub = getSubtotal();
        BigDecimal d = desconto == null ? BigDecimal.ZERO : desconto;
        BigDecimal t = taxa == null ? BigDecimal.ZERO : taxa;
        return sub.subtract(d).add(t).max(BigDecimal.ZERO);
    }
}
