import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageInputFormComponent } from './image-input-form.component';

describe('ImageInputFormComponent', () => {
  let component: ImageInputFormComponent;
  let fixture: ComponentFixture<ImageInputFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageInputFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImageInputFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
