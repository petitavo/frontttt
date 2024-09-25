import { Injectable } from '@angular/core';
import { BaseService} from "../../../shared/services/base.service"; // Ruta hacia tu BaseService
import { Lote } from '../model/lote.entity'; // Asegúrate de usar el modelo correcto de Lote

@Injectable({
  providedIn: 'root'
})
export class LoteService extends BaseService<Lote> {

  constructor() {
    super();
    this.resourceEndPoint = '/lotes'; // Asegúrate de usar el endpoint correcto
  }
}
