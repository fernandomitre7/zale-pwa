import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-new-registration',
    template: `
    <h2>Se ha enviado un correo de activación</h2>
    <p>Revisa tu bandeja de entrada y sigue el link en el correo para poder activar tu cuenta.</p>
  `
})
export class NewRegistrationComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

}
