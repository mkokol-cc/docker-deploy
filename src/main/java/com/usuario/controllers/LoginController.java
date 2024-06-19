package com.usuario.controllers;

import java.nio.file.AccessDeniedException;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.usuario.jwt.JwtHelper;
import com.usuario.model.Usuario;
import com.usuario.services.UsuarioService;

import jakarta.validation.Valid;

//@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class LoginController {
	
    @Autowired
    private AuthenticationManager authenticationManager;


	
	private final UsuarioService usuarioService;

	public LoginController(UsuarioService usuarioService) {
		this.usuarioService = usuarioService;
	}
	

	@PostMapping("/signup")
	public ResponseEntity<Void> signup(@Valid @RequestBody Usuario usuario) {
		usuarioService.signup(usuario);
		return ResponseEntity.status(HttpStatus.CREATED).build();
	}
	
	
	@PostMapping("/login")
	public ResponseEntity<String> login(@RequestBody Usuario usuario) {
	    authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(usuario.getNombre(), usuario.getClave()));
	    String token = JwtHelper.generateToken(usuario.getNombre());
	    return ResponseEntity.ok(token);
	}

	@GetMapping("/my-account")
	public ResponseEntity<Usuario> getAuthenticatedUser(@RequestHeader("Authorization") String tokenHeader) throws AccessDeniedException {
		return ResponseEntity.ok(usuarioService.getUserByToken(tokenHeader));
	}
	
	@PostMapping("/my-account")
	public ResponseEntity<Usuario> editAuthenticatedUser(@RequestHeader("Authorization") String tokenHeader, @Valid @RequestBody Usuario usuario) throws AccessDeniedException {
		Usuario u = usuarioService.getUserByToken(tokenHeader);
		//hay datos que el mismo usuario no puede modificar, lo debe hacer alguien con el Rol USUARIO_EDITOR
		//desde un endpoint del UsuarioController
		return ResponseEntity.ok(usuarioService.editarUsuario(u));
	}
	
	@GetMapping("/auth")
	public ResponseEntity<?> misRoles(){
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        // Ejemplo de cómo obtener roles/autoridades del usuario
        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        List<String> roles = authorities.stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList());
        return ResponseEntity.ok("Hola " + username + "! Tus roles son: " + roles);
	}
	
	
}
