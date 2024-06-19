import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilFormNewComponent } from './perfil-form-new.component';

describe('PerfilFormNewComponent', () => {
  let component: PerfilFormNewComponent;
  let fixture: ComponentFixture<PerfilFormNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfilFormNewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PerfilFormNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
