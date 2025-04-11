package com.playspot.model;

import jakarta.persistence.*;
import java.sql.Time;
import java.util.Date;
import java.util.Objects;

@Entity
@Table(name = "reservas")
public class Reservas {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int reservaId;

    // Relacionamento com Usuário (Cliente)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    private User usuario;

    // Relacionamento com Proprietário (também User)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "proprietario_id", nullable = false)
    private User proprietario;

    // Relacionamento com Quadra
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "quadra_id", nullable = false)
    private Quadra quadra;

    @Temporal(TemporalType.DATE)
    @Column(name = "data_reserva", nullable = false)
    private Date dataReserva;

    @Column(name = "horario_inicio", nullable = false)
    private Time horarioInicio;

    @Column(name = "horario_fim", nullable = false)
    private Time horarioFim;

    // Status da reserva com Enum
    public enum Status {
        AGENDADA,
        CANCELADA,
        CONCLUIDA
    }

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status;

    @Column(name = "valor_hora", nullable = false)
    private float valorHora;

    @Column(name = "valor_total", nullable = false)
    private float valorTotal;

    // Construtor vazio exigido pelo JPA
    public Reservas() {
    }

    // Construtor completo
    public Reservas(
            User usuario,
            User proprietario,
            Quadra quadra,
            Date dataReserva,
            Time horarioInicio,
            Time horarioFim,
            Status status,
            float valorHora,
            float valorTotal) {
        this.usuario = usuario;
        this.proprietario = proprietario;
        this.quadra = quadra;
        this.dataReserva = dataReserva;
        this.horarioInicio = horarioInicio;
        this.horarioFim = horarioFim;
        this.status = status;
        this.valorHora = valorHora;
        this.valorTotal = valorTotal;
    }

    // Getters e Setters
    public int getReservaId() {
        return reservaId;
    }

    public User getUsuario() {
        return usuario;
    }

    public void setUsuario(User usuario) {
        this.usuario = usuario;
    }

    public User getProprietario() {
        return proprietario;
    }

    public void setProprietario(User proprietario) {
        this.proprietario = proprietario;
    }

    public Quadra getQuadra() {
        return quadra;
    }

    public void setQuadra(Quadra quadra) {
        this.quadra = quadra;
    }

    public Date getDataReserva() {
        return dataReserva;
    }

    public void setDataReserva(Date dataReserva) {
        this.dataReserva = dataReserva;
    }

    public Time getHorarioInicio() {
        return horarioInicio;
    }

    public void setHorarioInicio(Time horarioInicio) {
        this.horarioInicio = horarioInicio;
    }

    public Time getHorarioFim() {
        return horarioFim;
    }

    public void setHorarioFim(Time horarioFim) {
        this.horarioFim = horarioFim;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public float getValorHora() {
        return valorHora;
    }

    public void setValorHora(float valorHora) {
        this.valorHora = valorHora;
    }

    public float getValorTotal() {
        return valorTotal;
    }

    public void setValorTotal(float valorTotal) {
        this.valorTotal = valorTotal;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Reservas reservas = (Reservas) o;
        return reservaId == reservas.reservaId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(reservaId);
    }
}