package com.intellimarket.intelli_market.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.UUID;

@Entity
@Getter
@Setter
@Table(name = "usuario")
public class Usuario {

    @Id
    @UUID
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "AUTOID", updatable = false, nullable = false)
    private String id;

    @Column(name = "NOME", nullable = false)
    private String nome;

    @Email
    @Column(name = "EMAIL", unique = true, nullable = false)
    private String email;

    @JsonIgnore
    @Column(name = "SENHA", nullable = false)
    private String senha;

    @Column(name = "TIPO_USUARIO")
    private Integer tipoUsuario;
}
