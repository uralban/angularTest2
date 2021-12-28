import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService, Event} from "../../services/data.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  public element: Event;

  constructor(
    private dataService: DataService
  ) { }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.dataService.currentEvent.subscribe(eventArr => {
        if (eventArr) {
          this.element = eventArr[1];
        }
      })
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
