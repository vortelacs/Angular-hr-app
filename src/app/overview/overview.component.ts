import { Component, OnInit } from '@angular/core';
import { Person } from '../person';
import { AppComponent } from '../app.component';
import { PersonService } from '../person.service';
import { PersonFormComponent } from '../person-form/person-form.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.less']
})
export class OverviewComponent implements OnInit {


  public persons : Person[] = [];

  constructor(private personService : PersonService){
    this.persons = [];
  }

  ngOnInit(){
    this.getPersons();
    
  }

  public getPersons(): void{
    this.personService.getPersons().subscribe((response : Person[]) =>{
      this.persons = response;
    },
    (error: HttpErrorResponse) =>{
      alert(error.message)
    }
    );
  }

  public deletePerson(id : number){
    this.personService.deletePerson(id).subscribe((response : void) =>{
this.getPersons();},
(error: HttpErrorResponse) => {
alert(error.message);
    });

  }

  public updatePerson(person : Person){
    this.personService.updatePerson(person.id, person).subscribe((response : Person) =>{
this.getPersons();},
(error: HttpErrorResponse) => {
alert(error.message);
    });
  }

  public addPerson(person : Person){
    this.personService.addPerson(person).subscribe((response : Person) =>{
this.getPersons();},
(error: HttpErrorResponse) => {
alert(error.message);
    });
  }




  public popupDelete(id : number):void{
    if(confirm("Are you sure to delete person with id " + id)) {
      this.deletePerson(id);
    }
}

}
