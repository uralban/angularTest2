import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.scss']
})
export class DiagramComponent implements OnInit, OnDestroy {

  public offTime: number = 0;
  public sbTime: number = 0;
  public dTime: number = 0;
  public onTime: number = 0;
  private subscriptions: Subscription[] = [];

  constructor(
    private dataService: DataService
  ) {}

  public ngOnInit(): void {
    this.subscriptions.push(
      this.dataService.actualSchedule.subscribe(schedule => {
        schedule.forEach(element => {
          switch (element.event) {
            case "ON":{
              this.onTime += element.endTime - element.startTime;
              break;
            }
            case "OFF":{
              this.offTime += element.endTime - element.startTime;
              break;
            }
            case "D":{
              this.dTime += element.endTime - element.startTime;
              break
            }
            case "SB":{
              this.sbTime += element.endTime - element.startTime;
              break;
            }
          }
        });
      })
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
