import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  url = 'http://localhost:3000/clients'; // api rest falsa 

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

   // Obtem todos os clientes
   getClients(): Observable<Cliente[]> {
    return this.httpClient.get<Cliente[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

   // Obtem um cliente pelo id
   getClientsById(id: number): Observable<Cliente> {
    return this.httpClient.get<Cliente>(this.url + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // salva um cliente
  saveClients(Clients: Cliente): Observable<Cliente> {
    return this.httpClient.post<Cliente>(this.url, JSON.stringify(Clients), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

    // utualiza um cliente
    updateClients(Clients: Cliente): Observable<Cliente> {
      return this.httpClient.put<Cliente>(this.url + '/' + Clients.id, JSON.stringify(Clients), this.httpOptions)
        .pipe(
          retry(1),
          catchError(this.handleError)
        )
    }
  
    // deleta um cliente
    deleteClients(Clients: Cliente) {
      return this.httpClient.delete<Cliente>(this.url + '/' + Clients.id, this.httpOptions)
        .pipe(
          retry(1),
          catchError(this.handleError)
        )
    }

     // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };

}
