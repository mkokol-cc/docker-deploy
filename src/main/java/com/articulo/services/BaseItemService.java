package com.articulo.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.articulo.model.Articulo;
import com.articulo.model.BaseItem;
import com.articulo.model.Combo;
import com.articulo.model.Item;
import com.articulo.model.Negocio;
import com.articulo.repositoies.BaseItemRepository;

@Service
public class BaseItemService {

	@Autowired
	private BaseItemRepository repository;
	@Autowired
	private ComboService comboService;
	@Autowired
	private ArticuloService articuloService;
	
	public BaseItem obtenerPorCodigoYNegocio(String codigo, Negocio negocio) {
		Optional<BaseItem> item = repository.findByCodigoAndNegocio(codigo, negocio);
		return item.isPresent() ? item.get() : null;
	}
	
	public BaseItem obtenerPorId(long id) {
		BaseItem item = repository.findById(id).orElseThrow();
		return item;
	}
	
	public void reducirStock(BaseItem item, Integer cantidadARestar) throws Exception {
        if (item instanceof Articulo) {
            articuloService.reducirStock(item.getId(), cantidadARestar);
        } else if (item instanceof Combo) {
            comboService.reducirStock(item.getId(), cantidadARestar);
        } else {
            throw new Exception("El objeto no es una instancia de ninguna subclase conocida");
        }
	}
	
	public List<Item> listar(Negocio negocio){
		return listar().stream().filter(a->a.getNegocio().equals(negocio)).collect(Collectors.toList());
	}
	
	public List<BaseItem> listar(){
		return repository.findAll();
	}
}
