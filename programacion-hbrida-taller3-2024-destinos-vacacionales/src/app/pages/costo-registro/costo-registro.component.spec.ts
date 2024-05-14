import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CostoRegistroComponent } from './costo-registro.component';

describe('CostoRegistroComponent', () => {
  let component: CostoRegistroComponent;
  let fixture: ComponentFixture<CostoRegistroComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CostoRegistroComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CostoRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
