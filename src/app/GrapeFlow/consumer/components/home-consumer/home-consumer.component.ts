import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { WineService } from '../../../producer/services/wine.service';
import { Wine } from '../../../producer/model/wine.entity';

@Component({
  selector: 'app-home-consumer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-consumer.component.html',
  styleUrls: ['./home-consumer.component.css']
})
export class HomeConsumerComponent implements OnInit {
  popularWines: Wine[] = [];

  constructor(private wineService: WineService, private router: Router) {}

  ngOnInit(): void {
    this.loadPopularWines();
  }

  loadPopularWines(): void {
    this.wineService.getPopularWines().subscribe(
      (data: Wine[]) => {
        // Filtra los vinos con calificación de 5 y luego limita a 3 elementos
        this.popularWines = data.filter(wine => wine.calificacion === 5).slice(0, 3);
      },
      (error) => {
        console.error('Error loading popular wines:', error);
      }
    );
  }

  goToWines(): void {
    this.router.navigate(['/wines']);  // Redirige a la página de todos los vinos
  }
}
