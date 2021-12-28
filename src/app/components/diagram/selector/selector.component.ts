import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild
} from '@angular/core';
import {Subscription} from "rxjs";
import {DataService, Event} from "../../../services/data.service";

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss']
})
export class SelectorComponent implements OnInit, OnDestroy, AfterViewChecked {

  @ViewChild('#markerLeft') markerLeft: ElementRef;

  private subscriptions: Subscription[] = [];
  public showMarkers: boolean = false;
  public containerWidth: number = 0;
  public containerOffset: number = 0;
  public offsetLeft: string = '';
  public offsetRight: string = '';
  private allWidth: number = 0;
  private koef: number = 21600000/222;
  private leftMarker: any;

  constructor(
    private dataService: DataService,
    public renderer: Renderer2
  ) { }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.dataService.currentEvent.subscribe(event => {
        if (event){
          this.containerWidth = 0;
          this.offsetLeft = '';
          this.offsetRight = '';
          this.allWidth = 0;
          event.forEach(element => {
            if (element) {
              this.containerWidth += Number(element.wrapperWidth)
              this.allWidth += element.endTime - element.startTime;
            }
          });

          this.offsetLeft = this.setPosition(event[0]);
          this.offsetRight = this.setPosition(event[2]);


          const firstIndex: number = this.dataService.getSchedule().indexOf(event[0]);
          this.containerOffset = 0;
          if (firstIndex > 0) {
            for (let i: number = 0; i < firstIndex; i++) {
              this.containerOffset += Number(this.dataService.getSchedule()[i].wrapperWidth);
            }
          }

          //Нарисовать маркеры
          //Повесить на них события

          this.showMarkers = true;

          console.log('event', event);
          //Оперативно изменять значения времени в actualSchedule
          //При нажатии на кнопку - сохранять текущие данные
          // this.leftMarker = this.renderer.selectRootElement('#marker-left');
          // console.log('this.leftMarker', this.leftMarker)
        }
      })
    );
  }

  public ngAfterViewChecked(): void {
    // console.log(this.markerLeft);
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(subscribe => subscribe.unsubscribe());
  }

  private setPosition(element): string {
    if (element) {
      return String((element.endTime - element.startTime - 7 * this.koef) * 100 / this.allWidth) + '%';
    } else {
      return  '-' + String(7 * this.koef * 100 / this.allWidth) + '%';
    }
  }

  public leftMarkerPress(event: any): void {
    console.log('leftMarkerPress', event.pageX);

  }

  public leftMarkerMove(event: any): void {
    console.log('leftMarkerMove', event.pageX);

  }
}
