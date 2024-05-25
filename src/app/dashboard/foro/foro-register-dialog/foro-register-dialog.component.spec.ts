import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForoRegisterDialogComponent } from './foro-register-dialog.component';

describe('ForoRegisterDialogComponent', () => {
  let component: ForoRegisterDialogComponent;
  let fixture: ComponentFixture<ForoRegisterDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForoRegisterDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ForoRegisterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
