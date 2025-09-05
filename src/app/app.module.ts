import { NgModule } from '@angular/core';
import { IonicStorageModule } from '@ionic/storage-angular';

import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GtfsService } from './services/gtfs.service';
import { HttpClientModule } from '@angular/common/http';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { FileTransfer} from '@awesome-cordova-plugins/file-transfer/ngx';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { Zip } from '@ionic-native/zip';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    GtfsService,FileTransfer,File,HTTP,Zip],
  bootstrap: [AppComponent],
})
export class AppModule { }
