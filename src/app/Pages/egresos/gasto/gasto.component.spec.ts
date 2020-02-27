import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GastoComponent } from './gasto.component';

describe('GastoComponent', () => {
  let component: GastoComponent;
  let fixture: ComponentFixture<GastoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GastoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GastoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
