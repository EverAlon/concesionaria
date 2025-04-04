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

  //metodo para obtener un listado de libros
  async getMarcas():Promise<void>{
    this.marcas = await firstValueFrom(this.marcaService.getMarcas());
  }

  //metodo para insertar un libro desde el form
  insertarAuto(){
    this.marcaService.agregarMarca(this.marca);
    this.marca = new Marca();
    this.getMarcas();
  }

  //metodo para seleccionar un libro de la tabla
  selectMarca(marcaSeleccionada:Marca){
    this.marca = marcaSeleccionada;
  }

  //metodo para modificar un libro desde el form
  updateMarca(){
    this.marcaService.modificarMarca(this.marca);
    this.marca = new Marca();
    this.getMarcas();
  }

  //metodo para eliminar un libro
  deleteMarca(){
    this.marcaService.eliminarMarca(this.marca);
    this.marca = new Marca();
    this.getMarcas();
  }
}
