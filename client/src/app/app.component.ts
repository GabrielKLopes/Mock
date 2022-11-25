import { Component, OnInit } from '@angular/core';
import { ClienteService } from './services/cliente.service';
import { Cliente } from './models/cliente';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  client = {} as Cliente;
  clients!: Cliente[];

  constructor(private clientService: ClienteService) {}
  
  ngOnInit() {
    this.getClients();
  }
 
  saveClients(form: NgForm) {
    if (this.client.id !== undefined) {
      this.clientService.updateClients(this.client).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.clientService.saveClients(this.client).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }

  getClients() {
    this.clientService.getClients().subscribe((clients: Cliente[]) => {
      this.clients = clients;
    });
  }

 
  deleteClients(clients: Cliente) {
    this.clientService.deleteClients(clients).subscribe(() => {
      this.getClients();
    });
  }

 
  editClients(clients: Cliente) {
    this.client = { ...clients };
  }

  
  cleanForm(form: NgForm) {
    this.getClients();
    form.resetForm();
    this.client = {} as Cliente;
  }

}