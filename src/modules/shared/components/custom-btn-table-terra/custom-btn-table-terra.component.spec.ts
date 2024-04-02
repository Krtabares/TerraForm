import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomBtnTableTerraComponent } from './custom-btn-table-terra.component';

describe('CustomBtnTableTerraComponent', () => {
  let component: CustomBtnTableTerraComponent;
  let fixture: ComponentFixture<CustomBtnTableTerraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomBtnTableTerraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomBtnTableTerraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
