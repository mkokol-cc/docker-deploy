package com.articulo.repositoies;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.articulo.model.BaseItem;
import com.articulo.model.Negocio;

@Repository
public interface BaseItemRepository extends JpaRepository<BaseItem, Long>{
    Optional<BaseItem> findByCodigoAndNegocio(String codigo, Negocio negocio);
}
