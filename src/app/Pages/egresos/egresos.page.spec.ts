import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EgresosPage } from './egresos.page';

describe('EgresosPage', () => {
  let component: EgresosPage;
  let fixture: ComponentFixture<EgresosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EgresosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EgresosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
