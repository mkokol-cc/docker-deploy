import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilTableComponent } from './perfil-table.component';

describe('PerfilTableComponent', () => {
  let component: PerfilTableComponent;
  let fixture: ComponentFixture<PerfilTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfilTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PerfilTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
