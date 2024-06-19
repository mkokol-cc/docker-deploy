package com.articulo.model;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.venta.model.TipoPago;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.transaction.Transactional;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(uniqueConstraints = {@UniqueConstraint(columnNames = {"codigo", "negocio"})})
public class Articulo extends BaseItem{
	
	//uso Integer para poder diferencias null de 0, a diferencia del tipo primitivo int
	@Column
	private Integer stock;
	
	@Column(nullable = false)
	@DecimalMin(value = "0", inclusive = true, message = "El precio minimo es de 0.00.")
	@Digits(integer=8, fraction=2, message = "El precio maximo es de 99,999,999.99.")
	protected BigDecimal precioCompra;
	
	//relacion con Combo
	@JsonIgnore
	@OneToMany(fetch = FetchType.LAZY)
	@JoinColumn(name="id_articulo")
	private List<ArticuloCombo> combo;
	
	//relacion con Grupo
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
	@ManyToOne(optional = false, fetch = FetchType.EAGER)
	@JoinColumn(name="id_grupo_articulo")
	@NotNull(message = "El articulo debe estar asociado a un grupo.")
	private GrupoArticulo grupoArticulo;
	
    @OneToMany(mappedBy = "articulo", fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Imagen> imagenes = new ArrayList<>();
	
	public Articulo() {}

	public Articulo editar(Articulo a) {
		//this.codigo = a.getCodigo();
		this.descripcion = a.getDescripcion();
		this.grupoArticulo = a.getGrupoArticulo();
		this.nombre = a.getNombre();
		this.precioCompra = a.getPrecioCompra();
		this.stock = a.getStock();
		removeAllImagenes();
		addAllImagenes(a.getImagenes());
		return this;
	}

	
    public void addImagen(Imagen imagen) {
        imagenes.add(imagen);
        imagen.setArticulo(this);
    }

    public void removeImagen(Imagen imagen) {
        imagenes.remove(imagen);
        imagen.setArticulo(null);
    }
    
    @Transactional
    public void removeAllImagenes() {
        for (Imagen imagen : new ArrayList<>(imagenes)) {
            removeImagen(imagen);
        }
        imagenes.clear();
        /*
    	List<Imagen> lista= this.imagenes;
    	for(Imagen i : lista) {
    		removeImagen(i);
    	}
    	*/
    }
    
    @Transactional
    public void addAllImagenes(List<Imagen> imagenes) {
    	for(Imagen i : imagenes) {
    		addImagen(i);
    	}
    }

	public List<Imagen> getImagenes() {
		return imagenes;
	}

	public void setImagenes(List<Imagen> imagenes) {
		this.imagenes = imagenes;
	}

	public Integer getStock() {
		return stock;
	}

	public void setStock(Integer stock) {
		this.stock = stock;
	}
	
	public List<ArticuloCombo> getCombo() {
		return combo;
	}

	public void setCombo(List<ArticuloCombo> combo) {
		this.combo = combo;
	}

	public GrupoArticulo getGrupoArticulo() {
		return grupoArticulo;
	}

	public void setGrupoArticulo(GrupoArticulo grupoArticulo) {
		this.grupoArticulo = grupoArticulo;
	}
	
	@Override
	public BigDecimal getPrecioPorTipoPago(TipoPago tipoPago) {
		
		BigDecimal porcentajeRecargo = new BigDecimal(grupoArticulo.getPorcentajeRecargoPorTipoPago(tipoPago));
		BigDecimal multiplicador = porcentajeRecargo.divide(new BigDecimal(100)).add(new BigDecimal(1));
		return this.precioCompra.multiply(multiplicador);
	}

	@Override
	public void reducirStock(Integer cantidad) {
		this.stock = this.stock - cantidad;
	}
	
	@Override
	public String getType() {
		this.type = "Item";
		return type;
	}

	public BigDecimal getPrecioCompra() {
		return precioCompra;
	}

	public void setPrecioCompra(BigDecimal precioCompra) {
		this.precioCompra = precioCompra;
	}
	
}
