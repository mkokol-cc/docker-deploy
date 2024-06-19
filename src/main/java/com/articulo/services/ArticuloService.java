package com.articulo.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.articulo.model.Articulo;
import com.articulo.model.BaseItem;
import com.articulo.model.Imagen;
import com.articulo.model.Negocio;
import com.articulo.repositoies.ArticuloRepository;
import com.articulo.repositoies.ArticuloSpecification;
import com.configuration.CustomUniqueConstraintViolationException;

import jakarta.transaction.Transactional;

@Service
public class ArticuloService {
	
	@Autowired
	private ArticuloRepository repository;
	
	@Autowired
	private GrupoArticuloService grupoService;
	
	@Autowired
	private BaseItemService baseItemService;

	public void eliminarPorId(long id) throws Exception {
		Articulo guardado = obtenerPorId(id);
		repository.deleteById(guardado.getId());
	}
	
	private Articulo save(Articulo articulo) {
		BaseItem guardado = baseItemService.obtenerPorCodigoYNegocio(articulo.getCodigo(), articulo.getNegocio());
		if((guardado.getId()==articulo.getId() && articulo.getType().equals(guardado.getType())) || guardado==null) {
			return repository.save(articulo);
		}else {
			throw new CustomUniqueConstraintViolationException("Ya existe un item con el mismo código");
		}
	}
	
	//@Transactional
	public Articulo editar(Articulo articulo) throws Exception {
		
		Articulo guardado = repository.findById(articulo.getId()).orElseThrow();//lanzar exepcion
		articulo.setGrupoArticulo(grupoService.obtenerPorId(articulo.getGrupoArticulo().getId()));
		guardado.editar(articulo);
		
		return save(guardado);//guardar(guardado);
	}

	public Articulo nuevo(Articulo articulo) {
		return guardar(articulo);
	}
	
	private Articulo guardar(Articulo articulo) {
		articulo.setType("Item");
		return save(setImagenesSiTiene(articulo));
	}
	
	
	private Articulo setImagenesSiTiene(Articulo articulo) {
		if(articulo.getImagenes().size()>0) {
				
			List<Imagen> imagenes = new ArrayList<>();
			save(articulo);
	        for(Imagen i : articulo.getImagenes()) {
	            Imagen image = new Imagen();
	            image.setData(i.getData());
	            imagenes.add(image);
	        }
	        articulo.removeAllImagenes();
	        articulo.addAllImagenes(imagenes);
		}
        return articulo;
	}

	@Transactional
	public List<Articulo> listar(Negocio negocio) {
		return listar().stream().filter(a->a.getNegocio().equals(negocio)).collect(Collectors.toList());
	}

    @Transactional
    public List<Articulo> listar(Negocio negocio, int page, int size, boolean asc, 
    		boolean porNombre, boolean porPrecioCompra, boolean porCodigo,
    		String busqueda) {
        Pageable pageable = PageRequest.of(page, size);
        Specification<Articulo> spec = buildSpecification(negocio,asc,porNombre,porPrecioCompra,porCodigo,busqueda);
        return repository.findAll(spec, pageable).get().toList();
    }
    
    private Specification<Articulo> buildSpecification(Negocio negocio, boolean asc, 
    		boolean porNombre, boolean porPrecioCompra, boolean porCodigo,
    		String busqueda){
    	Specification<Articulo> spec = Specification.where(ArticuloSpecification.byNegocio(negocio));
        if (porNombre || porPrecioCompra || porCodigo) {
        	String orderByProperty = porNombre ? "nombre" : porPrecioCompra ? "precioCompra" : "codigo";
        	spec = spec.and(ArticuloSpecification.orderBy(orderByProperty, asc));
        }
        if(busqueda.trim().length()>=3) {
        	spec = spec.and(ArticuloSpecification.filterByBusqueda(busqueda));
        }
        return spec;
    }

	@Transactional
	public List<Articulo> listar() {
		return repository.findAll();
	}
	
	public Articulo obtenerPorId(long id) throws Exception {
		return repository.findById(id).orElseThrow(()->new Exception("No hay un articulo con el id: "+id));//lanzar exepcion
		//return repository.getById(id);//lanzar exepcion
	}
	
	public Articulo reducirStock(long idArticulo, Integer cantidad) throws Exception {
		Articulo articuloDB = obtenerPorId(idArticulo);
		articuloDB.reducirStock(cantidad);
		return guardar(articuloDB);
	}

	public long contar(Negocio negocio, String busqueda) {
		Specification<Articulo> spec = buildSpecification(negocio,false,false,false,false,busqueda);
		return repository.findAll(spec).size();
	}



}
