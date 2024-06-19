import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoArticuloTableComponent } from './grupo-articulo-table.component';

describe('GrupoArticuloTableComponent', () => {
  let component: GrupoArticuloTableComponent;
  let fixture: ComponentFixture<GrupoArticuloTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrupoArticuloTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GrupoArticuloTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
