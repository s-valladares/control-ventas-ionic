import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SemanaventaComponent } from './semanaventa.component';

describe('SemanaventaComponent', () => {
  let component: SemanaventaComponent;
  let fixture: ComponentFixture<SemanaventaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SemanaventaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SemanaventaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
