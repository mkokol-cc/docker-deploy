package com.usuario.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.usuario.model.Rol;
import com.usuario.repositories.RolRepositorio;

@Service
public class RolService {
	
	private final RolRepositorio repository;

	public RolService(RolRepositorio repository) {
		this.repository = repository;
	}
	
	public List<Rol> listarRoles(){
		return repository.findAll();
	}

}
