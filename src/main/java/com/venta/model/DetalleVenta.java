package com.venta.model;

import java.math.BigDecimal;

import com.articulo.model.BaseItem;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class DetalleVenta {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	
	@Column(nullable = false)
	private BigDecimal precioUnitario;
	
	@Column(nullable = false)
	private Integer cantidad;
	
	//relacion con Atriculo
	@ManyToOne(optional = false, fetch = FetchType.EAGER)
	@JoinColumn(name = "id_item")
	private BaseItem item;
	
	//relacion conVenta
	@ManyToOne
	@JoinColumn(name = "id_venta")
	private Venta venta;
	
	public DetalleVenta() {}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public BigDecimal getPrecioUnitario() {
		return precioUnitario;
	}

	public void setPrecioUnitario(BigDecimal precioUnitario) {
		this.precioUnitario = precioUnitario;
	}

	public Integer getCantidad() {
		return cantidad;
	}

	public void setCantidad(Integer cantidad) {
		this.cantidad = cantidad;
	}

	public BaseItem getItem() {
		return item;
	}

	public void setItem(BaseItem item) {
		this.item = item;
	}

	public Venta getVenta() {
		return venta;
	}

	public void setVenta(Venta venta) {
		this.venta = venta;
	}
	
}
