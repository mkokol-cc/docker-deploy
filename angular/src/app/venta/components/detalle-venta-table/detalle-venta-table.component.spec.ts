import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleVentaTableComponent } from './detalle-venta-table.component';

describe('DetalleVentaTableComponent', () => {
  let component: DetalleVentaTableComponent;
  let fixture: ComponentFixture<DetalleVentaTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleVentaTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetalleVentaTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
