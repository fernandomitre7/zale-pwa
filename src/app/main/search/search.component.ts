import { Component, OnInit } from '@angular/core';
import { UIService } from '../../core/ui/ui.service';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

    private inputFocused: boolean;

    results = [
        { type: 'restaurant', icon: 'restaurant', name: 'Il Gardiano', description: 'En Il Mercato Gentiloni' },
        { type: 'library', icon: 'local_library', name: 'Gandhi', description: 'Tu pones las ganas de leer' },
        { type: 'generic-store', icon: 'store', name: 'Tiendita', description: 'De la esquina' },
        { type: 'market', icon: 'shopping_cart', name: 'Supermercado', description: 'Productos locales' },
        { type: 'cafe', icon: 'local_cafe', name: 'Venenito Café', description: '¿Apoco no se te antoja un cafecito?' },
        { type: 'bar', icon: 'local_bar', name: 'La Cantina', description: 'En Il Mercato Gentiloni' },
        { type: 'apparel', icon: 'local_offer', name: 'Tienda de ropa', description: 'Estamos en oferta' },
        { type: 'fastfood', icon: 'fastfood', name: 'Hamburguesas al carbón', description: 'Las mejores de Saltillo' },
        { type: 'pizzeria', icon: 'local_pizza', name: 'Capricciosas Rufino Tamayo', description: 'Pizza Gourmet' },
        { type: 'gas-station', icon: 'local_gas_station', name: 'Oxxo Gas', description: 'Pioneros' },

        { type: 'restaurant', icon: 'restaurant', name: 'Il Gardiano', description: 'En Il Mercato Gentiloni' },
        { type: 'library', icon: 'local_library', name: 'Gandhi', description: 'Tu pones las ganas de leer' },
        { type: 'generic-store', icon: 'store', name: 'Tiendita', description: 'De la esquina' },
        { type: 'market', icon: 'shopping_cart', name: 'Supermercado', description: 'Productos locales' },
        { type: 'cafe', icon: 'local_cafe', name: 'Venenito Café', description: '¿Apoco no se te antoja un cafecito?' },
        { type: 'bar', icon: 'local_bar', name: 'La Cantina', description: 'En Il Mercato Gentiloni' },
        { type: 'apparel', icon: 'local_offer', name: 'Tienda de ropa', description: 'Estamos en oferta' },
        { type: 'fastfood', icon: 'fastfood', name: 'Hamburguesas al carbón', description: 'Las mejores de Saltillo' },
        { type: 'pizzeria', icon: 'local_pizza', name: 'Capricciosas Rufino Tamayo', description: 'Pizza Gourmet' },
        { type: 'gas-station', icon: 'local_gas_station', name: 'Oxxo Gas', description: 'Pioneros' },
    ];

    constructor(private uiService: UIService) { }

    ngOnInit() {
        // this.inputFocused = true; //
    }

    onSearchFocus() {
        this.inputFocused = true;
        this.uiService.inputFocused();
    }

    unFocusSearch() {
        this.inputFocused = false;
    }

    clearSearch() {
    }

}
