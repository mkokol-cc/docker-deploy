package com.venta.model;

import java.math.BigInteger;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Cliente {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	
	@Column(nullable = false)
	private BigInteger cuitDni;
	
	@Column
	private String nombre;//nombre y apellido en caso de personas
	
	@Column
	private String direccion;
	
	@Column
	private Integer telefono;
	//relacion con Venta
	
	@JsonIgnore
	@OneToMany(fetch = FetchType.LAZY, orphanRemoval = true, mappedBy="cliente", cascade = CascadeType.ALL)
	private List<Venta> ventas;
	
	//relacion con CondicionCliente
	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private CondicionIVA condicionIva;
	
	public Cliente() {}
	
	public Cliente editar(Cliente cliente) {
		this.nombre = cliente.getNombre();
		this.direccion = cliente.getDireccion();
		this.condicionIva = cliente.getCondicionIva();
		this.telefono = cliente.getTelefono();
		return this;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public BigInteger getCuitDni() {
		return cuitDni;
	}

	public void setCuitDni(BigInteger cuitDni) {
		this.cuitDni = cuitDni;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getDireccion() {
		return direccion;
	}

	public void setDireccion(String direccion) {
		this.direccion = direccion;
	}

	public Integer getTelefono() {
		return telefono;
	}

	public void setTelefono(Integer telefono) {
		this.telefono = telefono;
	}

	public List<Venta> getVentas() {
		return ventas;
	}

	public void setVentas(List<Venta> ventas) {
		this.ventas = ventas;
	}

	public CondicionIVA getCondicionIva() {
		return condicionIva;
	}

	public void setCondicionIva(CondicionIVA condicionIva) {
		this.condicionIva = condicionIva;
	}
	
	
	public void addVenta(Venta venta) {
		this.ventas.add(venta);
	}
	
}
