package com.intellimarket.intelli_market.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
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

import java.time.Instant;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "usuario")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "AUTOID", unique = true, nullable = false, updatable = false)
    private Long id;

    @NotBlank
    @Size(max = 120)
    @Column(name = "NOME", nullable = false)
    private String nome;

    @NotBlank
    @Size(max = 50)
    @Column(name = "USERNAME", unique = true, nullable = false)
    private String username;

    @Email
    @NotBlank
    @Size(max = 150)
    @Column(name = "EMAIL", unique = true, nullable = false)
    private String email;

    @NotNull(message = "A senha não pode ser nula")
    @JsonIgnore
    @Column(name = "SENHA_HASH", nullable = false)
    private String senhaHash;

    public enum Role {
        ADMIN,
        STAFF,
        CLIENT
    }

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "ROLE", nullable = false)
    private Role role = Role.CLIENT;

    @Size(max = 30)
    @Column(name = "TELEFONE")
    private String telefone;

    @Size(max = 512)
    @Column(name = "AVATAR_URL")
    private String avatarUrl;

    @Column(name = "ATIVO", nullable = false)
    private Boolean ativo = true;

    @CreationTimestamp
    @Column(name = "CREATED_AT", updatable = false)
    private Instant createdAt;

    @UpdateTimestamp
    @Column(name = "UPDATED_AT")
    private Instant updatedAt;
}
