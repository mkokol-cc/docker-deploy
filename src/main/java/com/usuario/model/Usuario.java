package com.usuario.model;

import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.venta.model.Venta;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotBlank;

@Entity
public class Usuario implements UserDetails {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	
	//un Usuario tiene un perfil, el cual tiene uno o varios roles (o permisos)
    @ManyToOne
	private Perfil perfil;
	
	//un usuario tiene un nombre de usuario (en este caso es su email) y clave, para su autenticacion
    @Column(unique = true)
    @NotBlank(message = "El nombre es obligatorio")
    //@Email(message = "Debe ser un correo electrónico válido")
	private String nombre;

    //@Size(min = 6, message = "La contraseña debe tener al menos 6 caracteres")
    //no voy a validar el size de las contraseñas, ya que se encriptan
    @Column
    @NotBlank(message = "La contraseña es obligatoria")
	private String clave;
    
	//relacion con articulo
    @JsonIgnore
	@OneToMany(mappedBy = "usuario", fetch = FetchType.EAGER)
	private List<Venta> ventas;
	
	public Usuario() {
		super();
		// TODO Auto-generated constructor stub
	}

	//luego tiene todos los detalles propios de la logica de negocio
    public Usuario(String nombre, String clave) {
    	this.nombre=nombre;
    	this.clave=clave;
    }
    
	public void editar(Usuario u) {
		/*
		this.dato = u.dato
		(como no hay datos personales del usuario este metodo no hace nada)
		*/
	}
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public Perfil getPerfil() {
		return perfil;
	}
	public void setPerfil(Perfil perfil) {
		this.perfil = perfil;
	}
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	public String getClave() {
		return clave;
	}
	public void setClave(String clave) {
		this.clave = clave;
	}
	
	
	public List<Venta> getVentas() {
		return ventas;
	}

	public void setVentas(List<Venta> ventas) {
		this.ventas = ventas;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
        Set<Authority> autoridades = new HashSet<>();
        if(getPerfil()==null || getPerfil().getRoles().isEmpty()) {
        	autoridades.add(new Authority("NONE"));
        }else {
    		getPerfil().getRoles().forEach(rol -> {
    			autoridades.add(new Authority(rol.getNombre()));
            });	
        }
        return autoridades;
	}

	@Override
	public String getPassword() {
		return getClave();
	}

	@Override
	public String getUsername() {
		return getNombre();
	}

	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return false;
	}
	
}
