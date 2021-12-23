import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {DataService} from "../../../services/data.service";

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss']
})
export class SelectorComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];

  constructor(
    private dataService: DataService
  ) { }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.dataService.currentEvent.subscribe(event => {
        if (event){
          console.log(event);
        }
      })
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(subscribe => subscribe.unsubscribe());
  }

}
