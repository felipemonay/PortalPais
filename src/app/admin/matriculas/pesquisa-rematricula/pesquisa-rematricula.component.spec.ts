import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PesquisaRematriculaComponent } from './pesquisa-rematricula.component';

describe('PesquisaRematriculaComponent', () => {
  let component: PesquisaRematriculaComponent;
  let fixture: ComponentFixture<PesquisaRematriculaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PesquisaRematriculaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PesquisaRematriculaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
