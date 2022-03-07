import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneralExpenseFormComponent } from './general-expense-form.component';

const routes: Routes = [
  {
    path: '',
    component: GeneralExpenseFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneralExpenseRoutingModule { }
