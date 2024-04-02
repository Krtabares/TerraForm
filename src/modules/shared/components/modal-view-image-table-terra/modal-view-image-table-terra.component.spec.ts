import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalViewImageTableTerraComponent } from './modal-view-image-table-terra.component';

describe('ModalViewImageTableTerraComponent', () => {
  let component: ModalViewImageTableTerraComponent;
  let fixture: ComponentFixture<ModalViewImageTableTerraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalViewImageTableTerraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalViewImageTableTerraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
