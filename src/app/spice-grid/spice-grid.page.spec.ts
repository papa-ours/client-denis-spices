import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SpiceGridPage } from './spice-grid.page';

describe('SpiceGridPage', () => {
  let component: SpiceGridPage;
  let fixture: ComponentFixture<SpiceGridPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpiceGridPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SpiceGridPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
