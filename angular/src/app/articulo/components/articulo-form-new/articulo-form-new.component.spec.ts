import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticuloFormNewComponent } from './articulo-form-new.component';

describe('ArticuloFormNewComponent', () => {
  let component: ArticuloFormNewComponent;
  let fixture: ComponentFixture<ArticuloFormNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticuloFormNewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArticuloFormNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
