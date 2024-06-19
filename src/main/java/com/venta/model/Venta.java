package com.venta.model;

import java.time.LocalDateTime;
import java.util.List;

import com.articulo.model.Negocio;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.usuario.model.Usuario;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
public class Venta {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	
	@Column(nullable = false)
	private LocalDateTime fechaHora;
	
	//relacion con usuario
	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private TipoPago tipoPago;
	
	@OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)//, fetch=FetchType.EAGER)
	private List<DetalleVenta> detalleVenta;
	
	@ManyToOne(cascade = CascadeType.ALL,optional = false)
	@JoinColumn(name = "id_cliente")
	private Cliente cliente;
	
	//esta relacion se podria sacar de los articulos pero por performance lo vamos a poner aca
	//puede haber inconsistencias ya que puede difereir este numero con los de los articulos
	//pero tambien puede diferir los negocios de los diferentes articulos por lo tanto ya esta esa inconsistencia
	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private Negocio negocio;
	
	//relacion con el Usuario que registro la venta
	//@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
	@ManyToOne(optional = false, fetch = FetchType.EAGER)
	@JoinColumn(name="id_usuario")
	private Usuario usuario;
	
	public Venta() {}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public LocalDateTime getFechaHora() {
		return fechaHora;
	}

	public void setFechaHora(LocalDateTime fechaHora) {
		this.fechaHora = fechaHora;
	}

	public TipoPago getTipoPago() {
		return tipoPago;
	}

	public void setTipoPago(TipoPago tipoPago) {
		this.tipoPago = tipoPago;
	}

	public List<DetalleVenta> getDetalleVenta() {
		return detalleVenta;
	}

	public void setDetalleVenta(List<DetalleVenta> detalleVenta) {
		this.detalleVenta = detalleVenta;
	}

	public Cliente getCliente() {
		return cliente;
	}

	public void setCliente(Cliente cliente) {
		this.cliente = cliente;
	}

	public Negocio getNegocio() {
		return negocio;
	}

	public void setNegocio(Negocio negocio) {
		this.negocio = negocio;
	}

	public Usuario getUsuario() {
		return usuario;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}
	
	
	
	
}
