import { Component } from '@angular/core';
import { Marca } from '../../models/marca.model';
import { MarcaService } from '../../services/marca.service'
import { FormsModule} from '@angular/forms'
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-marca',
  imports: [FormsModule],
  templateUrl: './marca.component.html',
  styleUrl: './marca.component.css'
})
export class MarcaComponent {
  //propiedades
  marcas:any;
  marca = new Marca();

  constructor(private marcaService:MarcaService){
    this.getMarcas();
  }

  async getMarcas():Promise<void>{
    this.marcas = await firstValueFrom(this.marcaService.getMarcas());
  }

  insertarMarca(){
    this.marcaService.agregarMarca(this.marca);
    this.marca = new Marca();
    this.getMarcas();
  }

  selectMarca(marcaSeleccionada:Marca){
    this.marca = marcaSeleccionada;
  }

  updateMarca(){
    this.marcaService.modificarMarca(this.marca);
    this.marca = new Marca();
    this.getMarcas();
  }

  deleteMarca(){
    this.marcaService.eliminarMarca(this.marca);
    this.marca = new Marca();
    this.getMarcas();
  }
}
