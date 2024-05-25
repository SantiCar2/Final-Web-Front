import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeleadorComponent } from './peleador.component';

describe('PeleadorComponent', () => {
  let component: PeleadorComponent;
  let fixture: ComponentFixture<PeleadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeleadorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PeleadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
