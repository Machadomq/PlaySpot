package com.playspot.model;

import jakarta.persistence.*;

@Entity
@Table(name = "quadras")
public class Quadra {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idQuadra;

    @Column(name = "nome_quadra", nullable = false, length = 100)
    private int idProprietario;

    @Column(name = "nome_quadra", nullable = false, length = 100)
    private String nomeQuadra;

    @Column(length = 50)
    private String estado;

    @Column(length = 50)
    private String cidade;

    @Column(length = 50)
    private int bairro;

    @Column(length = 100)
    private int rua;

    @Column(length = 10)
    private int numero;

    @Column(length = 10)
    private String cep;

    @Column(length = 100)
    private String esporte;

    @Column(length = 15)
    private String telefone;

    @Column(length = 15)
    private float valorHora;

}

