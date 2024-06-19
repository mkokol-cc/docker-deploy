import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComboFormNewComponent } from './combo-form-new.component';

describe('ComboFormNewComponent', () => {
  let component: ComboFormNewComponent;
  let fixture: ComponentFixture<ComboFormNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComboFormNewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComboFormNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
