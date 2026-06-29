package com.playspot.repository;

import com.playspot.model.Reservas;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReservasRepository extends JpaRepository<Reservas, Integer> {

	// Buscar reservas feitas por um usuário (cliente)
	List<Reservas> findByUsuario_IdUser(int idUser);

	// Buscar reservas onde o usuário é proprietário (dono da quadra)
	List<Reservas> findByProprietario_IdUser(int idUser);

	// Soma do valor total das reservas concluídas para um proprietário
	@Query("SELECT SUM(r.valorTotal) FROM Reservas r WHERE r.proprietario.idUser = :proprietarioId AND r.status = 'CONCLUIDA'")
	Float sumValorTotalByProprietarioId(@Param("proprietarioId") int proprietarioId);
}