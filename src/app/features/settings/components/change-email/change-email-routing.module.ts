import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangeEmailComponent } from './change-email/change-email.component';
import { ChangeEmailCompleteComponent } from './change-email-complete/change-email-complete.component';

const routes: Routes = [
    { path: '', component: ChangeEmailComponent },
    { path: ':UserId/:ChangeEmailToken', component: ChangeEmailCompleteComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ChangeEmailRoutingModule { }