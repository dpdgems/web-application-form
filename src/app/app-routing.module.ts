import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'expenses-form',
    loadChildren: () => import('./components/contents/general-expense-form/general-expense.module').then(m => m.GeneralExpenseModule)
  },
  {
    path: 'leave-form',
    loadChildren: () => import('./components/contents/take-leave-form/take-leave.module').then(m => m.TakeLeaveModule)
  },
  {
    path: 'files-list',
    loadChildren: () => import('./components/contents/files-list/files-list.module').then(m => m.FilesListModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
