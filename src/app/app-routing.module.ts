import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
    { path: 'auth', loadChildren: './auth/auth.module#AuthModule', canLoad: [AuthGuard] },
    /* { path: 'main', loadChildren: './main/main.module#MainModule', canLoad: [AuthGuard] }, */
    { path: '', redirectTo: 'auth', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
