import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCcVisa, faCcMastercard, faCcDiscover, faCcJcb, faCcAmex, faCcDinersClub, faCcPaypal } from '@fortawesome/free-brands-svg-icons';

library.add(faCcVisa, faCcMastercard, faCcDiscover, faCcJcb, faCcAmex, faCcDinersClub, faCcPaypal);

@NgModule({
    declarations: [
        AppComponent,
        PageNotFoundComponent
    ],
    imports: [
        BrowserModule,
        //FontAwesomeModule,
        FormsModule,
        CoreModule, // API Services and UI Module
        AuthModule,
        AppRoutingModule,
        ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
