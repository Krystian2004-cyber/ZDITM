import { Component, OnInit, ViewChild } from '@angular/core';
import { Kobiton } from 'protractor/built/driverProviders';
import { GtfsService } from '../services/gtfs.service';
import { ViewEncapsulation } from '@angular/core';
import { IonList, IonContent } from '@ionic/angular';
 
 
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class Tab2Page {
 
  public calendar: Array<{ service_id: string, monday: number, tuesday: number, wednesday: number, thursday: number, friday: number, saturday: number, sunday: number, start_date: number, end_date: number }>
    = [];
 
  calendar_dates = [];
  routes = [];
  stop_times = [];
  stops = [];
  tranfers = [];
  trips = [];
  przystanki0 = [];
  przystanki1 = [];
 
  htmlStr: string;
  szczegolyRozkladu: string;
  pokazGodzinyOdjazdu: boolean;
  biezacaLinia: any;
  biezacyPrzystanek: any;
  numeryGodzin = [];
  podzieloneNaGodziny = [];
 
  @ViewChild(IonContent) content: IonContent;
  arr = [];
 
  block = 'start';
  behaviour = 'auto';
 
  offsetTop = 0;
 
  constructor(
    private gtfsService: GtfsService) {
    this.calendar = this.gtfsService.calendar;
    this.calendar_dates = this.gtfsService.calendar_dates;
    this.routes = this.gtfsService.routes.slice(0, -1);
    this.stop_times = this.gtfsService.stop_times;
    this.stops = this.gtfsService.stops;
    this.tranfers = this.gtfsService.trips;
    this.trips = this.gtfsService.trips;
    //console.log(this.routes);
 
    for (let val = 0; val < 100; val++){
      this.arr.push(`Element - ${val}`)
    }
  }
 
  scrollBottom(){
    this.content.scrollToBottom(1000);
  }
  scrollToTop(){
    this.content.scrollToTop(1000);
  }
 
  onScroll(e){
    this.offsetTop = e.detail.scrollTop;
  }
 
 
  ionViewWillEnter() {
  }
 
 
 
  WyswietlPrzystankiDlaLinii(route) {
    this.szczegolyRozkladu = 'przystanki';
    this.biezacaLinia = route;
    var nameOfRoute = route.route_id;
    // console.log(linia.target.innerHTML);
    //console.log("here");
    this.przystanki0 = [];
    this.przystanki1 = [];
    var przystankiA = [];
    //&& t.trip_id.slice(-1)>2
    // var przystanki0 = [];
    var dupa = this.routes.find(r => r.route_id == nameOfRoute);
    var mniejsze = [];
    var NamesOfRoute = dupa.route_long_name.split(' - ');
    NamesOfRoute.forEach(NOF => {
      mniejsze = NOF.split('/');
    })
    // console.log(NamesOfRoute);A
    /* && t.trip_id.slice(-1) > 2*/
    var tripA;
    tripA = this.trips.find(t => t.route_id == nameOfRoute && t.direction_id == '0' && (t.trip_headsign == NamesOfRoute[0] || t.trip_headsign == NamesOfRoute[1] || mniejsze.some(x => x == t.trip_headsign)) && t.trip_id.slice(-1) > 2);
    if (!tripA) {
      console.log("s")
      tripA = this.trips.find(t => t.route_id == nameOfRoute && t.direction_id == '0' && t.trip_id.slice(-1) > 2);
      if (!tripA) {
        tripA = this.trips.find(t => t.route_id == nameOfRoute && t.direction_id == '1' && t.trip_id.slice(-1) > 2);
        if (!tripB) {
          tripA = this.trips.find(t => t.route_id == nameOfRoute && t.direction_id == '0')
        }
      }
    }
    console.log(tripA);
    var sae = tripA.sae_trip_id;
    var przystankiA = this.stop_times.filter(trip => trip.sae_trip_id == sae);
    //console.log(przystankiA);
 
    przystankiA.forEach(p => {
      let przystanek = this.stops.find(s => s.stop_id == p.stop_id);
      // console.log(przystanek.stop_name);
      this.przystanki0.push(przystanek);
    });
    //  this.przystanki0.forEach(p => console.log(p.stop_name));
    //console.log(przystanki0);
 
 
    var przystankiB = [];
 
    // var przystanki1 = [];
    var tripB;
    tripB = this.trips.find(t => t.route_id == nameOfRoute && t.direction_id == '1' && (t.trip_headsign == NamesOfRoute[0] || t.trip_headsign == NamesOfRoute[1]
      || mniejsze.some(x => x == t.trip_headsign)) && t.trip_id.slice(-1) > 2);
    if (!tripB) {
      console.log("s")
      tripB = this.trips.find(t => t.route_id == nameOfRoute && t.direction_id == '1' && t.trip_id.slice(-1) > 2);
      if (!tripB) {
        tripB = this.trips.find(t => t.route_id == nameOfRoute && t.direction_id == '0' && t.trip_id.slice(-1) > 2);
        if (!tripB) {
          tripB = this.trips.find(t => t.route_id == nameOfRoute && t.direction_id == '1')
        }
      }
 
    }
    console.log(tripB);
    var sae = tripB.sae_trip_id;
    var przystankiB = this.stop_times.filter(trip => trip.sae_trip_id == sae);
    //console.log(przystankiB);
 
    przystankiB.forEach(p => {
      let przystanek = this.stops.find(s => s.stop_id == p.stop_id);
      //console.log(przystanek.stop_name);
      this.przystanki1.push(przystanek);
    });
    //  this.przystanki1.forEach(p => console.log(p.stop_name));
    //console.log(przystanki1);
    // this.WyswietlGodzinyOdjazdu(10421, 0, '11', NamesOfRoute, mniejsze);
 
    // this.WyswietlGodzinyOdjazdu(10434, 1, '11', NamesOfRoute, mniejsze);
 
    //this.WyswietlGodzinyOdjazdu(805610);
 
    // this.WyswietlGodzinyOdjazdu(11331
 
 
    //   ,0,'11');
  }
 
  WyswietlGodzinyOdjazdu(przystanek) {
    this.numeryGodzin = [];
  this.podzieloneNaGodziny = [];
    this.szczegolyRozkladu = 'godzinyOdjazdu';
    this.scrollToTop();
    this.biezacyPrzystanek = przystanek.target.innerHTML;
    //var godziny = [];
    var godziny1 = [];
    console.log("jestem");
    this.pokazGodzinyOdjazdu = true;
    var tripsy = [];
    var saeTrips = [];
    przystanek = przystanek.target.id;
    console.log(przystanek);
    var id = przystanek.toString().slice(-1);
    przystanek = przystanek.toString().slice(0, -1);
    console.log(id);
    console.log(przystanek);
    var linia = this.biezacaLinia.route_id;
    console.log(this.biezacaLinia);
 
 
 
    if (id == 0) {
      console.log("przystanki", this.przystanki0);
      console.log("index", this.przystanki0.findIndex(obj => obj.stop_code == przystanek) + 1);
      saeTrips = this.trips.filter(t => t.route_id == linia && t.direction_id == 0 && t.service_id.includes('POW')); /*&& (t.trip_headsign == NamesOfRoute[0] || t.trip_headsign == NamesOfRoute[1] || mniejsze.some(x => x == t.trip_headsign))*/
      saeTrips.forEach(s => tripsy.push(s.sae_trip_id));
 
    }
    else if (id == 1) {
      console.log("przystanki", this.przystanki1);
      console.log("index", this.przystanki1.findIndex(obj => obj.stop_code == przystanek) + 1);
      saeTrips = this.trips.filter(t => t.route_id == linia && t.direction_id == 1 && t.service_id.includes('POW'));/*&& (t.trip_headsign == NamesOfRoute[0] || t.trip_headsign == NamesOfRoute[1] || mniejsze.some(x => x == t.trip_headsign))*/
      saeTrips.forEach(s => tripsy.push(s.sae_trip_id));
    }
    console.log(tripsy);
 
    tripsy.forEach(trip => {
      var godziny = this.stop_times.find(st => st.stop_id == przystanek && st.trip_id.includes(`${linia}_POW`) && st.sae_trip_id == trip);
      if (godziny !== undefined) {
        godziny1.push(godziny.arrival_time);
      }
 
    })
 
    //var godziny = this.stop_times.filter(st => st.stop_id == przystanek && st.trip_id.includes('_POW') && st.stop_sequence == this.przystanki0.findIndex(obj => obj.stop_code == przystanek)+1);
    godziny1 = godziny1.filter((x, i, a) => a.indexOf(x) === i)
    godziny1.sort(function (a, b) {
      return a.localeCompare(b);
    });
 
    console.log(godziny1);
    var podzieloneGodziny = [];
    godziny1.forEach(g => {
      let podzielonaGodzina = g.split(':');
      podzieloneGodziny.push(podzielonaGodzina);
    })
    //console.log(podzieloneGodziny);
 
 
    podzieloneGodziny.forEach(pg => {
      this.numeryGodzin.push(pg[0]);
    })
    this.numeryGodzin = this.numeryGodzin.filter((x, i, a) => a.indexOf(x) === i)
    // console.log(numeryGodzin);
 
 
    this.numeryGodzin.forEach(ng => {
      let temp = []
      podzieloneGodziny.forEach(pg => {
        if (pg[0] == ng) {
          temp.push(pg);
        }
      })
      this.podzieloneNaGodziny.push(temp);
 
 
    })
    console.log(this.podzieloneNaGodziny);
 
  }
  Powrot(e) {
    var checker = e.target.id;
    if(checker == 2)
    {
      this.szczegolyRozkladu = 'przystanki';
    }
    if(checker == 1)
    {
      this.szczegolyRozkladu = '';
    }
 
  }
}