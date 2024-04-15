import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelCrudComponent } from './level-crud.component';

describe('LevelCrudComponent', () => {
  let component: LevelCrudComponent;
  let fixture: ComponentFixture<LevelCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LevelCrudComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LevelCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
