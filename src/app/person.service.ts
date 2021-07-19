import { Injectable } from "@angular/core";
import { Person } from './person';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http : HttpClient) { }

  public getPersons(): Observable<Person[]>{
    return this.http.get<Person[]>(`${this.apiServerUrl}`)
  }

  public getPersonById(id : number): Observable<Person>{
    return this.http.get<Person>(`${this.apiServerUrl}/${id}`)
  }


public addPerson(person: Person): Observable<Person>{
    return this.http.post<Person>(`${this.apiServerUrl}`, person)
  }

public updatePerson(person: Person): Observable<Person>{
    return this.http.put<Person>(`${this.apiServerUrl}`, person)
  }

public deletePerson(id : number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/${id}`)
  }
}
