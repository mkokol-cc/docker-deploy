package com.articulo.repositoies;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.articulo.model.GrupoArticulo;

@Repository
public interface GrupoArticuloRepository extends JpaRepository<GrupoArticulo, Long>{

}
