import { inject, Injectable } from '@angular/core';
import { Marca } from '../models/marca.model';
import { first } from 'rxjs';
import { addDoc, collection, collectionData, deleteDoc, Firestore, updateDoc } from '@angular/fire/firestore';
import { doc } from 'firebase/firestore';


@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  private db: Firestore = inject(Firestore);

  constructor() { }

  //Metodo para obtener todos los documentos de la coleccion
  getMarcas(){
    const MarcasCollection = collection(this.db, 'Marcas');
    return collectionData((MarcasCollection), {idField: 'id'})
      .pipe(first(),);
  }

  //metodo para agregar un nuevo documento a la coleccion
  agregarMarca(marca:Marca){
    const MarcasCollection = collection(this.db, 'Marcas');
    const MarcaData = {
      nombre: marca.nombre
    };
    addDoc(MarcasCollection, MarcaData);
  }

  //Metodo para modificar un documento
  modificarMarca(marca:Marca){
    const documentoRef = doc(this.db, 'Marcas', marca.id);
    updateDoc(documentoRef, {
      nombre: marca.nombre,
    });
  }

  //metodo para eliminar un libro
  eliminarMarca(marca:Marca){
    const documentoRef = doc(this.db, 'Marcas', marca.id);
    deleteDoc(documentoRef);
  }
}
