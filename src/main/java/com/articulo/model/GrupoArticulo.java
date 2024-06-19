package com.articulo.model;

import java.util.List;

import com.venta.model.TipoPago;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
public class GrupoArticulo {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	
	@Column(nullable = false)
    @Size(min = 2, max = 30, message = "El nombre debe tener entre 2 y 30 caracteres")
    @NotNull(message = "El nombre no puede ser nulo")
	private String nombre;
	
	@Column(nullable = false)
    @Min(value = 0, message = "El porcentaje debe ser mayor o igual a 0")
    @Max(value = 999, message = "El porcentaje debe ser menor o igual a 999")
    @NotNull(message = "El porcentaje de recargo sin IVA no puede ser nulo")
	private Integer porcentajeRecargoSinIVA;
	
	@Column(nullable = false)
    @Min(value = 0, message = "El porcentaje debe ser mayor o igual a 0")
    @Max(value = 999, message = "El porcentaje debe ser menor o igual a 999")
    @NotNull(message = "El porcentaje de recargo con IVA no puede ser nulo")
	private Integer porcentajeRecargoConIVA;
	
	@Column(nullable = false)
    @Min(value = 0, message = "El porcentaje debe ser mayor o igual a 0")
    @Max(value = 999, message = "El porcentaje debe ser menor o igual a 999")
    @NotNull(message = "El porcentaje de recargo con tarjeta no puede ser nulo")
	private Integer porcentajeRecargoTarjeta;
	
	@Column(nullable = false)
    @Min(value = 0, message = "El porcentaje debe ser mayor o igual a 0")
    @Max(value = 999, message = "El porcentaje debe ser menor o igual a 999")
    @NotNull(message = "El porcentaje de recargo con tarjeta (3 Cuotas) no puede ser nulo")
	private Integer porcentajeRecargoTarjeta3Cuotas;
	
	@Column(nullable = false)
    @Min(value = 0, message = "El porcentaje debe ser mayor o igual a 0")
    @Max(value = 999, message = "El porcentaje debe ser menor o igual a 999")
    @NotNull(message = "El porcentaje de recargo con tarjeta (6 Cuotas) no puede ser nulo")
	private Integer porcentajeRecargoTarjeta6Cuotas;
	
	//relacion con Negocio
	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private Negocio negocio;
	
	//relacion con articulo
	@OneToMany(fetch = FetchType.EAGER)
	private List<Articulo> articulos;
	
	public GrupoArticulo() {}
	
	public GrupoArticulo editar(GrupoArticulo g) {
		this.porcentajeRecargoConIVA = g.getPorcentajeRecargoConIVA();
		this.porcentajeRecargoSinIVA = g.getPorcentajeRecargoSinIVA();
		this.porcentajeRecargoTarjeta = g.getPorcentajeRecargoTarjeta();
		this.porcentajeRecargoTarjeta3Cuotas = g.getPorcentajeRecargoTarjeta3Cuotas();
		this.porcentajeRecargoTarjeta6Cuotas = g.getPorcentajeRecargoTarjeta6Cuotas();
		this.nombre = g.getNombre();
		//this.articulos = g.getArticulos() | esto no porque los articulos van a ser los que cambien su grupo
		//ya que sino van a quedar articulos sin grupo y violaria la condicion @ManyToOne(optional = false) establecida
		//en la clase Articulo
		return this;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public Integer getPorcentajeRecargoSinIVA() {
		return porcentajeRecargoSinIVA;
	}

	public void setPorcentajeRecargoSinIVA(Integer porcentajeRecargoSinIVA) {
		this.porcentajeRecargoSinIVA = porcentajeRecargoSinIVA;
	}

	public Integer getPorcentajeRecargoConIVA() {
		return porcentajeRecargoConIVA;
	}

	public void setPorcentajeRecargoConIVA(Integer porcentajeRecargoConIVA) {
		this.porcentajeRecargoConIVA = porcentajeRecargoConIVA;
	}

	public Integer getPorcentajeRecargoTarjeta() {
		return porcentajeRecargoTarjeta;
	}

	public void setPorcentajeRecargoTarjeta(Integer porcentajeRecargoTarjeta) {
		this.porcentajeRecargoTarjeta = porcentajeRecargoTarjeta;
	}

	public Integer getPorcentajeRecargoTarjeta3Cuotas() {
		return porcentajeRecargoTarjeta3Cuotas;
	}

	public void setPorcentajeRecargoTarjeta3Cuotas(Integer porcentajeRecargoTarjeta3Cuotas) {
		this.porcentajeRecargoTarjeta3Cuotas = porcentajeRecargoTarjeta3Cuotas;
	}

	public Integer getPorcentajeRecargoTarjeta6Cuotas() {
		return porcentajeRecargoTarjeta6Cuotas;
	}

	public void setPorcentajeRecargoTarjeta6Cuotas(Integer porcentajeRecargoTarjeta6Cuotas) {
		this.porcentajeRecargoTarjeta6Cuotas = porcentajeRecargoTarjeta6Cuotas;
	}

	public List<Articulo> getArticulos() {
		return articulos;
	}

	public void setArticulos(List<Articulo> articulos) {
		this.articulos = articulos;
	}
	
	public Negocio getNegocio() {
		return negocio;
	}

	public void setNegocio(Negocio negocio) {
		this.negocio = negocio;
	}
	
	public Integer getPorcentajeRecargoPorTipoPago(TipoPago tipoPago) {
		Integer recargo = null;
		switch(tipoPago) {
		  case SIN_IVA:
			  recargo = this.porcentajeRecargoSinIVA;
		  case CON_IVA:
			  recargo = this.porcentajeRecargoConIVA;
		  case TARJETA:
			  recargo = this.porcentajeRecargoTarjeta;
		  case TARJETA_3_CUOTAS:
			  recargo = this.porcentajeRecargoTarjeta3Cuotas;
		  case TARJETA_6_CUOTAS:
			  recargo = this.porcentajeRecargoTarjeta6Cuotas;
		}
		return recargo;
	}
	
	/*
	public Negocio getNegocio() {
		if(sonArticulosDelMismoNegocio()) {
			return this.articulos.get(0).getNegocio();
		}else {
			//throw new Exception();//representa que hubo un error, deberia ser MiPropiaException
			return null;
		}
	}
	
	public boolean sonArticulosDelMismoNegocio() {
		Negocio n = this.articulos.get(0).getNegocio();
		return this.articulos.stream().allMatch(a->a.getNegocio().equals(n));
	}*/
}
