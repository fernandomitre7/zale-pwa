import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
    { path: 'auth', loadChildren: './auth/auth.module#AuthModule', canLoad: [AuthGuard] },
    { path: 'main', loadChildren: './main/main.module#MainModule', canLoad: [AuthGuard] },
    { path: '', redirectTo: 'auth', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
