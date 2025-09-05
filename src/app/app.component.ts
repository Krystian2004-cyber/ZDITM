import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GtfsService } from './services/gtfs.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(public router:Router, private gtfsService: GtfsService, public platform: Platform) {
    this.initializeApp();
  }

 
  initializeApp()
  {
    //this.gtfsService.downloadGtfsFile();
    this.router.navigateByUrl('splash');
    //let timeout = setTimeout(this.gtfsService.downloadGtfsFile, 3000);
    
  }
}
