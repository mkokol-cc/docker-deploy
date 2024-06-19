package com.articulo.services;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.articulo.model.ArticuloCombo;
import com.articulo.model.BaseItem;
import com.articulo.model.Combo;
import com.articulo.model.Negocio;
import com.articulo.repositoies.ComboRepository;
import com.articulo.repositoies.ComboSpecification;
import com.configuration.CustomUniqueConstraintViolationException;

import jakarta.transaction.Transactional;

@Service
public class ComboService {
	
	@Autowired
	private ComboRepository repository;
	@Autowired
	private ArticuloService articuloService;
	@Autowired
	private ArticuloComboService articuloComboService;
	@Autowired
	private BaseItemService baseItemService;

	private Combo save(Combo combo) {
		BaseItem guardado = baseItemService.obtenerPorCodigoYNegocio(combo.getCodigo(), combo.getNegocio());
		if((guardado.getId()==combo.getId() && combo.getType().equals(guardado.getType())) || guardado==null) {
			return repository.save(combo);
		}else {
			throw new CustomUniqueConstraintViolationException("Ya existe un item con el mismo código");
		}
	}
	
	public List<Combo> listar(Negocio negocio) {
		return listar().stream().filter(c->c.getNegocio().equals(negocio)).collect(Collectors.toList());
	}
	
	
	
	
	
	
	@Transactional
    public List<Combo> listar(Negocio negocio, int page, int size, boolean asc, 
    		boolean porNombre, boolean porPrecioCompra, boolean porCodigo,
    		String busqueda) {
        Pageable pageable = PageRequest.of(page, size);
        Specification<Combo> spec = buildSpecification(negocio,asc,porNombre,porPrecioCompra,porCodigo,busqueda);
        return repository.findAll(spec, pageable).get().toList();
    }
	
	private Specification<Combo> buildSpecification(Negocio negocio, boolean asc, 
    		boolean porNombre, boolean porPrecioCompra, boolean porCodigo,
    		String busqueda) {
		Specification<Combo> spec = Specification.where(ComboSpecification.byNegocio(negocio));
        if (porNombre || porCodigo) {
        	String orderByProperty = porNombre ? "nombre" : porPrecioCompra ? "precioCompra" : "codigo";
        	spec = spec.and(ComboSpecification.orderBy(orderByProperty, asc));
        }
        if(porPrecioCompra) {
        	spec = spec.and(ComboSpecification.orderByTotalArticuloPrecioCompra(asc));
        }
        if(busqueda.trim().length()>=3) {
        	spec = spec.and(ComboSpecification.filterByBusqueda(busqueda));
        }
        return spec;
	}
	
	public long contar(Negocio negocio, String busqueda) {
		Specification<Combo> spec = buildSpecification(negocio,false,false,false,false,busqueda);
		return repository.findAll(spec).size();
	}
	
	
	public List<Combo> listar(){
		return repository.findAll();
	}
	@Transactional
	public Combo nuevo(Combo combo) throws Exception {
		combo = actualizarArticulos(combo);
		return guardar(combo);
	}

	public Combo editar(Combo combo) throws Exception {
		combo = actualizarArticulos(combo);
		Combo guardado = repository.findById(combo.getId()).orElseThrow();//lanzar exepcion
		guardado.editar(combo);
		return guardar(guardado);
	}
	@Transactional
	public void eliminarPorId(long id) throws Exception {
		Combo guardado = obtenerPorId(id);/*
		List<ArticuloCombo> listaArticuloCombo = guardado.getArticulos(); 
		for(ArticuloCombo a : listaArticuloCombo) {
			System.out.println("Voy a eliminar el "+a.getId());
			articuloComboService.eliminarPorId(a.getId());
		}
		guardado.setArticulos(new ArrayList<>());*/
		repository.deleteById(guardado.getId());
	}

	public Combo obtenerPorId(long id) throws Exception {
		return repository.findById(id).orElseThrow(()->new Exception("No hay un combo con el id: "+id));//lanzar exepcion
		//return repository.getById(id);//lanzar exepcion
	}
	
	public void reducirStock(long idCombo, Integer cantidad) throws Exception {
		Combo comboDB = obtenerPorId(idCombo);
		comboDB.reducirStock(cantidad);
		for(ArticuloCombo articuloCombo : comboDB.getArticulos()) {
			articuloService.reducirStock(articuloCombo.getArticulo().getId(), articuloCombo.getCantidad()*cantidad);
		}
	}
	
	
	
	
	
	private Combo actualizarArticulos(Combo combo) throws Exception {		
		Combo c = new Combo();
		for (ArticuloCombo entrada : combo.getArticulos()) {
			c.addArticulo(articuloService.obtenerPorId(entrada.getArticulo().getId()),entrada.getCantidad());
		}
		combo.setArticulos(c.getArticulos());
		return combo;
	}
	
	private List<ArticuloCombo> guardarArticulos(Combo combo) {
		List<ArticuloCombo> articulosComboGuardados = new ArrayList<>();
		for(ArticuloCombo articuloCombo : combo.getArticulos()) {
			articuloCombo.setCombo(combo);
			ArticuloCombo guardado = articuloComboService.nuevo(articuloCombo);
			articulosComboGuardados.add(guardado);
		}
		return articulosComboGuardados;
	}
	
	private Combo guardar(Combo combo) {
		combo.setType("Combo");
		List<ArticuloCombo> lista = combo.getArticulos();
		combo.setArticulos(new ArrayList<>());
		Combo guardado = save(combo);
		guardado.setArticulos(lista);
		List<ArticuloCombo> articulosComboGuardados = guardarArticulos(guardado);
		guardado.setArticulos(articulosComboGuardados);
		return guardado;
	}

}
