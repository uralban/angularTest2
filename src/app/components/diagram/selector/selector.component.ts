import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import {Subscription} from "rxjs";
import {DataService, Event} from "../../../services/data.service";

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss']
})
export class SelectorComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  public showMarkers: boolean = false;
  public containerWidth: number = 0;
  public containerOffset: number = 0;
  public offsetLeft: string = '';
  public offsetRight: string = '';
  private allWidth: number = 0;
  private koef: number = 21600000/222;
  private startLeft: number[] = [];
  private startRight: number = 0;
  private offsetLeftInit: number;
  private newOffsetLeft: number;
  private offsetRightInit: number;
  private currentElementWidth: number = 0;
  private events: Event[] = [];
  private newSchedule: Event[] = [];
  private timeShift: number = 0;
  private timeShiftLeft: number = 0;
  private timeShiftRight: number = 0;

  constructor(
    private dataService: DataService
  ) { }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.dataService.currentEvent.subscribe(event => {
        if (event){
          this.events = JSON.parse(JSON.stringify(event));
          this.containerWidth = 0;
          this.offsetLeft = '';
          this.offsetRight = '';
          this.allWidth = 0;
          this.currentElementWidth = 0;
          this.newSchedule = [];
          event.forEach(element => {
            if (element) {
              this.containerWidth += Number(element.wrapperWidth)
              this.allWidth += element.endTime - element.startTime;
            }
          });

          this.currentElementWidth = event[1].endTime - event[1].startTime;

          this.offsetLeft = this.setPosition(event[0]);
          this.offsetRight = this.setPosition(event[2]);


          // const firstIndex: number = this.dataService.getNewSchedule().indexOf(event[0]);
          let firstIndex: number = -1;
          this.dataService.getNewSchedule().find((element, index) => {
            if (event[0]) {
              if (element.event === event[0].event && element.startTime === event[0].startTime && element.endTime === event[0].endTime) {
                firstIndex = index;
                return true;
              }
            }
          });
          this.containerOffset = 0;
          if (firstIndex > 0) {
            for (let i: number = 0; i < firstIndex; i++) {
              this.containerOffset += Number(this.dataService.getSchedule()[i].wrapperWidth);
            }
          }
          this.showMarkers = true;
        }
      })
    );
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
    this.startLeft.push(event.pageX);
    this.startRight = 0;
    this.offsetLeftInit = Number(this.offsetLeft.replace('%', ''));
  }

  public rightMarkerPress(event: any): void {
    this.startRight = event.pageX;
    this.startLeft = [];
    this.offsetRightInit = Number(this.offsetRight.replace('%', ''));
  }

  public markerMove(event: any): void {
    if (this.startLeft.length) {
      this.moveLeft(event.pageX);
    } else if (this.startRight) {
      this.moveRight(event.pageX);
    }
  }

  private moveLeft(pageX): void {
    this.newOffsetLeft = this.offsetLeftInit + (pageX - this.startLeft[0]) * this.koef * 100 / this.allWidth;
    if (this.newOffsetLeft >= 0 && this.newOffsetLeft < this.currentElementWidth * 100 / this.allWidth + this.offsetLeftInit && this.events[0]) {
      this.offsetLeft = this.newOffsetLeft + '%';
      this.timeShift = Number(((this.offsetLeftInit - this.newOffsetLeft)*this.allWidth/100).toFixed(0));
      this.updateSchedule();
    }
  }

  private moveRight(pageX): void {
    const newOffsetRight = this.offsetRightInit + (pageX - this.startRight) * -1 * this.koef * 100 / this.allWidth;
    if (newOffsetRight >= 0 && newOffsetRight < this.currentElementWidth * 100 / this.allWidth + this.offsetRightInit && this.events[2]) {
      this.offsetRight = newOffsetRight + '%';
    }
  }

  public leftMarkerPressUp() {
    // const timeShift: number = Number(((this.offsetLeftInit - this.newOffsetLeft)*this.allWidth/100).toFixed(0));
    // this.updateSchedule(timeShift);
    this.startLeft = [];
    // this.newSchedule = JSON.parse(JSON.stringify(this.dataService.getSchedule()));
    // if (this.events[0]) this.events[0].endTime = this.newSchedule[this.timeShiftLeft].endTime;
    // this.events[1].startTime = this.newSchedule[this.timeShiftLeft].endTime;
    // console.log('this.timeShift', this.timeShift);
    // console.log('this.timeShiftLeft', this.newSchedule[this.timeShiftLeft].endTime);
  }

  public rightMarkerPressUp() {
    this.startRight = 0;
  }

  public updateSchedule(): void {
    const newSchedule = JSON.parse(JSON.stringify(this.dataService.getSchedule()));
    // const newSchedule = (this.newSchedule.length) ? this.newSchedule : JSON.parse(JSON.stringify(this.dataService.getSchedule()));
    const newSchedule2 = newSchedule.map((scheduleElement) => {
      if (this.events[0]) {
        if (scheduleElement.event === this.events[0].event && scheduleElement.endTime === this.events[0].endTime) {
          console.log('endTime');
          scheduleElement.endTime = this.events[0].endTime - this.timeShift;
          // this.timeShiftLeft = (this.timeShiftLeft) ? this.timeShiftLeft : index;
        } else if (scheduleElement.event === this.events[1].event && scheduleElement.startTime === this.events[1].startTime) {
          scheduleElement.startTime = this.events[1].startTime - this.timeShift;
          this.dataService.setNewStartTime(scheduleElement.startTime);
        }
      }
      return scheduleElement;
    });
    // console.log('newSchedule2', newSchedule2);
    //дернуть кнопку
    this.dataService.setSchedule(newSchedule2);
  }
}
