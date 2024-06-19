package com.usuario.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.usuario.model.Perfil;

@Repository
public interface PerfilRepositorio extends JpaRepository<Perfil,Long>{

}
