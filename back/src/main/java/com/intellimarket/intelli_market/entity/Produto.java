package com.intellimarket.intelli_market.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
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

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "produto")
public class Produto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "AUTOID", unique = true, nullable = false, updatable = false)
    private Long id;

    @NotBlank
    @Size(max = 200)
    @Column(name = "NOME", nullable = false)
    private String nome;

    @Size(max = 1000)
    @Column(name = "DESCRICAO")
    private String descricao;

    @NotNull
    @Column(name = "VALOR", nullable = false, precision = 12, scale = 2)
    private BigDecimal valor;

    @NotNull
    @Column(name = "QUANTIDADE", nullable = false)
    private Integer quantidade;

    @Size(max = 32)
    @Column(name = "UNIDADE")
    private String unidade;

    @Size(max = 128)
    @Column(name = "CODIGO_BARRAS", unique = true)
    private String codigoBarras;

    @Size(max = 512)
    @Column(name = "IMAGE_URL")
    private String imageUrl;

    @Column(name = "ATIVO", nullable = false)
    private Boolean ativo = true;

    @CreationTimestamp
    @Column(name = "CREATED_AT", updatable = false)
    private Instant createdAt;

    @UpdateTimestamp
    @Column(name = "UPDATED_AT")
    private Instant updatedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "SETOR_ID", nullable = false)
    @JsonIgnore
    private Setor setor;
}
