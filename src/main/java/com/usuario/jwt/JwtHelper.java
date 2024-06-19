package com.usuario.jwt;


import java.nio.file.AccessDeniedException;
import java.security.Key;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

import org.springframework.security.core.userdetails.UserDetails;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;

public class JwtHelper {

	//se tiene que tener en cuenta que cada vez que se ejecuta el backend se genera una nueva SecretKey, 
	//por lo tanto un token es valido si no caduco y si se valida en la misma ejecucion que se creo
	private static final Key SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256);
	private static final int MINUTES = 60;

	public static String generateToken(String email) {
		var now = Instant.now();
		//System.out.println("El token caducara "+Date.from(now.plus(MINUTES, ChronoUnit.MINUTES)));
		return Jwts.builder()
				.setSubject(email)
				.setIssuedAt(Date.from(now))
				.setExpiration(Date.from(now.plus(MINUTES, ChronoUnit.MINUTES)))
				.signWith(SECRET_KEY)
				.compact();
	}
	
	public static String extractUsername(String token) throws AccessDeniedException {
		return getTokenBody(token).getSubject();
	}

	public static Boolean validateToken(String token, UserDetails userDetails) throws AccessDeniedException {
		final String username = extractUsername(token);
		return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
	}

	private static Claims getTokenBody(String token) throws AccessDeniedException {
		try {
			return Jwts.parserBuilder()
				.setSigningKey(SECRET_KEY)
				.build()
				.parseClaimsJws(token)
				.getBody();
		} catch (SignatureException | ExpiredJwtException e) { // Invalid signature or expired token
			throw new AccessDeniedException("Access denied: " + e.getMessage());
		}
	}

	private static boolean isTokenExpired(String token) throws AccessDeniedException {
		Claims claims = getTokenBody(token);
		return claims.getExpiration().before(new Date());
	}
	
}
