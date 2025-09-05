
import { Component} from '@angular/core';
import { StorageService } from './../services/storage.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {
  isBackVisible=true;
  isNextVisible=true;
  czyOstatniDzien = false;
  isntAdded=true;
  isAdded=false;
  addPlan = false;
  numerDniaTygodnia = 1;
  koniecLekcji;
  godzinyKoncaLekcji = ["","","","",""];
  dniTygodnia = ["poniedziałek","wtorek","środa","czwartek","piątek"];
  dzien = this.dniTygodnia[0];

  constructor(private storageService: StorageService) {
   

  }

  ngAfterViewInit()  {
    this.check();
   
    this.storageService.get().then(cos=>{
      console.log(cos); 
      this.godzinyKoncaLekcji=cos;
      console.log(this.godzinyKoncaLekcji);

      this.isntAdded = (this.godzinyKoncaLekcji.length ===0);
      this.isAdded = (this.godzinyKoncaLekcji.length !==0);
    });
    
    
  }

  check()
  {
   
    if(this.godzinyKoncaLekcji[this.numerDniaTygodnia-1] !== '')
    {
      this.koniecLekcji =this.godzinyKoncaLekcji[this.numerDniaTygodnia-1];
    }
    else
    {
      this.koniecLekcji ='';
    }

    if(this.numerDniaTygodnia===1)
    {
      this.isBackVisible=false;
      this.isNextVisible=true;
      this.czyOstatniDzien = false;

    }
    else if(this.numerDniaTygodnia===this.dniTygodnia.length)
    {
      this.isBackVisible=true;
      this.isNextVisible=false;
      this.czyOstatniDzien = true;

    }
    else
    {
      this.isNextVisible=true;
      this.isBackVisible=true;
      this.czyOstatniDzien = false;

    }
    this.dzien = this.dniTygodnia[this.numerDniaTygodnia-1];
   
    
  }
 
  obniz()
  {
    this.dodajGodzine();
    this.numerDniaTygodnia--;
   
    this.check();
  }
  powieksz()
  {
    this.dodajGodzine();
    this.numerDniaTygodnia++;
    
    this.check();
  }

  dodajGodzine()
  {
    console.log(this.koniecLekcji);
    this.godzinyKoncaLekcji[this.numerDniaTygodnia-1] = this.koniecLekcji;

  }

  Dodaj()
  {
    this.addPlan = true;
    this.isntAdded = false;
  }

  Edytuj()
  {
    this.dzien = this.dniTygodnia[0];
    this.numerDniaTygodnia = 1;
    this.check();
    this.addPlan = true; 
    this.isAdded = false; 
  }

  Zapisz()
  {
    this.dodajGodzine();
    console.log(this.godzinyKoncaLekcji);
    this.storageService.set(this.godzinyKoncaLekcji);
    
    this.addPlan=false;
    this.isntAdded=false;
    this.isAdded=true;
  }
  

}


