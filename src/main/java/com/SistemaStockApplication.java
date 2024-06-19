package com;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.core.SpringVersion;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class SistemaStockApplication {

	public static void main(String[] args) {
		SpringApplication.run(SistemaStockApplication.class, args);
		System.out.println("Spring Framework version: " + SpringVersion.getVersion());
	}

    @Bean
    WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**")
				.allowedOrigins("*")                
				.allowedMethods("*")
                .allowedHeaders("*");
			}
		};
	}

}
