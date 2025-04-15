package com.playspot.model;

import jakarta.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "quadras")
public class Quadra {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idQuadra;

    @Column(name = "id_proprietario", nullable = false)
    private int idProprietario;

    @Column(name = "nome_quadra", nullable = false, length = 100)
    private String nomeQuadra;

    @Column(length = 50, nullable = false)
    private String estado;

    @Column(length = 50, nullable = false)
    private String cidade;

    @Column(length = 50, nullable = false)
    private String bairro;

    @Column(length = 100, nullable = false)
    private String rua;

    @Column(length = 10, nullable = false)
    private String numero;

    @Column(length = 10, nullable = false)
    private String cep;

    @Column(length = 100, nullable = false)
    private String esporte;

    @Column(length = 15, nullable = false)
    private String telefone;

    @Column(nullable = false)
    private float valorHora;

    // Construtor vazio exigido pelo JPA
    public Quadra() {
    }

    // Construtor completo com validações
    public Quadra(
            int idProprietario,
            String nomeQuadra,
            String estado,
            String cidade,
            String bairro,
            String rua,
            String numero,
            String cep,
            String esporte,
            String telefone,
            float valorHora) {

        validarId(idProprietario, "O id do proprietário é obrigatório e deve ser positivo.");
        validarCampo(nomeQuadra, "O nome da quadra não pode estar vazio.");
        validarCampo(estado, "O estado não pode estar vazio.");
        validarCampo(cidade, "A cidade não pode estar vazia.");
        validarCampo(bairro, "O bairro não pode estar vazio.");
        validarCampo(rua, "A rua não pode estar vazia.");
        validarCampo(numero, "O número não pode estar vazio.");
        validarCep(cep);
        validarCampo(esporte, "O esporte não pode estar vazio.");
        validarCampo(telefone, "O telefone não pode estar vazio.");
        validarValorHora(valorHora);

        this.idProprietario = idProprietario;
        this.nomeQuadra = nomeQuadra;
        this.estado = estado;
        this.cidade = cidade;
        this.bairro = bairro;
        this.rua = rua;
        this.numero = numero;
        this.cep = cep;
        this.esporte = esporte;
        this.telefone = telefone;
        this.valorHora = valorHora;
    }

    // Getters e Setters
    public int getIdQuadra() {
        return idQuadra;
    }

    public void setIdQuadra(int idQuadra){
        this.idQuadra = idQuadra;
    }

    public int getIdProprietario() {
        return idProprietario;
    }

    public void setIdProprietario(int idProprietario) {
        validarId(idProprietario, "O id do proprietário deve ser positivo.");
        this.idProprietario = idProprietario;
    }

    public String getNomeQuadra() {
        return nomeQuadra;
    }

    public void setNomeQuadra(String nomeQuadra) {
        validarCampo(nomeQuadra, "O nome da quadra não pode estar vazio.");
        this.nomeQuadra = nomeQuadra;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        validarCampo(estado, "O estado não pode estar vazio.");
        this.estado = estado;
    }

    public String getCidade() {
        return cidade;
    }

    public void setCidade(String cidade) {
        validarCampo(cidade, "A cidade não pode estar vazia.");
        this.cidade = cidade;
    }

    public String getBairro() {
        return bairro;
    }

    public void setBairro(String bairro) {
        validarCampo(bairro, "O bairro não pode estar vazio.");
        this.bairro = bairro;
    }

    public String getRua() {
        return rua;
    }

    public void setRua(String rua) {
        validarCampo(rua, "A rua não pode estar vazia.");
        this.rua = rua;
    }

    public String getNumero() {
        return numero;
    }

    public void setNumero(String numero) {
        validarCampo(numero, "O número não pode estar vazio.");
        this.numero = numero;
    }

    public String getCep() {
        return cep;
    }

    public void setCep(String cep) {
        validarCep(cep);
        this.cep = cep;
    }

    public String getEsporte() {
        return esporte;
    }

    public void setEsporte(String esporte) {
        validarCampo(esporte, "O esporte não pode estar vazio.");
        this.esporte = esporte;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        validarCampo(telefone, "O telefone não pode estar vazio.");
        this.telefone = telefone;
    }

    public float getValorHora() {
        return valorHora;
    }

    public void setValorHora(float valorHora) {
        validarValorHora(valorHora);
        this.valorHora = valorHora;
    }

    // Métodos de validação auxiliares
    private void validarCampo(String campo, String mensagemErro) {
        if (campo == null || campo.isEmpty()) {
            throw new IllegalArgumentException(mensagemErro);
        }
    }

    private void validarId(int id, String mensagemErro) {
        if (id <= 0) {
            throw new IllegalArgumentException(mensagemErro);
        }
    }

    private void validarCep(String cep) {
        if (cep == null || !cep.matches("\\d{5}-\\d{3}")) {
            throw new IllegalArgumentException("O CEP informado é inválido. Formato esperado: 00000-000.");
        }
    }

    private void validarValorHora(float valorHora) {
        if (valorHora <= 0) {
            throw new IllegalArgumentException("O valor por hora deve ser maior que zero.");
        }
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Quadra quadra = (Quadra) o;
        return idQuadra == quadra.idQuadra;
    }

    @Override
    public int hashCode() {
        return Objects.hash(idQuadra);
    }

}