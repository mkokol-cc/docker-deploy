package com.usuario.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.usuario.model.Rol;
import com.usuario.services.RolService;

@RestController
@CrossOrigin("*")
@RequestMapping("/rol")
public class RolController {
	
	/**
	 * No va a haber un CRUD de roles, ya que los roles deberia estar estaticamente en la DB
	 * Ya que los roles nos van a dar acceso a diferentes endpoints y esas anotaciones 
	 * que permiten el acceso segun el rol no se pueden modificar en tiempo de ejecucion
	 */
	
	@Autowired
	private RolService rolService;
	
	@GetMapping("")
	public ResponseEntity<List<Rol>> listarRoles(){
		return ResponseEntity.ok(rolService.listarRoles()); 
	}
	
}
