package com.usuario.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;

@Entity
public class Rol {
	//un rol es una credencial que le da permisos o no a un usuario de hacer algo
	//tambien lo podemos implementar con un Enum, en lugar de una clase
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	
	//un rol es una credencial que le da permisos o no a un usuario de hacer algo,
	//varios perfiles tienen varios roles, por lo tanto es una relacion ManyToMany
	@JsonIgnore
	@ManyToMany(mappedBy = "roles")
	private List<Perfil> perfiles;
	
	//tambien tiene un nombre que lo identifica
	@Column
	private String nombre;
	
	//descripcion acerca del permiso que representa el rol
	@Column
	private String descripcion;
	
	//luego tiene todos los detalles propios de la logica de negocio
	public Rol() {
		super();
	}
	public Rol(String nombre, String descripcion) {
		super();
		this.nombre = nombre;
		this.descripcion = descripcion;
	}
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public List<Perfil> getPerfiles() {
		return perfiles;
	}
	public void setPerfiles(List<Perfil> perfiles) {
		this.perfiles = perfiles;
	}
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	public String getDescripcion() {
		return descripcion;
	}
	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}
}
