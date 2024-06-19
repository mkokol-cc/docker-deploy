import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentaFormNewComponent } from './venta-form-new.component';

describe('VentaFormNewComponent', () => {
  let component: VentaFormNewComponent;
  let fixture: ComponentFixture<VentaFormNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VentaFormNewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VentaFormNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
