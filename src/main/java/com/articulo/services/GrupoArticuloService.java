package com.articulo.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.articulo.model.GrupoArticulo;
import com.articulo.model.Negocio;
import com.articulo.repositoies.GrupoArticuloRepository;

@Service
public class GrupoArticuloService {

	@Autowired
	private GrupoArticuloRepository repository;
	
	public List<GrupoArticulo> listar(Negocio negocio) {
		return listar().stream().filter(c->c.getNegocio().equals(negocio)).collect(Collectors.toList());
	}
	
	public List<GrupoArticulo> listar(){
		return repository.findAll();
	}

	public GrupoArticulo nuevo(GrupoArticulo GrupoArticulo) {
		return repository.save(GrupoArticulo);
	}

	public GrupoArticulo editar(GrupoArticulo GrupoArticulo) throws Exception {
		GrupoArticulo guardado = obtenerPorId(GrupoArticulo.getId());
		guardado.editar(GrupoArticulo);
		return repository.save(guardado);
	}

	public void eliminarPorId(long id) throws Exception {
		GrupoArticulo guardado = obtenerPorId(id);
		repository.deleteById(guardado.getId());
	}
	
	public GrupoArticulo obtenerPorId(long id) throws Exception {
		return repository.findById(id).orElseThrow(()->new Exception("No hay un grupo con el id: "+id));//lanzar exepcion
		//return repository.getById(id);//lanzar exepcion
	}
}
