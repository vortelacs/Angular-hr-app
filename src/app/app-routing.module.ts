import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { OverviewComponent } from './overview/overview.component';
import { PersonFormComponent } from './person-form/person-form.component';

const routes: Routes = [
  {path: '', redirectTo: 'list', pathMatch: 'full' },
  {path: 'list', component: OverviewComponent},
  {path: 'add', component: PersonFormComponent},
  {path: 'update/:id', component: PersonFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [AppComponent, PersonFormComponent]
