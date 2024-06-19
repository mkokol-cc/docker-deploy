package com.articulo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.articulo.model.ArticuloCombo;
import com.articulo.repositoies.ArticuloComboRepository;

import jakarta.transaction.Transactional;

@Service
public class ArticuloComboService {
	
	@Autowired
	private ArticuloComboRepository repository;
	
	public ArticuloCombo nuevo(ArticuloCombo articuloCombo) {
		return repository.save(articuloCombo);
	}
	@Transactional
	public void eliminarPorId(long id) throws Exception {
		ArticuloCombo guardado = obtenerPorId(id);
		System.out.println("Se encontro el ArticuloCombo "+guardado.getId()+" - "+guardado.getCombo().getId());
		repository.deleteById(guardado.getId());
		System.out.println("Se elimino");
	}
	
	public ArticuloCombo obtenerPorId(long id) throws Exception {
		return repository.findById(id).orElseThrow(()->new Exception("No hay un articulo de combo con el id: "+id));//lanzar exepcion
		//return repository.getById(id);//lanzar exepcion
	}
	
}
