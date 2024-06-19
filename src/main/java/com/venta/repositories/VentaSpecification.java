package com.venta.repositories;

import java.time.LocalDateTime;

import org.springframework.data.jpa.domain.Specification;

import com.articulo.model.Negocio;
import com.venta.model.DetalleVenta;
import com.venta.model.Venta;

import jakarta.persistence.criteria.Join;

public class VentaSpecification {

    public static Specification<Venta> byNegocio(Negocio negocio) {
        return (root, query, criteriaBuilder) -> 
                criteriaBuilder.equal(root.get("negocio"), negocio);
    }

    public static Specification<Venta> filterByCliente(String busqueda) {
        return (root, query, criteriaBuilder) -> {
        	System.out.println("public static Specification<Venta> filterByCliente(String busqueda) - busqueda="+busqueda.toLowerCase());
        	String likePattern = "%" + busqueda.toLowerCase() + "%";
            return criteriaBuilder.or(
            		criteriaBuilder.like(criteriaBuilder.lower(root.join("cliente").get("nombre")), likePattern),
                    criteriaBuilder.like(criteriaBuilder.lower(criteriaBuilder.function("TO_CHAR", String.class, root.join("cliente").get("cuitDni"), criteriaBuilder.literal("FM99999999999999999999"))), likePattern),
                    criteriaBuilder.like(criteriaBuilder.lower(criteriaBuilder.function("TO_CHAR", String.class, root.join("cliente").get("telefono"), criteriaBuilder.literal("FM9999999999"))), likePattern)
            );
        };
    }

    public static Specification<Venta> orderByFechaHora(boolean asc) {
        return (root, query, criteriaBuilder) -> {
            query.orderBy(asc ? criteriaBuilder.asc(root.get("fechaHora")) : criteriaBuilder.desc(root.get("fechaHora")));
            return null;
        };
    }

    public static Specification<Venta> orderByTotalVenta(boolean asc) {
        return (root, query, criteriaBuilder) -> {
            // Unirse con la entidad DetalleVenta
            Join<Venta, DetalleVenta> detalleJoin = root.join("detalleVenta");
            // Agrupar por el id de la venta para poder usar funciones agregadas
            query.groupBy(root.get("id"));
            // Ordenar por la suma del producto de precioUnitario y cantidad, en orden descendente
            query.orderBy(asc ? 
            criteriaBuilder.asc(
                criteriaBuilder.sum(
                    criteriaBuilder.prod(detalleJoin.get("precioUnitario"), detalleJoin.get("cantidad"))
                )
            ) : criteriaBuilder.desc(
                    criteriaBuilder.sum(
                    		criteriaBuilder.prod(detalleJoin.get("precioUnitario"), detalleJoin.get("cantidad"))
                        )
            		));
            // Devolver null porque no se necesita un Predicate en este caso
            return null;
        };
    }

    
    public static Specification<Venta> fechaMayorQue(LocalDateTime fechaHora) {
        return (root, query, criteriaBuilder) -> 
                criteriaBuilder.greaterThan(root.get("fechaHora"), fechaHora);
    }

    public static Specification<Venta> fechaMenorQue(LocalDateTime fechaHora) {
        return (root, query, criteriaBuilder) -> 
                criteriaBuilder.lessThan(root.get("fechaHora"), fechaHora);
    }
}
