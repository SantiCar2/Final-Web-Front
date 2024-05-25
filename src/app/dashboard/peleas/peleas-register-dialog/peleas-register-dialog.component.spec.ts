import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeleasRegisterDialogComponent } from './peleas-register-dialog.component';

describe('PeleasRegisterDialogComponent', () => {
  let component: PeleasRegisterDialogComponent;
  let fixture: ComponentFixture<PeleasRegisterDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeleasRegisterDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PeleasRegisterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
