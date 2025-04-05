import { inject, Injectable } from '@angular/core';
import { Auto } from '../models/auto.model';
import { first } from 'rxjs';
import { addDoc, collection, collectionData, deleteDoc, Firestore, updateDoc } from '@angular/fire/firestore';
import { doc } from 'firebase/firestore';
import { MarcaService } from './marca.service';

@Injectable({
  providedIn: 'root'
})
export class AutoService {

  private db: Firestore = inject(Firestore);

  constructor() { }

  //Metodo para obtener todos los documentos de la coleccion
  getAutos(){
    const AutosCollection = collection(this.db, 'Autos');
    return collectionData((AutosCollection), {idField: 'id'})
      .pipe(first(),);
  }

  //metodo para agregar un nuevo documento a la coleccion
  agregarAuto(auto:Auto){
    const AutosCollection = collection(this.db, 'Autos');
    const AutoData = {
      nombre: auto.nombre,
      anio: auto.anio,
      precio: auto.precio,
      descripcion: auto.descripcion,
      marcaId: auto.marcaId
    };
    addDoc(AutosCollection, AutoData);
  }

  //Metodo para modificar un documento
  modificarAuto(auto:Auto){
    const documentoRef = doc(this.db, 'Autos', auto.id);
    updateDoc(documentoRef, {
      nombre: auto.nombre,
      anio: auto.anio,
      precio: auto.precio,
      descripcion: auto.descripcion,
      marcaId: auto.marcaId
    });
  }

  //metodo para eliminar un libro
  eliminarAuto(auto:Auto){
    const documentoRef = doc(this.db, 'Autos', auto.id);
    deleteDoc(documentoRef);
  }
}
