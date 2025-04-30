package com.playspot.repository;

import com.playspot.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    User findByEmailUserAndPasswordUser(String emailUser, String passwordUser);
}