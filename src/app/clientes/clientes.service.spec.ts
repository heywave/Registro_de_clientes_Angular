import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ClienteService } from './cliente.service';
import { Cliente } from './cliente.model';

function processClientes(clientes: Cliente[]) {
    // Aquí puedes agregar tu lógica de implementación
}

describe('ClienteService', () => {
    let service: ClienteService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ClienteService]
        });
        service = TestBed.inject(ClienteService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify(); 
    });

    it('Debe ser creado', () => {
        expect(service).toBeTruthy();
    });

    it('Debe obtener todos los clientes', () => {
        const dummyClientes: Cliente[] = [
            { id: 1, nombre: 'Samira Perez', edad: '30', direccion: 'Urbanización Coral' },
            { id: 2, nombre: 'Milo Sandovar', edad: '25', direccion: 'Av. El Salvador 32' }
        ];

        service.getClientes().subscribe(clientes => {
            expect(clientes.length).toBe(2);
            expect(clientes).toEqual(dummyClientes);
        });

        const req = httpMock.expectOne('http://localhost:3000/clientes');
        expect(req.request.method).toBe('GET');
        req.flush(dummyClientes);
    });

    it('Debe obtener un solo cliente', () => {
        const dummyCliente: Cliente = { id: 1, nombre: 'Samira Perez', edad: '30', direccion: 'Urbanización Coral' };

        service.getCliente(1).subscribe(cliente => {
            expect(cliente).toEqual(dummyCliente);
        });

        const req = httpMock.expectOne('http://localhost:3000/clientes');
        expect(req.request.method).toBe('GET');
        req.flush(dummyCliente);
    });

    it('Debe añadir un cliente', () => {
        const newCliente: Cliente = { id: 3, nombre: 'Tara Rodriguez', edad: '60', direccion: 'Milann Altagracia' };

        service.addCliente(newCliente).subscribe(cliente => {
            expect(cliente.id).toBeDefined();
            expect(cliente.nombre).toBe(newCliente.nombre);
            expect(cliente.edad).toBe(newCliente.edad);
            expect(cliente.direccion).toBe(newCliente.direccion);
        });

        const req = httpMock.expectOne('http://localhost:3000/clientes/clientes');
        expect(req.request.method).toBe('POST');
        req.flush(newCliente);
    });

    it('Debe actualizar un cliente', () => {
        const updatedCliente: Cliente = { id: 1, nombre: 'Milo Sandovar (actualizado)', edad: '25', direccion: 'Av. El Salvador 33' };

        service.updateCliente(updatedCliente).subscribe(cliente => {
            expect(cliente).toEqual(updatedCliente);
        });

        const req = httpMock.expectOne('http://localhost:3000/clientes/clientes/1');
        expect(req.request.method).toBe('PUT');
        req.flush(updatedCliente);
    });

    it('Debe eliminar un cliente', () => {
        service.deleteCliente(1).subscribe(response => {
            expect(response).toBeUndefined();
        });

        const req = httpMock.expectOne('http://localhost:3000/clientes/clientes/1');
        expect(req.request.method).toBe('ELIMINAR');
        req.flush(null); // Respondiendo con null ya que el servidor típicamente no devuelve un cuerpo de respuesta para una solicitud DELETE
    });
});
