import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticuloTableComponent } from './articulo-table.component';

describe('ArticuloTableComponent', () => {
  let component: ArticuloTableComponent;
  let fixture: ComponentFixture<ArticuloTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticuloTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArticuloTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
