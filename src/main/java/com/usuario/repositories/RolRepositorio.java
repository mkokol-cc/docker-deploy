package com.usuario.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.usuario.model.Rol;

@Repository
public interface RolRepositorio extends JpaRepository<Rol, Long>{

}
