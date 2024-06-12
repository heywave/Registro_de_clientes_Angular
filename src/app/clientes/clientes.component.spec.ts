import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ClientesComponent } from './clientes.component';
import { ClienteService } from './cliente.service';
import { Cliente } from './cliente.model';

describe('ClientesComponent', () => {
  let component: ClientesComponent;
  let fixture: ComponentFixture<ClientesComponent>;
  let clienteService: ClienteService;

  let mockClientes: Cliente[] = [
  { nombre: 'Samira Perez', edad: '30', direccion: 'Urbanizacion Coral' },
  { nombre: 'Milo Sandovar', edad: '25', direccion: 'Av. El Salvador 32' }
];

  beforeEach(async () => {
    const clienteServiceSpy = jasmine.createSpyObj('ClienteService', ['getClientes']);
    clienteServiceSpy.getClientes.and.returnValue(of(mockClientes));

    await TestBed.configureTestingModule({
      declarations: [ClientesComponent],
      providers: [{ provide: ClienteService, useValue: clienteServiceSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(ClientesComponent);
    component = fixture.componentInstance;
    clienteService = TestBed.inject(ClienteService);
    fixture.detectChanges();
  });

  it('Debe crear', () => {
    expect(component).toBeTruthy();
  });

  it('Plasmar clientes en init', () => {
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.clientes.length).toBe(2);
    expect(component.clientes).toEqual(mockClientes);
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('ul')?.textContent).toContain('Samira Perez');
    expect(compiled.querySelector('ul')?.textContent).toContain('Milo Sandovar');
  });
});
