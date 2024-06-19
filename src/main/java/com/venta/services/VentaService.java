package com.venta.services;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.articulo.model.Negocio;
import com.venta.model.Cliente;
import com.venta.model.DetalleVenta;
import com.venta.model.Venta;
import com.venta.repositories.VentaRepository;
import com.venta.repositories.VentaSpecification;

import jakarta.transaction.Transactional;

@Service
public class VentaService {

	@Autowired
	private VentaRepository repository;
	@Autowired
	private DetalleVentaService detalleVentaService;
	@Autowired
	private ClienteService clienteService;
	
	public List<Venta> listar(Negocio negocio) {
		return listar().stream().filter(v->v.getNegocio().equals(negocio)).collect(Collectors.toList());
	}
	
	public List<Venta> listar(){
		return repository.findAll();
	}
	
	
	public void eliminarPorId(long id) {
		repository.deleteById(id);
	}

	public Venta nuevo(Venta v) throws Exception {
		v = guardarClientes(v);
		v = guardarDetallesVenta(v);
		Venta venta = repository.save(v);
		return repository.save(venta);
	}
	
	
	private Venta guardarDetallesVenta(Venta venta) throws Exception {
		List<DetalleVenta> detalles = new ArrayList<>();
		for(DetalleVenta d : venta.getDetalleVenta()) {
			detalles.add(detalleVentaService.nuevo(d,venta.getTipoPago(),venta.getNegocio()));
		}
		venta.setDetalleVenta(detalles);
		return venta;
	}
	
	private Venta guardarClientes(Venta venta) throws Exception {
		Cliente c = new Cliente();
		if(venta.getCliente().getId()>=1) {
			c = clienteService.editar(venta.getCliente());
		}else {
			c = clienteService.nuevo(venta.getCliente());
		}
		venta.setCliente(c);
		//c.addVenta(venta);
		return venta;
	}
	
	public long contar(Negocio negocio,
			String busqueda, LocalDateTime fechaInicio, LocalDateTime fechaFin) {
		Specification<Venta> spec = buildSpecification(negocio,false,false,false,busqueda,fechaInicio,fechaFin);
		return repository.findAll(spec).size();
	}
	
	@Transactional
	public List<Venta> listar(Negocio negocio, int page, int size, 
			boolean asc, boolean porFechaHora, boolean porTotalVta,
			String busqueda, LocalDateTime fechaInicio, LocalDateTime fechaFin) {
		PageRequest pageable = PageRequest.of(page, size);
		Specification<Venta> spec = buildSpecification(negocio,asc,porFechaHora,porTotalVta,busqueda,fechaInicio,fechaFin);
		return repository.findAll(spec, pageable).get().toList();
	}
	
	private Specification<Venta> buildSpecification(Negocio negocio,
			boolean asc, boolean porFechaHora, boolean porTotalVta,
			String busqueda, LocalDateTime fechaInicio, LocalDateTime fechaFin) {
		Specification<Venta> spec = Specification.where(VentaSpecification.byNegocio(negocio));
		if(porFechaHora || porTotalVta) {
			spec = spec.and(porFechaHora ? VentaSpecification.orderByFechaHora(asc) : VentaSpecification.orderByTotalVenta(asc));
		}
		if(busqueda.length() >= 3) {
			spec = spec.and(VentaSpecification.filterByCliente(busqueda));
		}
        if (fechaInicio != null) {
            spec = spec.and(VentaSpecification.fechaMayorQue(fechaInicio));
        }
        if (fechaFin != null) {
            spec = spec.and(VentaSpecification.fechaMenorQue(fechaFin));
        }
        return spec;
	}
	
	
	
}
