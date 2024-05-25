import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeleadorRegisterDialogComponent } from './peleador-register-dialog.component';

describe('PeleadorRegisterDialogComponent', () => {
  let component: PeleadorRegisterDialogComponent;
  let fixture: ComponentFixture<PeleadorRegisterDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeleadorRegisterDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PeleadorRegisterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
