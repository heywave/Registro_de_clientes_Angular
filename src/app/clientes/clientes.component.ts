import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente.model';  // Asegúrate de que la ruta sea correcta
import { ClienteService } from './cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[] = [];
  cliente: Cliente = new Cliente();  // Instancia de la clase Cliente

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe(data => {
      this.clientes = data;
    });
  }

  onSubmit(): void {
    this.clienteService.addCliente(this.cliente).subscribe(cliente => {
      this.clientes.push(cliente);
      this.cliente = new Cliente(); 
    });
  }

  clienteFormValido(): boolean {
    
    return this.cliente.nombre !== undefined && this.cliente.nombre.trim() !== '';
  }
}
