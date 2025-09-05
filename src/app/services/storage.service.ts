import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular'; 


@Injectable({
  providedIn: 'root'
})
export class StorageService {



  constructor(private storage: Storage) {
      this.storage.create();
    
   }


 async set(Dni: Array<string>)
  {
    console.log(Dni);
    this.storage.clear();
    this.storage.set('dni', Dni);
    
  }

 async get()
  {
    //this.storage.clear();
    const val = await this.storage.get('dni');
  
    console.log(val);
    return val || [];
  
  }

  
}