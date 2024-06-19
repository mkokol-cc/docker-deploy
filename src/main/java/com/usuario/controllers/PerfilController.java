package com.usuario.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.usuario.model.Perfil;
import com.usuario.services.PerfilService;

import jakarta.validation.Valid;

@RestController
//@CrossOrigin("*")
@RequestMapping("/perfil")
public class PerfilController {

	@Autowired
	private PerfilService perfilService;
	
	@PostMapping("")
	public ResponseEntity<Perfil> guardarPerfil(@Valid @RequestBody Perfil perfil){
		return ResponseEntity.ok(perfilService.guardarPerfil(perfil));
	}
	
	@GetMapping("")
	public ResponseEntity<List<Perfil>> listarPerfiles(){
		return ResponseEntity.ok(perfilService.listarPerfiles()); 
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> eliminarPerfil(@PathVariable Long id) throws Exception{
		perfilService.eliminarPerfil(id);
		return ResponseEntity.status(HttpStatus.ACCEPTED).build();
	}
	
	/*
	public ResponseEntity<Perfil> editarPerfil(@RequestBody Perfil perfil){
		return ResponseEntity.ok(perfilRepo.save(perfil));
	}
	*/
}
