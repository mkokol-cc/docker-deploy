package com.articulo.repositoies;

import org.springframework.data.jpa.domain.Specification;

import com.articulo.model.Articulo;
import com.articulo.model.Negocio;

public class ArticuloSpecification {

    public static Specification<Articulo> byNegocio(Negocio negocio) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("negocio"), negocio);
    }
/*
    public static Specification<Articulo> filterByBusqueda(String busqueda) {
        return (root, query, criteriaBuilder) -> {
            if (busqueda == null || busqueda.isEmpty()) {
                return criteriaBuilder.conjunction();
            }
            String likePattern = "%" + busqueda + "%";
            return criteriaBuilder.or(
                criteriaBuilder.like(root.get("nombre"), likePattern),
                criteriaBuilder.like(root.get("codigo"), likePattern)
            );
        };
    }*/
    public static Specification<Articulo> filterByBusqueda(String busqueda) {
        return (root, query, criteriaBuilder) -> {
            if (busqueda == null || busqueda.isEmpty()) {
                return criteriaBuilder.conjunction();
            }
            String likePattern = "%" + busqueda.toLowerCase() + "%";
            return criteriaBuilder.or(
                criteriaBuilder.like(criteriaBuilder.lower(root.get("nombre")), likePattern),
                criteriaBuilder.like(criteriaBuilder.lower(root.get("codigo")), likePattern)
            );
        };
    }

    public static Specification<Articulo> orderBy(String property, boolean asc) {
        return (root, query, criteriaBuilder) -> {
            query.orderBy(asc ? criteriaBuilder.asc(root.get(property)) : criteriaBuilder.desc(root.get(property)));
            return criteriaBuilder.conjunction();
        };
    }
}