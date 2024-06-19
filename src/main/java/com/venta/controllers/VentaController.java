package com.venta.controllers;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.articulo.model.Negocio;
import com.articulo.services.BaseItemService;
import com.usuario.services.UsuarioService;
import com.venta.model.Venta;
import com.venta.services.VentaService;

@RestController
@CrossOrigin("*")
public class VentaController {
	
	@Autowired
	private VentaService service;
	@Autowired
	private BaseItemService serviceBaseItem;
	@Autowired
	private UsuarioService usuarioService;
	
	@GetMapping("/{negocio}/venta")
	public ResponseEntity<List<Venta>> listar(@PathVariable Negocio negocio,
			@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "10") int size,
			@RequestParam(defaultValue = "false") boolean asc,
			@RequestParam(defaultValue = "false") boolean porFechaHora,
			@RequestParam(defaultValue = "false") boolean porTotalVta,
			@RequestParam(defaultValue = "") String busqueda,			
			@RequestParam(defaultValue = "") LocalDate fechaInicio,//formato YYYY-MM-DD o 2024-05-22
			@RequestParam(defaultValue = "") LocalDate fechaFin){
		//localDate to LocalDateTime
		LocalDateTime fechaInicioDateTime = null;
        LocalDateTime fechaFinDateTime = null;
        if (fechaInicio != null) {
        	fechaInicioDateTime = fechaInicio.atStartOfDay();
        }
        if (fechaFin != null) {
        	fechaFinDateTime = fechaFin.atTime(LocalTime.MAX);
        }
		return ResponseEntity.ok(service.listar(negocio,page,size,asc,porFechaHora,porTotalVta,busqueda,fechaInicioDateTime,fechaFinDateTime));
	}
	
	@GetMapping("/{negocio}/venta/item")
	public ResponseEntity<?> contar(@PathVariable Negocio negocio,
			@RequestParam(defaultValue = "") String codigo){
		return ResponseEntity.ok(serviceBaseItem.obtenerPorCodigoYNegocio(codigo, negocio));
	}
	
	@GetMapping("/{negocio}/venta/count")
	public ResponseEntity<Long> contar(@PathVariable Negocio negocio,
			@RequestParam(defaultValue = "") String busqueda,			
			@RequestParam(defaultValue = "") LocalDate fechaInicio,//formato YYYY-MM-DD o 2024-05-22
			@RequestParam(defaultValue = "") LocalDate fechaFin){
		LocalDateTime fechaInicioDateTime = null;
        LocalDateTime fechaFinDateTime = null;
        if (fechaInicio != null) {
        	fechaInicioDateTime = fechaInicio.atStartOfDay();
        }
        if (fechaFin != null) {
        	fechaFinDateTime = fechaFin.atTime(LocalTime.MAX);
        }
		return ResponseEntity.ok(service.contar(negocio,busqueda,fechaInicioDateTime,fechaFinDateTime));
	}
	
	@PostMapping("/{negocio}/venta")
	public ResponseEntity<Venta> nuevo(@RequestHeader("Authorization") String tokenHeader, @RequestBody Venta venta, @PathVariable Negocio negocio) throws Exception{
		venta.setUsuario(usuarioService.getUserByToken(tokenHeader));
		venta.setNegocio(negocio);
		return ResponseEntity.ok(service.nuevo(venta));
	}
	
	@DeleteMapping("/{negocio}/venta/{id}")
	public ResponseEntity<Void> borrar(@PathVariable Negocio negocio, @PathVariable long id){
		//if(service.getById(id).getNegocio()==negocio) continuar sino exception (no podes borrar articulos de otro negocio)
		//no se va a poder eliminar si tiene asociado Articulos
		service.eliminarPorId(id);
		return ResponseEntity.status(HttpStatus.ACCEPTED).build();
	}

}
