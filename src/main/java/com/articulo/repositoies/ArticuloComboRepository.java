package com.articulo.repositoies;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.articulo.model.ArticuloCombo;

@Repository
public interface ArticuloComboRepository extends JpaRepository<ArticuloCombo, Long>{

}
