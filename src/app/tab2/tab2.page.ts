import { Component, ViewChild } from '@angular/core';
import { GtfsService } from '../services/gtfs.service';
import { ViewEncapsulation } from '@angular/core';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class Tab2Page {

  public calendar = [];
  public calendar_dates = [];
  public routes = [];
  public stop_times = [];
  public stops = [];
  public tranfers = [];
  public trips = [];
  public przystanki0 = [];
  public przystanki1 = [];

  public htmlStr: string;
  public szczegolyRozkladu: string;
  public pokazGodzinyOdjazdu: boolean;
  public biezacaLinia: any;
  public biezacyPrzystanek: any;
  public numeryGodzin = [];
  public podzieloneNaGodziny = [];

  public tripA: any; // <- Dodane jako pole klasy
  public tripB: any;

  @ViewChild(IonContent) content: IonContent;

  public arr = [];

  block = 'start';
  behaviour = 'auto';
  offsetTop = 0;

  constructor(private gtfsService: GtfsService) {
    this.calendar = this.gtfsService.calendar;
    this.calendar_dates = this.gtfsService.calendar_dates;
    this.routes = this.gtfsService.routes.slice(0, -1);
    this.stop_times = this.gtfsService.stop_times;
    this.stops = this.gtfsService.stops;
    this.tranfers = this.gtfsService.trips;
    this.trips = this.gtfsService.trips;

    for (let val = 0; val < 100; val++) {
      this.arr.push(`Element - ${val}`);
    }
  }

  scrollBottom() {
    this.content.scrollToBottom(1000);
  }

  scrollToTop() {
    this.content.scrollToTop(1000);
  }

  onScroll(e) {
    this.offsetTop = e.detail.scrollTop;
  }

  WyswietlPrzystankiDlaLinii(route) {
    this.szczegolyRozkladu = 'przystanki';
    this.biezacaLinia = route;
    const nameOfRoute = route.route_id;

    this.przystanki0 = [];
    this.przystanki1 = [];

    const dupa = this.routes.find(r => r.route_id == nameOfRoute);
    const NamesOfRoute = dupa.route_long_name.split(' - ');
    let mniejsze = [];
    NamesOfRoute.forEach(NOF => {
      mniejsze = NOF.split('/');
    });

    // Szukanie tripA
    this.tripA = this.trips.find(t =>
      t.route_id == nameOfRoute &&
      t.direction_id == '0' &&
      (t.trip_headsign == NamesOfRoute[0] ||
        t.trip_headsign == NamesOfRoute[1] ||
        mniejsze.some(x => x == t.trip_headsign)) &&
      t.trip_id.slice(-1) > 2
    );

    if (!this.tripA) {
      this.tripA = this.trips.find(t =>
        t.route_id == nameOfRoute &&
        t.direction_id == '0' &&
        t.trip_id.slice(-1) > 2
      );
      if (!this.tripA) {
        this.tripA = this.trips.find(t =>
          t.route_id == nameOfRoute &&
          t.direction_id == '1' &&
          t.trip_id.slice(-1) > 2
        );
        if (!this.tripA) {
          this.tripA = this.trips.find(t =>
            t.route_id == nameOfRoute &&
            t.direction_id == '0'
          );
        }
      }
    }

    if (this.tripA) {
      const sae = this.tripA.sae_trip_id;
      const przystankiA = this.stop_times.filter(trip => trip.sae_trip_id == sae);
      przystankiA.forEach(p => {
        const przystanek = this.stops.find(s => s.stop_id == p.stop_id);
        this.przystanki0.push(przystanek);
      });
    }

    // Szukanie tripB
    this.tripB = this.trips.find(t =>
      t.route_id == nameOfRoute &&
      t.direction_id == '1' &&
      (t.trip_headsign == NamesOfRoute[0] ||
        t.trip_headsign == NamesOfRoute[1] ||
        mniejsze.some(x => x == t.trip_headsign)) &&
      t.trip_id.slice(-1) > 2
    );

    if (!this.tripB) {
      this.tripB = this.trips.find(t =>
        t.route_id == nameOfRoute &&
        t.direction_id == '1' &&
        t.trip_id.slice(-1) > 2
      );
      if (!this.tripB) {
        this.tripB = this.trips.find(t =>
          t.route_id == nameOfRoute &&
          t.direction_id == '0' &&
          t.trip_id.slice(-1) > 2
        );
        if (!this.tripB) {
          this.tripB = this.trips.find(t =>
            t.route_id == nameOfRoute &&
            t.direction_id == '1'
          );
        }
      }
    }

    if (this.tripB) {
      const sae = this.tripB.sae_trip_id;
      const przystankiB = this.stop_times.filter(trip => trip.sae_trip_id == sae);
      przystankiB.forEach(p => {
        const przystanek = this.stops.find(s => s.stop_id == p.stop_id);
        this.przystanki1.push(przystanek);
      });
    }
  }

  WyswietlGodzinyOdjazdu(przystanek) {
    this.numeryGodzin = [];
    this.podzieloneNaGodziny = [];
    this.szczegolyRozkladu = 'godzinyOdjazdu';
    this.scrollToTop();
    this.biezacyPrzystanek = przystanek.target.innerHTML;

    const przystanekId = przystanek.target.id;
    let id = przystanekId.toString().slice(-1);
    let stopCode = przystanekId.toString().slice(0, -1);
    const linia = this.biezacaLinia.route_id;

    let saeTrips = [];
    let tripsy = [];

    if (id == '0') {
      saeTrips = this.trips.filter(t =>
        t.route_id == linia &&
        t.direction_id == 0 &&
        t.service_id.includes('POW')
      );
    } else if (id == '1') {
      saeTrips = this.trips.filter(t =>
        t.route_id == linia &&
        t.direction_id == 1 &&
        t.service_id.includes('POW')
      );
    }

    saeTrips.forEach(s => tripsy.push(s.sae_trip_id));

    let godziny1 = [];
    tripsy.forEach(trip => {
      const godziny = this.stop_times.find(st =>
        st.stop_id == stopCode &&
        st.trip_id.includes(`${linia}_POW`) &&
        st.sae_trip_id == trip
      );
      if (godziny !== undefined) {
        godziny1.push(godziny.arrival_time);
      }
    });

    godziny1 = godziny1.filter((x, i, a) => a.indexOf(x) === i);
    godziny1.sort((a, b) => a.localeCompare(b));

    const podzieloneGodziny = godziny1.map(g => g.split(':'));

    podzieloneGodziny.forEach(pg => {
      this.numeryGodzin.push(pg[0]);
    });
    this.numeryGodzin = this.numeryGodzin.filter((x, i, a) => a.indexOf(x) === i);

    this.numeryGodzin.forEach(ng => {
      const temp = [];
      podzieloneGodziny.forEach(pg => {
        if (pg[0] == ng) {
          temp.push(pg);
        }
      });
      this.podzieloneNaGodziny.push(temp);
    });
  }

  Powrot(e) {
    const checker = e.target.id;
    if (checker == '2') {
      this.szczegolyRozkladu = 'przystanki';
    }
    if (checker == '1') {
      this.szczegolyRozkladu = '';
    }
  }
}
