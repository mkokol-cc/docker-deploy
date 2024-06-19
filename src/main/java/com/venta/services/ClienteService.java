package com.venta.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.articulo.model.Negocio;
import com.venta.model.Cliente;
import com.venta.repositories.ClienteRepository;

@Service
public class ClienteService {
	
	@Autowired
	private ClienteRepository repository;
	
	public List<Cliente> listar(Negocio negocio) {
		List<Cliente> listaClientesNegocio = listar()
				.stream()
				.filter(
						c -> c
						.getVentas()
						.stream()
						.anyMatch(
								v -> v
								.getNegocio()
								.equals(negocio)
								)
						)
				.collect(Collectors.toList());
		return listaClientesNegocio;
	}
	
	public Cliente nuevo(Cliente cliente) {
		return repository.save(cliente);
	}
	
	public List<Cliente> listar(){
		return repository.findAll();
	}

	public Cliente editar(Cliente cliente) throws Exception {
		Cliente guardado = obtenerPorId(cliente.getId());
		guardado.editar(cliente);
		return repository.save(guardado);
	}

	public void eliminarPorId(long id) {
		repository.deleteById(id);
	}
	
	public Cliente obtenerPorId(long id) throws Exception {
		return repository.findById(id).orElseThrow(()->new Exception("No hay un cliente con el id: "+id));//lanzar exepcion
		//return repository.getById(id);//lanzar exepcion
	}

}
