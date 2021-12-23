import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

export interface Event {
  event: 'OFF' | 'SB' | 'D' | 'ON'
  startTime: number
  endTime: number
  startLat: number
  startLan: number
  endLat: number
  endLan: number
  wrapperWidth?: string;
  height?: string;
  color?: string;
  margin?: string;
  border?: string;
}

@Injectable({
  providedIn: 'root'
})

export class DataService {

  public currentEvent: BehaviorSubject<Event> = new BehaviorSubject(null);

  public schedule: Event[] = [
    {
      event: 'OFF',
      startTime: -10800000,
      endTime: 10800000,
      startLat: 2,
      startLan: 2,
      endLat: 3,
      endLan: 3
    },
    {
      event: 'SB',
      startTime: 10800000,
      endTime: 32400000,
      startLat: 2,
      startLan: 2,
      endLat: 3,
      endLan: 3
    },
    {
      event: 'D',
      startTime: 32400000,
      endTime: 54000000,
      startLat: 2,
      startLan: 2,
      endLat: 3,
      endLan: 3
    },
    {
      event: 'ON',
      startTime: 54000000,
      endTime: 64800000,
      startLat: 2,
      startLan: 2,
      endLat: 3,
      endLan: 3
    },
    {
      event: 'SB',
      startTime: 64800000,
      endTime: 75600000,
      startLat: 2,
      startLan: 2,
      endLat: 3,
      endLan: 3
    },
  ];

  constructor() { }

  public setCurrentEvent(event: Event): void {
    this.currentEvent.next(event);
  }
}
