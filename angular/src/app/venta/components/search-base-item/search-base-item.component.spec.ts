import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBaseItemComponent } from './search-base-item.component';

describe('SearchBaseItemComponent', () => {
  let component: SearchBaseItemComponent;
  let fixture: ComponentFixture<SearchBaseItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchBaseItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchBaseItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
