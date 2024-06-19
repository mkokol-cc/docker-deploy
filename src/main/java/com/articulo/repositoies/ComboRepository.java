package com.articulo.repositoies;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.articulo.model.Combo;
import com.articulo.model.Negocio;

@Repository
public interface ComboRepository extends JpaRepository<Combo, Long>, JpaSpecificationExecutor<Combo> {
	long countByNegocio(Negocio negocio);
}
