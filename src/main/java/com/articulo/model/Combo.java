package com.articulo.model;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import com.venta.model.TipoPago;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(uniqueConstraints = {@UniqueConstraint(columnNames = {"codigo", "negocio"})})
public class Combo extends BaseItem{
	
	@OneToMany(mappedBy = "combo", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<ArticuloCombo> articulos = new ArrayList<>();
	
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

	@Transient
	private BigDecimal precioCompra = new BigDecimal(0);
	/**
	 * El precio se calcula obteniendo todos los precios de compra de los articulos segun el TipoPago
	 * y sumandolos (por eso no esta en BaseItem porque este precioUnitario no tiene persistencia, se calcula)
	 */
	public Combo() {}
	
	public Combo editar(Combo c) {
		this.porcentajeRecargoConIVA = c.getPorcentajeRecargoConIVA();
		this.porcentajeRecargoSinIVA = c.getPorcentajeRecargoSinIVA();
		this.porcentajeRecargoTarjeta = c.getPorcentajeRecargoTarjeta();
		this.porcentajeRecargoTarjeta3Cuotas = c.getPorcentajeRecargoTarjeta3Cuotas();
		this.porcentajeRecargoTarjeta6Cuotas = c.getPorcentajeRecargoTarjeta6Cuotas();
		this.nombre = c.getNombre();
		return this;
	}
	
	@Override
	public BigDecimal getPrecioPorTipoPago(TipoPago tipoPago) {
		BigDecimal porcentajeRecargo = new BigDecimal(getPorcentajeRecargoPorTipoPago(tipoPago));
		BigDecimal multiplicador = porcentajeRecargo.divide(new BigDecimal(100)).add(new BigDecimal(1));
		return getPrecioCompra().multiply(multiplicador);
	}
	
	@Override
	public String getDescripcion() {
		StringBuilder descripcionBuilder = new StringBuilder("Combo " + getNombre() + ": ");
		this.articulos.forEach(a->{
			descripcionBuilder.append(a.getCantidad()+" "+a.getArticulo().getNombre()).append(" - ");
		});
		String descripcion = descripcionBuilder.toString();
		return descripcion.substring(descripcion.length() - 3);
	}
	
	public BigDecimal getPrecioCompra() {
		this.precioCompra = new BigDecimal(0);
		for(ArticuloCombo ac : this.articulos) {
			BigDecimal cantidad = new BigDecimal(ac.getCantidad());
			this.precioCompra=this.precioCompra.add(ac.getArticulo().getPrecioCompra().multiply(cantidad));
		}
		return this.precioCompra;
	}
	
	public void setPrecioCompra(BigDecimal precioCompra) {
		this.precioCompra = precioCompra;
	}
	
	@Override
	public void reducirStock(Integer cantidad) {
		//el parametro cantidad es la cantidad de combos que hay que restar
		for(ArticuloCombo ac : this.articulos) {
			Integer cantidadAReducir = ac.getCantidad()*cantidad;
			ac.getArticulo().reducirStock(cantidadAReducir);
		}
	}
	
	@Override
	public String getType() {
		this.type = "Combo";
		return type;
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
	
	public void addArticulo(Articulo articulo, Integer cantidad) {
		if (cantidad > 0) {
			ArticuloCombo artCombo = new ArticuloCombo();
			artCombo.setArticulo(articulo);
			artCombo.setCantidad(cantidad);
			artCombo.setCombo(this);
            this.articulos.add(artCombo); // Establecer la relación bidireccional
        }
	}
	
	public boolean sonArticulosDelMismoNegocio() {
		Negocio n = getListaArticulos().get(0).getNegocio();
		return getListaArticulos().stream().allMatch(a->a.getNegocio().equals(n));
	}
	
	public List<Articulo> getListaArticulos() {
		List<Articulo> listaArticulos = new ArrayList<>(/*this.articulos.keySet()*/);
		return listaArticulos;
	}
	
	public List<ArticuloCombo> getArticulos() {
		return articulos;
	}
	public void setArticulos(List<ArticuloCombo> articulos) {
		this.articulos = articulos;
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
	
}
