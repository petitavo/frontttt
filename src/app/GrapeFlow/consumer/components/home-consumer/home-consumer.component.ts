import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { WineService } from '../../../producer/services/wine.service';
import { Wine } from '../../../producer/model/wine.entity';

@Component({
    selector: 'app-home-consumer',
    standalone: true,
    imports: [CommonModule, NgOptimizedImage],
    templateUrl: './home-consumer.component.html',
    styleUrls: ['./home-consumer.component.css']
})
export class HomeConsumerComponent implements OnInit {
    popularWines: Wine[] = [];

    constructor(private wineService: WineService, private router: Router) {}

    ngOnInit(): void {
        this.loadPopularWines();
    }

    // Carga los vinos con calificación de 5
    loadPopularWines(): void {
        this.wineService.getPopularWines().subscribe(
            (data: Wine[]) => {
                console.log(data);  // Verifica qué datos estás recibiendo
                // Filtra los vinos con calificación de 5 y muestra solo los primeros 3
                this.popularWines = data.filter(wine => wine.calificacion === 5).slice(0, 3);
                console.log(this.popularWines);  // Verifica si hay vinos populares
            },
            (error) => {
                console.error('Error loading popular wines:', error);
            }
        );
    }

    // Redirige a la página donde se muestran todos los vinos
    goToWines(): void {
        this.router.navigate(['/consumer/product']);  // Redirige a la pantalla de productos para el consumidor
    }

    // Redirige a la página de detalles de un vino específico
    viewWineDetails(): void {
        this.router.navigate(['/consumer/product']);  // Redirige a la página de vinos, o puedes configurar una página de detalles específicos
    }
}
