import { Component } from '@angular/core';
import { Auto } from '../../models/auto.model';
import { Marca } from '../../models/marca.model';
import { AutoService } from '../../services/auto.service';
import { MarcaService } from '../../services/marca.service';
import { FormsModule } from '@angular/forms';
import { firstValueFrom, combineLatest } from 'rxjs';

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
  marcaFiltroId: number | null = null;

  constructor(private autoService: AutoService, private marcaService: MarcaService) {
    this.cargarDatos();
  }

  async cargarDatos() {
    const [autos, marcas] = await firstValueFrom(
      combineLatest([this.autoService.getAutos(), this.marcaService.getMarcas()])
    );

    this.marcas = marcas;
    this.autos = this.mapAutosConMarca(autos, marcas);
    this.filtrarAutos(); 
  }

  mapAutosConMarca(autos: any[], marcas: any[]) {
    return autos.map((auto: any) => {
      const marca = marcas.find((m: any) => m.id === auto.marcaId);
      return { 
        ...auto, 
        marcaNombre: marca ? marca['nombre'] : 'Desconocida' 
      };
    });
  }

  filtrarAutos() {
    if (this.marcaFiltroId === null || this.marcaFiltroId === undefined) {
      this.autosFiltrados = [...this.autos]; 
    } else {
      this.autosFiltrados = this.autos.filter(auto => auto.marcaId == this.marcaFiltroId); 
    }
  }

  async getAutos(): Promise<void> {
    const autos = await firstValueFrom(this.autoService.getAutos());
    this.autos = this.mapAutosConMarca(autos, this.marcas); 
    this.filtrarAutos();
  }

  // Método para insertar un auto
  async insertarAuto() {
    await this.autoService.agregarAuto(this.auto); 
    this.auto = new Auto(); 
    await this.getAutos(); 
  }

  selectAuto(autoSeleccionado: Auto) {
    this.auto = autoSeleccionado;
  }

  // Método para actualizar un auto
  async updateAuto() {
    await this.autoService.modificarAuto(this.auto);
    this.auto = new Auto(); 
    await this.getAutos();
  }

  // Método para eliminar un auto
  async deleteAuto() {
    await this.autoService.eliminarAuto(this.auto);
    this.auto = new Auto();
    await this.getAutos();
  }
}
