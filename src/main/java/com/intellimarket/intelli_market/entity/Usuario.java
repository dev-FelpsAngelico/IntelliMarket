package com.intellimarket.intelli_market.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "usuario")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "AUTOID", unique = true, nullable = false, updatable = false)
    private Long id;

    @Column(name = "NOME", nullable = false)
    private String nome;

    @Email
    @Column(name = "EMAIL", unique = true, nullable = false)
    private String email;

    @NotNull(message = "A senha não pode ser nula")
    @Column(name = "SENHA", nullable = false)
    private String senha;

    @Column(name = "TIPO_USUARIO", nullable = false)
    private Integer tipoUsuario;
}
