import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService, Event} from "../../services/data.service";
import {Subscription} from "rxjs";
import * as L from "leaflet";
import 'leaflet-routing-machine'
import {icon, Marker} from "leaflet";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  public element: Event = null;
  private map: L.Map;
  private marker;
  private route;

  constructor(
    private dataService: DataService
  ) {
    const iconRetinaUrl = 'assets/marker-icon-2x.png';
    const iconUrl = 'assets/marker-icon.png';
    const shadowUrl = 'assets/marker-shadow.png';
    Marker.prototype.options.icon = icon({
      iconRetinaUrl,
      iconUrl,
      shadowUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
    });
  }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.dataService.currentEvent.subscribe(eventArr => {
        if (eventArr) {
          this.element = eventArr[1];
          if (!this.map) this.initMap();
          this.map.panTo([this.element.endLat, this.element.endLan]);

          if (this.marker && this.map.hasLayer(this.marker)) this.map.removeLayer(this.marker);
          if (this.route) this.route.spliceWaypoints(0, 2);

          if (this.element.endLat !== this.element.startLat && this.element.endLan !== this.element.startLan) {

            this.route = L.Routing.control({
              router: L.Routing.osrmv1({
                serviceUrl: `http://router.project-osrm.org/route/v1/`
              }),
              showAlternatives: false,
              fitSelectedRoutes: false,
              show: false,
              routeWhileDragging: true,
              waypoints: [
                L.latLng(this.element.startLat, this.element.startLan),
                L.latLng(this.element.endLat, this.element.endLan)
              ]
            });
            this.route.addTo(this.map);

          } else {
            this.marker = L.marker([this.element.endLat, this.element.endLan]);
            this.marker.addTo(this.map);
          }
        }
      })
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [
        0,
        0
      ],
      zoom: 6
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }
}
