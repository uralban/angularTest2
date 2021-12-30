import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService, Event} from "../../../services/data.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.scss']
})
export class ElementComponent implements OnInit, OnDestroy {

  public elements: Event[] = [];
  private subscriptions: Subscription[] = [];

  constructor(
    private dataService: DataService
  ) {}

  public ngOnInit(): void {
    this.subscriptions.push(
      this.dataService.actualSchedule.subscribe(schedule => {
        let prevItem: Event = null;
        this.elements = schedule.map(item => {
          item.wrapperWidth = String((item.endTime - item.startTime)*100/86400000);
          switch (item.event) {
            case "OFF": {
              if (prevItem){
                switch (prevItem.event) {
                  case "SB": {
                    item.height = '65px';
                    break;
                  }
                  case "D": {
                    item.height = '130px';
                    break;
                  }
                  case "ON": {
                    item.height = '195px';
                    break;
                  }
                  default: {
                    item.border = '5px 0 0 2px';
                    item.height = '0';
                  }
                }
              }
              item.border = '5px 0 0 2px';
              item.margin = '25px';
              item.color = '#dc3545';
              break;
            }
            case "SB": {
              if (prevItem){
                switch (prevItem.event) {
                  case "OFF": {
                    item.height = '65px';
                    item.margin = '25px';
                    item.border = '0 0 5px 2px';
                    break;
                  }
                  case "D": {
                    item.height = '65px';
                    item.margin = '90px';
                    item.border = '5px 0 0 2px';
                    break;
                  }
                  case "ON": {
                    item.height = '130px';
                    item.margin = '90px';
                    item.border = '5px 0 0 2px';
                    break;
                  }
                  default: {
                    item.border = '5px 0 0 2px';
                    item.height = '0';
                    item.margin = '90px';
                  }
                }
              }
              item.color = '#6c757d';
              break;
            }
            case "D": {
              if (prevItem) {
                switch (prevItem.event) {
                  case "OFF": {
                    item.height = '130px';
                    item.margin = '25px';
                    item.border = '0 0 5px 2px';
                    break;
                  }
                  case "SB": {
                    item.height = '65px';
                    item.margin = '90px';
                    item.border = '0 0 5px 2px';
                    break;
                  }
                  case "ON": {
                    item.height = '65px';
                    item.margin = '155px';
                    item.border = '5px 0 0 2px';
                    break;
                  }
                  default: {
                    item.border = '5px 0 0 2px';
                    item.height = '0';
                    item.margin = '155px';
                  }
                }
              }
              item.color = '#28a745';
              break;
            }
            case "ON": {
              if (prevItem) {
                switch (prevItem.event) {
                  case "OFF": {
                    item.height = '195px';
                    item.margin = '25px';
                    break;
                  }
                  case "SB": {
                    item.height = '130px';
                    item.margin = '90px';
                    break;
                  }
                  case "D": {
                    item.height = '65px';
                    item.margin = '155px';
                    break;
                  }
                  default: {
                    item.height = '0';
                    item.margin = '220px';
                  }
                }
              }
              item.border = '0 0 5px 2px';
              item.color = '#ffc107';
              break;
            }
          }
          prevItem = item;
          return item;
        });
      })
    );
  }

  public selectArea(element: Event): void {
    const elementsArr: Event[] = [];
    const elementIndex: number = this.elements.indexOf(element);
    const actualSchedule = this.dataService.getSchedule();
    this.dataService.setSchedule(actualSchedule);

    elementsArr.push((elementIndex === 0) ? null : actualSchedule[elementIndex - 1]);
    elementsArr.push(element);
    elementsArr.push((elementIndex === actualSchedule.length-1) ? null : actualSchedule[elementIndex + 1]);

    this.dataService.setCurrentEvent(elementsArr);
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
