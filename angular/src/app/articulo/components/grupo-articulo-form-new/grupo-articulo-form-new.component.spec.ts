import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoArticuloFormNewComponent } from './grupo-articulo-form-new.component';

describe('GrupoArticuloFormNewComponent', () => {
  let component: GrupoArticuloFormNewComponent;
  let fixture: ComponentFixture<GrupoArticuloFormNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrupoArticuloFormNewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GrupoArticuloFormNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
