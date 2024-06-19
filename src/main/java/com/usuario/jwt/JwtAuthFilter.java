package com.usuario.jwt;

import java.util.Collection;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.configuration.CustomExceptionHandler;

import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.io.IOException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

	private final UserDetailsServiceImpl userDetailsService;
	private final CustomExceptionHandler customExceptionHandler;

	public JwtAuthFilter(UserDetailsServiceImpl userDetailsService, CustomExceptionHandler customExceptionHandler) {
		this.userDetailsService = userDetailsService;
		this.customExceptionHandler = customExceptionHandler;
	}

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException, java.io.IOException {
		try {
			String authHeader = request.getHeader("Authorization");
			String token = null;
			String username = null;
			if (authHeader != null && authHeader.startsWith("Bearer ")) {
				token = authHeader.substring(7);
				username = JwtHelper.extractUsername(token);
			}
			//If the accessToken is null. It will pass the request to next filter in the chain.
			//Any login and signup requests will not have jwt token in their header, therefore they will be passed to next filter chain.
			if (token == null) {
				filterChain.doFilter(request, response);
				return;
			}
			//If any accessToken is present, then it will validate the token and then authenticate the request in security context
			if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
				UserDetails userDetails = userDetailsService.loadUserByUsername(username);
				Collection<? extends GrantedAuthority> authorities = userDetails.getAuthorities();
				if (JwtHelper.validateToken(token, userDetails)) {
					UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userDetails, null, authorities);
					authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
					SecurityContextHolder.getContext().setAuthentication(authenticationToken);
				}
			}
			filterChain.doFilter(request, response);
		} catch (AccessDeniedException e) {
			customExceptionHandler.handle(request, response, e);
		} catch (MalformedJwtException e) {
			customExceptionHandler.commence(request, response, e);
        } 
        return;
	}

}
