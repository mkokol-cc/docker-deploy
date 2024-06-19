import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarSiteSelectorComponent } from './sidebar-site-selector.component';

describe('SidebarSiteSelectorComponent', () => {
  let component: SidebarSiteSelectorComponent;
  let fixture: ComponentFixture<SidebarSiteSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarSiteSelectorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SidebarSiteSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
