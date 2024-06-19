package com.usuario.services;


import java.nio.file.AccessDeniedException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.usuario.jwt.JwtHelper;
import com.usuario.jwt.UserDetailsServiceImpl;
import com.usuario.model.Usuario;
import com.usuario.repositories.UsuarioRepositorio;

@Service
@Transactional(readOnly = true)
public class UsuarioService {

	@Autowired
	private UsuarioRepositorio repository;
	
    @Autowired
    private UserDetailsServiceImpl userDetailsService;
	
	private final PasswordEncoder passwordEncoder;

	public UsuarioService(PasswordEncoder passwordEncoder) {
		this.passwordEncoder = passwordEncoder;
	}

	@Transactional
	public void signup(Usuario request) {
		String email = request.getNombre();
		Optional<Usuario> existingUser = repository.findByNombre(email);
		if (existingUser.isPresent()) {
			throw new DuplicateKeyException(String.format("El usuario con el nombre '%s' ya esta registrado.", email));
		}
		String claveEncriptada = passwordEncoder.encode(request.getClave());
		Usuario user = new Usuario(email, claveEncriptada);
		repository.save(user);
	}
	
	public List<Usuario> listarUsuarios(){
		return repository.findAll();
	}
	
	public Usuario editarUsuario(Usuario u) {
		Usuario guardado = getById(u.getId());
		guardado.editar(u);
		return guardarUsuario(guardado);
	}
	
	@Transactional
	public Usuario encriptarYGuardarUsuario(Usuario u) {
		if(repository.existsById(u.getId())) {
			Usuario db = getById(u.getId());
			if(u.getClave().equals(db.getClave())) {
				return repository.save(u);
			}else {
				return repository.save(encriptarClave(u));
			}
		}else {
			return repository.save(encriptarClave(u));
			//return null;	
		}
	}
	
	private Usuario encriptarClave(Usuario u) {
		String claveEncriptada = passwordEncoder.encode(u.getClave());
		u.setClave(claveEncriptada);
		return u;
	}
	
	public Usuario guardarUsuario(Usuario u) {
		return repository.save(u);
	}
	
	@Transactional
	public void eliminarUsuario(Usuario u) {
		repository.delete(u);
	}
	@Transactional
	public void eliminarUsuario(long id) {
		repository.deleteById(id);
	}
	
	
	
	public Usuario getById(long id) {
		return repository.findById(id).orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado con el id: " + id));
	}
	public Usuario getByEmail(String email) {
		return repository.findByNombre(email).orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado con el nombre: " + email));
	}
	
	public Usuario getUserByToken(String token) throws AccessDeniedException {
		String t = token.substring(7); // Elimina el prefijo 'Bearer ' del token
        UserDetails userDetails =  this.userDetailsService.loadUserByUsername(JwtHelper.extractUsername(t));
        JwtHelper.validateToken(t,userDetails);
        return getByEmail(userDetails.getUsername());
	}
	
}
