package com.usuario.model;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotBlank;

@Entity
public class Perfil {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	
	//un perfil es un grupo de permisos (o roles en este caso) que tiene un usuario
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(
		name = "perfil_rol", 
		joinColumns = @JoinColumn(name = "perfil_id"), 
		inverseJoinColumns = @JoinColumn(name = "rol_id")
	)
	private List<Rol> roles = new ArrayList<>();
	
	//un perfil es usado por 1 o mas usuarios
	@JsonIgnore
	@OneToMany(fetch = FetchType.EAGER)
	@JoinColumn(name="perfil_id")
	private List<Usuario> usuarios = new ArrayList<>();
	
	@Column
	@NotBlank(message = "El nombre es obligatorio")
	private String nombre;
	
	

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public List<Rol> getRoles() {
		return roles;
	}

	public void setRoles(List<Rol> roles) {
		this.roles = roles;
	}

	public List<Usuario> getUsuarios() {
		return usuarios;
	}

	public void setUsuarios(List<Usuario> usuarios) {
		this.usuarios = usuarios;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	
	public void addRol(Rol rol) {
		this.roles.add(rol);
	}
	
}
