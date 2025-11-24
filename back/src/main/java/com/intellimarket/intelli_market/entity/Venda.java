package com.intellimarket.intelli_market.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "venda")
public class Venda {

    public enum Status {
        PENDING,
        PAID,
        CANCELLED
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "AUTOID", unique = true, nullable = false, updatable = false)
    private Long id;

    // data da venda (registro), mantida como LocalDateTime para compatibilidade com
    // código existente
    @Column(name = "DATA", nullable = false)
    @Builder.Default
    private LocalDateTime data = LocalDateTime.now();

    // total persistido (sincronizado via recalculateTotal)
    @NotNull
    @Builder.Default
    @Column(name = "TOTAL", nullable = false, precision = 12, scale = 2)
    private BigDecimal total = BigDecimal.ZERO;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USUARIO_ID", nullable = false)
    @JsonIgnore
    private Usuario usuario;

    @OneToMany(mappedBy = "venda", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    @Builder.Default
    private List<ItemVenda> itens = new ArrayList<>();

    @Enumerated(EnumType.STRING)
    @Column(name = "STATUS", nullable = false)
    @Builder.Default
    private Status status = Status.PENDING;

    @Column(name = "PAYMENT_METHOD")
    private String paymentMethod;

    @CreationTimestamp
    @Column(name = "CREATED_AT", updatable = false)
    private Instant createdAt;

    @UpdateTimestamp
    @Column(name = "UPDATED_AT")
    private Instant updatedAt;

    /**
     * Recalcula o total da venda somando os getTotal() de cada item e atualiza o
     * campo total.
     */
    public BigDecimal recalculateTotal() {
        BigDecimal sum = itens.stream()
                .map(ItemVenda::getTotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        this.total = sum;
        return this.total;
    }

}
