package com.venta.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.articulo.model.BaseItem;
import com.articulo.model.Negocio;
import com.articulo.services.BaseItemService;
import com.venta.model.DetalleVenta;
import com.venta.model.TipoPago;
import com.venta.repositories.DetalleVentaRepository;

@Service
public class DetalleVentaService {
	
	@Autowired
	private DetalleVentaRepository repository;
	@Autowired
	private BaseItemService baseItemService;

	public DetalleVenta nuevo(DetalleVenta detalle, TipoPago tipoPago, Negocio negocio) throws Exception {
		BaseItem item = baseItemService.obtenerPorId(detalle.getItem().getId());
		//comparar si el item es del negocio, sino devolver throw
		detalle.setItem(item);
		System.out.println("PrecioCompra: "+item.getPrecioPorTipoPago(tipoPago));
		System.out.println("PrecioCompra: "+item.getId());
		System.out.println("PrecioCompra: "+item.getType());
		System.out.println("PrecioUnitario: "+detalle.getPrecioUnitario());
		if(detalle.getPrecioUnitario()==null) {
			System.out.println("entre");
			detalle.setPrecioUnitario(item.getPrecioPorTipoPago(tipoPago));
		}
		DetalleVenta detalleDB = repository.save(detalle);
		reducirStock(detalleDB);
		//return repository.save(detalle);
		return detalleDB;
	}
	
	private void reducirStock(DetalleVenta detalle) throws Exception {
		baseItemService.reducirStock(detalle.getItem(), detalle.getCantidad());
	}
	
}
