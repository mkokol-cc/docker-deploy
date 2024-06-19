package com.articulo.model;

import java.math.BigDecimal;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.venta.model.DetalleVenta;
import com.venta.model.TipoPago;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

//@MappedSuperclass
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "type")
@JsonSubTypes({
    @JsonSubTypes.Type(value = Articulo.class, name = "Item"),
    @JsonSubTypes.Type(value = Combo.class, name = "Combo")
})
public abstract class BaseItem implements Item {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	
	@Column(nullable = false)
    @Size(min = 2, max = 30, message = "El nombre debe tener entre 2 y 30 caracteres")
    @NotNull(message = "El nombre no puede ser nulo")
	protected String nombre;
	
	@Column
	protected String descripcion;
	
	@Column
	protected String type;
	
	@Column(nullable = false/*, unique = true*/)/**ESTO LO COMENTO PQ EN REALIDAD ES UNICO PARA SU NEGOCIO, OTRO NEGOCIO SI PUEDE USAR EL MISMO CODIGO*/
    @Size(min = 2, max = 30, message = "El código debe tener entre 2 y 30 caracteres")
    @NotNull(message = "El código no puede ser nulo")
	private String codigo;
	
	//relacion con Negocio
	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private Negocio negocio;
	
	
	//relacion con DetalleVenta
	@OneToMany(fetch = FetchType.EAGER)
	private List<DetalleVenta> detallesVentas;
	
	
	@Override
	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	@Override
	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public String getCodigo() {
		return codigo;
	}

	public void setCodigo(String codigo) {
		this.codigo = codigo;
	}
	
	public Negocio getNegocio() {
		return negocio;
	}

	public void setNegocio(Negocio negocio) {
		this.negocio = negocio;
	}
	
	public List<DetalleVenta> getDetallesVentas() {
		return detallesVentas;
	}

	public void setDetallesVentas(List<DetalleVenta> detallesVentas) {
		this.detallesVentas = detallesVentas;
	}
	
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}
	
	public String getType() {
		return type;
	}
	
	public void setType(String type) {
		this.type = type;
	}
	
	

	public abstract BigDecimal getPrecioPorTipoPago(TipoPago tipoPago);
	
	public abstract void reducirStock(Integer cantidad);

	//abstract public BigDecimal getPrecioCompra();

	//abstract public void setPrecioCompra(BigDecimal precioCompra);
}
