import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioFormNewComponent } from './usuario-form-new.component';

describe('UsuarioFormNewComponent', () => {
  let component: UsuarioFormNewComponent;
  let fixture: ComponentFixture<UsuarioFormNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuarioFormNewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsuarioFormNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
