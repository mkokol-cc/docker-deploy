package com;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.usuario.model.Perfil;
import com.usuario.model.Rol;
import com.usuario.model.Usuario;
import com.usuario.repositories.PerfilRepositorio;
import com.usuario.repositories.RolRepositorio;
import com.usuario.repositories.UsuarioRepositorio;

import jakarta.annotation.PostConstruct;

@Component
public class InitialData {

    @Autowired
    private UsuarioRepositorio usuarioRepository;
    @Autowired
    private PerfilRepositorio perfilRepository;
    @Autowired
    private RolRepositorio rolRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostConstruct
    public void inicializarDatos() {
    	System.out.println("Se creara el usuario administrador si no ha sido creado...");
        // Verificar si el usuario administrador ya está presente en la base de datos
        if (!usuarioRepository.findByNombre("superuser").isPresent()) {
        	//crear todos las autoridades
        	crearRoles();
        	//crear un perfil superuser con todas las autoridades
        	Perfil superUser = crearPerfilSuperUsuario();
            crearUsuarioSuperUsuario(superUser);
            System.out.println("¡Se ha creado el usuario administrador correctamente!");
        }
    }
    
    private void crearRoles() {
    	List<String> listaDeRoles = new ArrayList<>();
        // Agregar elementos a la lista
    	listaDeRoles.add("FERRETERÍA");
    	listaDeRoles.add("MUEBLERÍA");
    	listaDeRoles.add("SEGURIDAD");
    	listaDeRoles.add("ARTICULO_VIEWER");
    	listaDeRoles.add("ARTICULO_EDITOR");
    	listaDeRoles.add("GRUPO_ARTICULO_VIEWER");
    	listaDeRoles.add("GRUPO_ARTICULO_EDITOR");
    	listaDeRoles.add("COMBO_VIEWER");
    	listaDeRoles.add("COMBO_EDITOR");
    	listaDeRoles.add("VENTA_VIEWER");
    	listaDeRoles.add("VENTA_EDITOR");
    	listaDeRoles.add("CLIENTE_VIEWER");
    	listaDeRoles.add("CLIENTE_EDITOR");
    	listaDeRoles.add("PERFIL_VIEWER");
    	listaDeRoles.add("PERFIL_EDITOR");
    	listaDeRoles.add("USUARIO_VIEWER");
    	listaDeRoles.add("USUARIO_EDITOR");
    	/*
    			PERFIL_EDITOR
	        	PERFIL_VIEWER
	        	USUARIO_EDITOR
	        	USUARIO_VIEWER
    			
    			FERRETERÍA
	        	MUEBLERÍA
	        	SEGURIDAD
	        	ARTICULO_VIEWER
	        	ARTICULO_EDITOR
	        	GRUPO_ARTICULO_VIEWER
	        	GRUPO_ARTICULO_EDITOR
	        	COMBO_VIEWER
	        	COMBO_EDITOR
	        	VENTA_VIEWER
	        	VENTA_EDITOR
	        	CLIENTE_VIEWER
	        	CLIENTE_EDITOR
    	 */
        for (String cadena : listaDeRoles) {
        	Rol db = new Rol();
        	db.setNombre(cadena);
        	db.setDescripcion("");
            rolRepository.save(db);
        }
    }
    private Perfil crearPerfilSuperUsuario() {
    	Perfil su = new Perfil();
    	su.setNombre("ROOT");
    	su.setRoles(rolRepository.findAll());
    	return perfilRepository.save(su);
    }
    private void crearUsuarioSuperUsuario(Perfil p) {
        Usuario admin = new Usuario();
        admin.setNombre("superuser");
        admin.setPerfil(p);
        // Aquí debes cifrar la contraseña, por ejemplo, utilizando PasswordEncoder
        admin.setClave(passwordEncoder.encode("contraseña"));
        usuarioRepository.save(admin);
    }
}
