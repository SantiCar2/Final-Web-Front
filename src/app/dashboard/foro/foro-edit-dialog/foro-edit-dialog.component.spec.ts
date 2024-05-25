import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForoEditDialogComponent } from './foro-edit-dialog.component';

describe('ForoEditDialogComponent', () => {
  let component: ForoEditDialogComponent;
  let fixture: ComponentFixture<ForoEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForoEditDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ForoEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
