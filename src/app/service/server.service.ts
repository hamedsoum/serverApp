import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscriber, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Status } from '../enum/status.enum';
import { CustomResponse } from '../interface/custom.response';
import { Server } from '../interface/server';

@Injectable({
  providedIn: 'root'})
export class ServerService {

  private readonly apiUrl =  'http://localhost:8080';

  constructor(
    private http : HttpClient
  ) { }

  // getServers():Observable<CustomRespose>{
  //   return this.http.get<CustomRespose>(`http://localHost:8080/server/list`);
  // }

  servers$ = <Observable<CustomResponse>>
  this.http.get<CustomResponse>(`${this.apiUrl}/server/list`)
  .pipe(
    tap(console.log),
    catchError(this.handleError)
  );

  SaveServer$ = (server : Server) => <Observable<CustomResponse>>
  this.http.post<CustomResponse>(`${this.apiUrl}/server/post`, server)
  .pipe(
    tap(console.log),
    catchError(this.handleError)
  );

  pingServer$ = (apiAddress : string) => <Observable<CustomResponse>>
  this.http.get<CustomResponse>(`${this.apiUrl}/server/ping/${apiAddress}`)
  .pipe(
    tap(console.log),
    catchError(this.handleError)
  );

  filterServers$ = (status : Status, response : CustomResponse) => <Observable<CustomResponse>>
  new Observable<CustomResponse>(
    Subscriber =>{
      console.log(response);
      Subscriber.next(
        // status === Status.ALL ? {...response, message : `server filtered by ${status} status`}
      )
    }
  )
  .pipe(
    tap(console.log),
    catchError(this.handleError)
  );

  deleteServer$ = (serverAddress : number) => <Observable<CustomResponse>>
  this.http.delete<CustomResponse>(`${this.apiUrl}/server/delete/${serverAddress}`)
  .pipe(
    tap(console.log),
    catchError(this.handleError)
  );

 

  handleError(error: HttpErrorResponse): Observable<never> {
    console.log(error);
    
    throw  throwError (`An error occured - Error code: ${error.status}`);
  }
}
