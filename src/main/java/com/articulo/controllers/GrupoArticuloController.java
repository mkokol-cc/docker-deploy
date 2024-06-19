package com.articulo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.articulo.model.GrupoArticulo;
import com.articulo.model.Negocio;
import com.articulo.services.GrupoArticuloService;

import jakarta.validation.Valid;

@RestController
@CrossOrigin("*")
public class GrupoArticuloController {
	
	@Autowired
	private GrupoArticuloService service;

	@GetMapping("/{negocio}/grupo-articulo")
	public ResponseEntity<List<GrupoArticulo>> listar(@PathVariable Negocio negocio){
		return ResponseEntity.ok(service.listar(negocio));
	}
	
	@PostMapping("/{negocio}/grupo-articulo")
	public ResponseEntity<GrupoArticulo> nuevo(@RequestBody @Valid GrupoArticulo grupo, @PathVariable Negocio negocio){
		grupo.setNegocio(negocio);
		return ResponseEntity.ok(service.nuevo(grupo));
	}
	
	@PostMapping("/{negocio}/grupo-articulo/{id}")
	public ResponseEntity<GrupoArticulo> editar(@RequestBody @Valid GrupoArticulo grupo, @PathVariable Negocio negocio, @PathVariable long id) throws Exception{
		//if(service.getById(id).getNegocio()==negocio) continuar sino exception
		grupo.setId(id);	
		return ResponseEntity.ok(service.editar(grupo));
	}
	
	@DeleteMapping("/{negocio}/grupo-articulo/{id}")
	public ResponseEntity<Void> borrar(@PathVariable Negocio negocio, @PathVariable long id) throws Exception{
		//if(service.getById(id).getNegocio()==negocio) continuar sino exception (no podes borrar articulos de otro negocio)
		//no se va a poder eliminar si tiene asociado Articulos
		service.eliminarPorId(id);
		return ResponseEntity.status(HttpStatus.ACCEPTED).build();
	}
	
}
