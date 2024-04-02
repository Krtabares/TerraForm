import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableTerraComponent } from './table-terra.component';

describe('TableTerraComponent', () => {
  let component: TableTerraComponent;
  let fixture: ComponentFixture<TableTerraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableTerraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableTerraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
