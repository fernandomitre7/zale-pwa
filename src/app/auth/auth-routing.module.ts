import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { AuthGuard } from './auth.guard';
import { NewRegistrationComponent } from './new-registration.component';

const routes: Routes = [
    { path: 'auth', component: AuthComponent, canLoad: [AuthGuard] },
    { path: 'auth/registered', component: NewRegistrationComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
