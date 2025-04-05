import { Injectable } from '@angular/core';
import { Auth, user, User, browserSessionPersistence, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { setPersistence } from '@angular/fire/auth';
import {from, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User | null>;

  constructor(private firebaseAuth:Auth){
    this.user$ = user(this.firebaseAuth);
    this.setSessionStoragePersistence();
  }

  private setSessionStoragePersistence():void {
    setPersistence(this.firebaseAuth, browserSessionPersistence);
  } 

  //metodo para el login
  login(email: string, password:string): Observable<void>{
    const promise = signInWithEmailAndPassword(
      this.firebaseAuth,email, password
    ).then(() =>{

    });
    return from(promise)
  }

  //metodo para logout
  logout(): Observable<void>{
    const promise = signOut(this.firebaseAuth).then(() => {
      sessionStorage.clear();
    });

    return from(promise);
  }
}
