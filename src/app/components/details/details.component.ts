import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService, Event} from "../../services/data.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html'
})
export class DetailsComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  public element: Event;
  public disabledBtn: boolean = true;

  constructor(
    private dataService: DataService
  ) { }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.dataService.currentEvent.subscribe(eventArr => {
        if (eventArr) {
          this.element = JSON.parse(JSON.stringify(eventArr[1]));
          this.disabledBtn = true;
        }
      })
    );

    this.subscriptions.push(
      this.dataService.newStartTime.subscribe(newStartTime => {
        if (newStartTime) {
          this.disabledBtn = (this.element.startTime === newStartTime);
          this.element.startTime = newStartTime;
        }
      })
    );

    this.subscriptions.push(
      this.dataService.newEndTime.subscribe(newEndTime => {
        if (newEndTime) {
          this.disabledBtn = (this.element.endTime === newEndTime);
          this.element.endTime = newEndTime;
        }
      })
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  public saveData(): void {
    this.dataService.saveSchedule();
    this.disabledBtn = true;
  }

}
