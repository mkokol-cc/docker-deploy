package com.articulo.model;

import java.math.BigDecimal;

import com.venta.model.TipoPago;

public interface Item {
	
	public String getNombre();
	public String getDescripcion();
	public BigDecimal getPrecioPorTipoPago(TipoPago tipoPago);
	
}
