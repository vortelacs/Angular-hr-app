import {Component, Inject, OnInit, Input } from '@angular/core';
import {Person} from '../person'
import { PersonService } from '../person.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router,NavigationStart} from '@angular/router';
import { ActivatedRoute } from '@angular/router'

enum FormType {
  ADDFORM,
  UPDATEFORM,
}

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.less']
})
export class PersonFormComponent implements OnInit{

  
  @Input() public person : Person = {} as Person;
  personId : number = -1;
  formType : FormType = FormType.ADDFORM;
 
  
  constructor(private personService : PersonService, private route: ActivatedRoute) {
  };

  
  
  ngOnInit(): void{
    this.personId = this.route.snapshot.params['id'];
    if(this.personId!=undefined){
      this.getPersonById(this.personId);
      this.formType = FormType.UPDATEFORM;
    }

    
  };

  public updatePerson(person : Person){
    this.personService.updatePerson(person).subscribe((response : Person) =>{
},
(error: HttpErrorResponse) => {
alert(error.message);
    });
  }

  public addPerson(person : Person){
    this.personService.addPerson(person).subscribe((response : Person) =>{
},
(error: HttpErrorResponse) => {
alert(error.message);
    });
  }

  public getPersonById(id : number){
    this.personService.getPersonById(id).subscribe((response : Person) =>{
      this.person = response;
    },
    (error: HttpErrorResponse) =>{
      alert(error.message)
    }
    );
  }
  onClickSubmit(firstName : String, lastName : String, email : String){

    this.person.firstName=firstName;
    this.person.lastName=lastName;
    this.person.email =email;

    if(this.formType == FormType.UPDATEFORM){
      this.updatePerson(this.person);
    }
    else if(this.formType == FormType.ADDFORM){
      this.addPerson(this.person);
    }
  }

  onChange(newValue : string) : boolean {
    const emailInput = document.getElementById("email")
    const validEmailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (validEmailRegEx.test(newValue)) {
      
        return true;
    }else {
      return false;
    }

  }

}
