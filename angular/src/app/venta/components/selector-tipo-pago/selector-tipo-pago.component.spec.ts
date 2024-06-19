import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorTipoPagoComponent } from './selector-tipo-pago.component';

describe('SelectorTipoPagoComponent', () => {
  let component: SelectorTipoPagoComponent;
  let fixture: ComponentFixture<SelectorTipoPagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectorTipoPagoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectorTipoPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
