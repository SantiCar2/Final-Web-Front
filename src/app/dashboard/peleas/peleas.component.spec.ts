import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeleasComponent } from './peleas.component';

describe('PeleasComponent', () => {
  let component: PeleasComponent;
  let fixture: ComponentFixture<PeleasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeleasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PeleasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
