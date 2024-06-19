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

import com.usuario.model.Usuario;
import com.usuario.services.UsuarioService;

import jakarta.validation.Valid;

@RestController
//@CrossOrigin("*")
@RequestMapping("/usuario")
public class UsuarioController {

	@Autowired
	private UsuarioService usuarioService;
	
	@PostMapping("")
	public ResponseEntity<Usuario> guardarUsuario(@Valid @RequestBody Usuario usuario){
		return ResponseEntity.ok(usuarioService.encriptarYGuardarUsuario(usuario));
	}
	
	@GetMapping("")
	public ResponseEntity<List<Usuario>> listarUsuarios(){
		return ResponseEntity.ok(usuarioService.listarUsuarios()); 
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> eliminarUsuario(@PathVariable Long id){
		usuarioService.eliminarUsuario(id);
		return ResponseEntity.status(HttpStatus.ACCEPTED).build();
	}
}
