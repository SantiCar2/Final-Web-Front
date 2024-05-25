import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeleadorDeleteDialogComponent } from './peleador-delete-dialog.component';

describe('PeleadorDeleteDialogComponent', () => {
  let component: PeleadorDeleteDialogComponent;
  let fixture: ComponentFixture<PeleadorDeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeleadorDeleteDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PeleadorDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
