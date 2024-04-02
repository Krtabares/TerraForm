import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomImagenViewTableTerraComponent } from './custom-imagen-view-table-terra.component';

describe('CustomImagenViewTableTerraComponent', () => {
  let component: CustomImagenViewTableTerraComponent;
  let fixture: ComponentFixture<CustomImagenViewTableTerraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomImagenViewTableTerraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomImagenViewTableTerraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
