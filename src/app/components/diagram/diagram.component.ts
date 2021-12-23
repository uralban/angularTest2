import {AfterViewInit, Component, ComponentFactoryResolver, OnInit, ViewChild} from '@angular/core';
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.scss']
})
export class DiagramComponent implements OnInit, AfterViewInit {


  public offTime: number = 0;
  public sbTime: number = 0;
  public dTime: number = 0;
  public onTime: number = 0;

  constructor(
    private dataService: DataService,
    private resolver: ComponentFactoryResolver
  ) {
    this.dataService.schedule.forEach(element => {
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
  }

  public ngOnInit(): void {

  }

  ngAfterViewInit(): void {
  }
}
