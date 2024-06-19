package com.venta.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.articulo.model.Negocio;
import com.venta.model.Cliente;
import com.venta.services.ClienteService;

@RestController
@CrossOrigin("*")
public class ClienteController {
	
	@Autowired
	private ClienteService service;

	@GetMapping("/{negocio}/cliente")
	public ResponseEntity<List<Cliente>> listar(@PathVariable Negocio negocio){
		return ResponseEntity.ok(service.listar(negocio));
	}
	
	@PostMapping("/{negocio}/cliente/{id}")
	public ResponseEntity<Cliente> editar(@RequestBody Cliente cliente, @PathVariable Negocio negocio, @PathVariable long id) throws Exception{
		//if(service.getById(id).getNegocio()==negocio) continuar sino exception
		cliente.setId(id);	
		return ResponseEntity.ok(service.editar(cliente));
	}
	
}
