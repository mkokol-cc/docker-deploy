package com.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.usuario.jwt.JwtAuthFilter;
import com.usuario.jwt.UserDetailsServiceImpl;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

	private final UserDetailsServiceImpl userDetailsService;
	private final JwtAuthFilter jwtAuthFilter;
	private final CustomExceptionHandler customExceptionHandler;

	public WebSecurityConfig(UserDetailsServiceImpl userDetailsService, JwtAuthFilter jwtAuthFilter, CustomExceptionHandler customExceptionHandler) {
		this.userDetailsService = userDetailsService;
		this.jwtAuthFilter = jwtAuthFilter;
		this.customExceptionHandler = customExceptionHandler;
	}
	
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http, AuthenticationManager authenticationManager) throws Exception {
	    return http
	        //.cors(AbstractHttpConfigurer::disable)
	        //.cors(cors -> cors.disable())
	    	.cors(Customizer.withDefaults())
	        .csrf(AbstractHttpConfigurer::disable)
	        .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
	        //Set permissions on endpoints
	        .authorizeHttpRequests(auth -> auth
	        	//our public endpoints
	        	.requestMatchers(HttpMethod.POST, "/signup").permitAll()
	        	.requestMatchers(HttpMethod.POST, "/login").permitAll()
	        	//.requestMatchers(HttpMethod.GET, "/auth").permitAll()//comentar luego
	        	
	        	//our private endpoints
	        	.requestMatchers(HttpMethod.GET,"/rol").hasAuthority("PERFIL_VIEWER")
	        	.requestMatchers(HttpMethod.GET,"/perfil").hasAuthority("PERFIL_VIEWER")
	        	.requestMatchers(HttpMethod.POST,"/perfil").hasAuthority("PERFIL_EDITOR")
	        	.requestMatchers("/perfil/**").hasAuthority("PERFIL_EDITOR")
	        	.requestMatchers(HttpMethod.GET,"/usuario").hasAuthority("USUARIO_VIEWER")
	        	.requestMatchers(HttpMethod.POST,"/usuario").hasAuthority("USUARIO_EDITOR")
	        	.requestMatchers("/usuario/**").hasAuthority("USUARIO_EDITOR")
	        	
	        	//endpoints de sistema-stock
	        	
	        	.requestMatchers("/FERRETERÍA/**").hasAuthority("FERRETERÍA")
	        	.requestMatchers("/MUEBLERÍA/**").hasAuthority("MUEBLERÍA")
	        	.requestMatchers("/SEGURIDAD/**").hasAuthority("SEGURIDAD")
	        	.requestMatchers(HttpMethod.GET,"/*/articulo").hasAuthority("ARTICULO_VIEWER")
	        	.requestMatchers(HttpMethod.GET,"/*/articulo/count").hasAuthority("ARTICULO_VIEWER")
	        	.requestMatchers(HttpMethod.POST,"/*/articulo").hasAuthority("ARTICULO_EDITOR")
	        	.requestMatchers("/*/articulo/**").hasAuthority("ARTICULO_EDITOR")
	        	.requestMatchers(HttpMethod.GET,"/*/grupo-articulo").hasAuthority("GRUPO_ARTICULO_VIEWER")
	        	.requestMatchers(HttpMethod.POST,"/*/grupo-articulo").hasAuthority("GRUPO_ARTICULO_VIEWER")
	        	.requestMatchers("/*/grupo-articulo/**").hasAuthority("GRUPO_ARTICULO_EDITOR")
	        	.requestMatchers(HttpMethod.GET,"/*/combo").hasAuthority("COMBO_VIEWER")
	        	.requestMatchers(HttpMethod.GET,"/*/combo/count").hasAuthority("COMBO_VIEWER")
	        	.requestMatchers(HttpMethod.POST,"/*/combo").hasAuthority("COMBO_VIEWER")
	        	.requestMatchers("/*/combo/**").hasAuthority("COMBO_EDITOR")
	        	.requestMatchers(HttpMethod.GET,"/*/venta").hasAuthority("VENTA_VIEWER")
	        	.requestMatchers(HttpMethod.GET,"/*/venta/count").hasAuthority("VENTA_VIEWER")
	        	.requestMatchers(HttpMethod.POST,"/*/venta").hasAuthority("VENTA_VIEWER")
	        	.requestMatchers("/*/venta/**").hasAuthority("VENTA_EDITOR")
	        	.requestMatchers(HttpMethod.GET,"/*/cliente").hasAuthority("CLIENTE_VIEWER")
	        	//.requestMatchers(HttpMethod.POST,"/*/cliente").hasAuthority("CLIENTE_VIEWER") -- no existe
	        	.requestMatchers("/*/cliente/**").hasAuthority("CLIENTE_EDITOR")
	        	        	/*AUTORIDADES*/
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

	            .anyRequest().authenticated())
	        //manejo de excepciones
	        .exceptionHandling(exception -> exception
                    .accessDeniedHandler(customExceptionHandler)
                    .authenticationEntryPoint(customExceptionHandler))
	        /*
	        .exceptionHandling((exception)-> exception.accessDeniedHandler((request, response, accessDeniedHandler) -> {
	        	response.setContentType("application/json");
	            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
	            response.getOutputStream().println("Usuario no autorizado.");//.println("{ \"error\": \"" + accessDeniedHandler.getMessage() + "\" }");
            }))
	        .exceptionHandling((exception)-> exception.authenticationEntryPoint((request, response, authException) -> {
                //response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
	        	response.setContentType("application/json");
	            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
	            response.getOutputStream().println("Usuario no autorizado.");//.println("{ \"error\": \"" + authException.getMessage() + "\" }");
            }))
	        */
	        .authenticationManager(authenticationManager)
	        
	        //.build();
	    	//Add JWT token filter
	      	
	        .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
	      	.build();
	}
	
	@Bean
	public AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
	    AuthenticationManagerBuilder authenticationManagerBuilder = http.getSharedObject(AuthenticationManagerBuilder.class);
	    authenticationManagerBuilder.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
	    return authenticationManagerBuilder.build();
	}
	
	
	/*
	@Bean
	CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();
		configuration.setAllowedOrigins("*");
		configuration.setAllowedMethods(Arrays.asList("GET","POST"));
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		return source;
	}*/
	
}
