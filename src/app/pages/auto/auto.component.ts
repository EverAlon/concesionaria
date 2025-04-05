import { Component } from '@angular/core';
import { Auto } from '../../models/auto.model';
import { Marca } from '../../models/marca.model';
import { AutoService } from '../../services/auto.service';
import { MarcaService } from '../../services/marca.service';
import { FormsModule} from '@angular/forms'
import { firstValueFrom, combineLatest  } from 'rxjs';

@Component({
  selector: 'app-auto',
  imports: [FormsModule],
  templateUrl: './auto.component.html',
  styleUrl: './auto.component.css'
})
export class AutoComponent {
  // Propiedades
  autos: any[] = [];
  autosFiltrados: any[] = [];
  marcas: any[] = [];
  auto = new Auto();
  marcaFiltroId: number | null = null; // Inicializado como null para mostrar todos

  constructor(private autoService: AutoService, private marcaService: MarcaService) {
    this.cargarDatos();
  }

  async cargarDatos() {
    combineLatest([
      this.autoService.getAutos(),
      this.marcaService.getMarcas()
    ]).subscribe(([autos, marcas]) => {
      this.marcas = marcas;
      this.autos = autos.map((auto: any) => {
        const marca = marcas.find((m: any) => m.id === auto.marcaId);
        return { 
          ...auto, 
          marcaNombre: marca ? marca['nombre'] : 'Desconocida' 
        };      
      });
      this.filtrarAutos(); // Aplicar filtro inicial (mostrará todos)
    });
  }

  filtrarAutos() {
    if (this.marcaFiltroId === null || this.marcaFiltroId === undefined) {
      this.autosFiltrados = [...this.autos]; // Mostrar todos los autos
    } else {
      this.autosFiltrados = this.autos.filter(auto => auto.marcaId == this.marcaFiltroId);
    }
  }

  //metodo para obtener un listado de libros
  async getAutos():Promise<void>{
    this.autos = await firstValueFrom(this.autoService.getAutos());
  }

  //metodo para insertar un libro desde el form
  insertarAuto(){
    
    this.autoService.agregarAuto(this.auto);
    this.auto = new Auto();
    this.getAutos();
  }

  //metodo para seleccionar un libro de la tabla
  selectAuto(autoSeleccionado:Auto){
    this.auto = autoSeleccionado;
  }

  //metodo para modificar un libro desde el form
  updateAuto(){
    this.autoService.modificarAuto(this.auto);
    this.auto = new Auto();
    this.getAutos();
  }

  //metodo para eliminar un libro
  deleteAuto(){
    this.autoService.eliminarAuto(this.auto);
    this.auto = new Auto();
    this.getAutos();
  }
}
