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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.articulo.model.Combo;
import com.articulo.model.Negocio;
import com.articulo.services.ComboService;

import jakarta.validation.Valid;

@RestController
@CrossOrigin("*")
public class ComboController {
	
	@Autowired
	private ComboService service;

	@GetMapping("/{negocio}/combo")
	public ResponseEntity<List<Combo>> listar(@PathVariable Negocio negocio,
			@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "10") int size,
			@RequestParam(defaultValue = "false") boolean asc,
			@RequestParam(defaultValue = "false") boolean porNombre,
			@RequestParam(defaultValue = "false") boolean porPrecioCompra,
			@RequestParam(defaultValue = "false") boolean porCodigo,
			@RequestParam(defaultValue = "") String busqueda){
		return ResponseEntity.ok(service.listar(negocio, page, size, asc, porNombre, porPrecioCompra, porCodigo, busqueda));
	}
	
	@GetMapping("/{negocio}/combo/count")
	public ResponseEntity<Long> contar(@PathVariable Negocio negocio,
			@RequestParam(defaultValue = "") String busqueda){
		return ResponseEntity.ok(service.contar(negocio, busqueda));
	}
	
	@PostMapping("/{negocio}/combo")
	public ResponseEntity<Combo> nuevo(@RequestBody @Valid Combo combo, @PathVariable Negocio negocio) throws Exception{
		combo.setNegocio(negocio);
		return ResponseEntity.ok(service.nuevo(combo));
	}
	
	@PostMapping("/{negocio}/combo/{id}")
	public ResponseEntity<Combo> editar(@RequestBody @Valid Combo combo, @PathVariable Negocio negocio, @PathVariable long id) throws Exception{
		//if(service.getById(id).getNegocio()==negocio) continuar sino exception
		return ResponseEntity.ok(service.editar(combo));
	}
	
	@DeleteMapping("/{negocio}/combo/{id}")
	public ResponseEntity<Void> borrar(@PathVariable Negocio negocio, @PathVariable long id) throws Exception{
		//if(service.getById(id).getNegocio()==negocio) continuar sino exception (no podes borrar articulos de otro negocio)
		service.eliminarPorId(id);
		return ResponseEntity.status(HttpStatus.ACCEPTED).build();
	}
	
}
