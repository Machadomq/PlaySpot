package com.playspot.model;

import jakarta.persistence.*;
import java.util.Date;
import java.util.Objects;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idUser;

    @Column(name = "name_user", nullable = false, length = 100)
    private String nameUser;

    @Column(name = "password_user", nullable = false)
    private String passwordUser;

    @Column(name = "email_user", nullable = false, unique = true)
    private String emailUser;

    public enum TypeUser {
        COMERCIO,
        CLIENTE
    }

    @Enumerated(EnumType.STRING) // Persiste o enum como String no banco
    @Column(name = "tipo_cliente", nullable = false)
    private TypeUser tipoCliente;

    @Column(name = "data_nascimento", nullable = false)
    @Temporal(TemporalType.DATE) // Para persistir apenas a data
    private Date dataNascimento;

    @Column(nullable = false, unique = true, length = 14)
    private String cpf;

    @Column(length = 50)
    private String estado;

    @Column(length = 50)
    private String cidade;

    @Column(length = 50)
    private String bairro;

    @Column(length = 100)
    private String rua;

    @Column(length = 10)
    private String numero;

    @Column(length = 10)
    private String cep;

    @Column(length = 15)
    private String telefone;

    // Construtor vazio exigido pelo JPA
    public User() {
    }

    // Construtor completo
    public User(
            String nameUser,
            String passwordUser,
            String emailUser,
            TypeUser tipoCliente,
            Date dataNascimento,
            String cpf,
            String estado,
            String cidade,
            String bairro,
            String rua,
            String numero,
            String cep,
            String telefone) {

        // Validações de campos obrigatórios
        if (nameUser == null || nameUser.isBlank()) {
            throw new IllegalArgumentException("O nome não pode estar vazio.");
        }
        if (passwordUser == null || passwordUser.isBlank()) {
            throw new IllegalArgumentException("A senha não pode estar vazia.");
        }
        if (emailUser == null || emailUser.isBlank() || !emailUser.contains("@")) {
            throw new IllegalArgumentException("O e-mail informado é inválido.");
        }
        if (tipoCliente == null) {
            throw new IllegalArgumentException("O tipo de cliente é obrigatório.");
        }
        if (dataNascimento == null) {
            throw new IllegalArgumentException("A data de nascimento é obrigatória.");
        }
        if (cpf == null || cpf.isBlank() || cpf.length() != 14) {
            throw new IllegalArgumentException("O CPF informado é inválido.");
        }
        if (cep != null && cep.isBlank()) {
            throw new IllegalArgumentException("O CEP, se informado, não pode estar vazio.");
        }
        if (telefone != null && telefone.isBlank()) {
            throw new IllegalArgumentException("O telefone, se informado, não pode estar vazio.");
        }

        this.nameUser = nameUser;
        this.passwordUser = passwordUser;
        this.emailUser = emailUser;
        this.tipoCliente = tipoCliente;
        this.dataNascimento = dataNascimento;
        this.cpf = cpf;
        this.estado = estado;
        this.cidade = cidade;
        this.bairro = bairro;
        this.rua = rua;
        this.numero = numero;
        this.cep = cep;
        this.telefone = telefone;
    }

    // Getters e Setters
    public int getIdUser() {
        return idUser;
    }

    public void setIdUser(int idUser) {
        this.idUser = idUser;
    }

    public String getNameUser() {
        return nameUser;
    }

    public void setNameUser(String nameUser) {
        if (nameUser == null || nameUser.isEmpty()) {
            throw new IllegalArgumentException("O nome não pode estar vazio.");
        }
        this.nameUser = nameUser;
    }

    public String getPasswordUser() {
        return passwordUser;
    }

    public void setPasswordUser(String passwordUser) {
        if (passwordUser == null || passwordUser.isEmpty()) {
            throw new IllegalArgumentException("A senha não pode estar vazia.");
        }
        this.passwordUser = passwordUser;
    }

    public String getEmailUser() {
        return emailUser;
    }

    public void setEmailUser(String emailUser) {
        if (emailUser == null || !emailUser.contains("@")) {
            throw new IllegalArgumentException("O e-mail informado é inválido.");
        }
        this.emailUser = emailUser;
    }

    public TypeUser getTipoCliente() {
        return tipoCliente;
    }

    public void setTipoCliente(TypeUser tipoCliente) {
        if (tipoCliente == null) {
            throw new IllegalArgumentException("O tipo de cliente é obrigatório.");
        }
        this.tipoCliente = tipoCliente;
    }

    public Date getDataNascimento() {
        return dataNascimento;
    }

    public void setDataNascimento(Date dataNascimento) {
        this.dataNascimento = dataNascimento;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        if (cpf == null || cpf.length() != 14) {
            throw new IllegalArgumentException("O CPF informado é inválido.");
        }
        this.cpf = cpf;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getCidade() {
        return cidade;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    public String getBairro() {
        return bairro;
    }

    public void setBairro(String bairro) {
        this.bairro = bairro;
    }

    public String getRua() {
        return rua;
    }

    public void setRua(String rua) {
        this.rua = rua;
    }

    public String getNumero() {
        return numero;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public String getCep() {
        return cep;
    }

    public void setCep(String cep) {
        this.cep = cep;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    // Sobrescrevendo toString
    @Override
    public String toString() {
        return "User{" +
                "idUser=" + idUser +
                ", nameUser='" + nameUser + '\'' +
                ", emailUser='" + emailUser + '\'' +
                ", tipoCliente=" + tipoCliente +
                ", dataNascimento=" + dataNascimento +
                '}';
    }

    // Sobrescrevendo equals e hashCode para comparar por idUser
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return idUser == user.idUser;
    }

    @Override
    public int hashCode() {
        return Objects.hash(idUser);
    }
}