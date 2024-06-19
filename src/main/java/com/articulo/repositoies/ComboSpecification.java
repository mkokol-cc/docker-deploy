package com.articulo.repositoies;

import java.math.BigDecimal;

import org.springframework.data.jpa.domain.Specification;

import com.articulo.model.Articulo;
import com.articulo.model.ArticuloCombo;
import com.articulo.model.Combo;
import com.articulo.model.Negocio;

import jakarta.persistence.criteria.Expression;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;

public class ComboSpecification {
	
    public static Specification<Combo> byNegocio(Negocio negocio) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("negocio"), negocio);
    }
    
    public static Specification<Combo> filterByBusqueda(String busqueda) {
        return (root, query, criteriaBuilder) -> {
            String likePattern = "%" + busqueda.toLowerCase() + "%";
            return criteriaBuilder.or(
                criteriaBuilder.like(criteriaBuilder.lower(root.get("nombre")), likePattern),
                criteriaBuilder.like(criteriaBuilder.lower(root.get("codigo")), likePattern)
            );
        };
    }
    
    public static Specification<Combo> orderBy(String property, boolean asc) {
        return (root, query, criteriaBuilder) -> {
            query.orderBy(asc ? criteriaBuilder.asc(root.get(property)) : criteriaBuilder.desc(root.get(property)));
            return criteriaBuilder.conjunction();
        };
    }
    
    public static Specification<Combo> orderByTotalArticuloPrecioCompra(boolean asc) {
        return (root, query, criteriaBuilder) -> {
            // Join with ArticuloCombo
            Join<Combo, ArticuloCombo> articuloCombos = root.join("articuloCombos", JoinType.LEFT);
            Join<ArticuloCombo, Articulo> articulos = articuloCombos.join("articulo", JoinType.LEFT);
            // Calculate the sum of (ArticuloCombo.cantidad * Articulo.precioCompra)
            Expression<BigDecimal> totalPrecioCompra = criteriaBuilder.sum(
                    criteriaBuilder.prod(articuloCombos.get("cantidad"), articulos.get("precioCompra"))
            );
            // Group by Combo ID and order by totalPrecioCompra desc
            query.groupBy(root.get("id"));
            query.orderBy(asc ? criteriaBuilder.asc(totalPrecioCompra) : criteriaBuilder.desc(totalPrecioCompra));
            return criteriaBuilder.conjunction();
        };
    }
}
