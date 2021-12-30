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

  public currentEvent: BehaviorSubject<Event[]> = new BehaviorSubject(null);
  public actualSchedule: BehaviorSubject<Event[]> = new BehaviorSubject(null);
  public newStartTime: BehaviorSubject<number> = new BehaviorSubject(null);
  public newEndTime: BehaviorSubject<number> = new BehaviorSubject(null);

  private schedule: Event[] = [];
  private newSchedule: Event[] = [];

  constructor() {
    if (this.schedule.length === 0) {
      this.schedule = [
        {
          event: 'OFF',
          startTime: 75600000,
          endTime: 97200000,
          startLat: 6,
          startLan: 6,
          endLat: 6,
          endLan: 6
        },
        {
          event: 'SB',
          startTime: 97200000,
          endTime: 118800000,
          startLat: 6,
          startLan: 6,
          endLat: 6,
          endLan: 6
        },
        {
          event: 'D',
          startTime: 118800000,
          endTime: 140400000,
          startLat: 6,
          startLan: 6,
          endLat: 11,
          endLan: 11
        },
        {
          event: 'ON',
          startTime: 140400000,
          endTime: 151200000,
          startLat: 8,
          startLan: 8,
          endLat: 9,
          endLan: 9
        },
        {
          event: 'SB',
          startTime: 151200000,
          endTime: 162000000,
          startLat: 9,
          startLan: 9,
          endLat: 9,
          endLan: 9
        },
      ];
      this.setSchedule(this.schedule);
    }
  }

  public setSchedule(schedule: Event[]): void {
    this.newSchedule = JSON.parse(JSON.stringify(schedule));
    this.actualSchedule.next(schedule);
  }

  public saveSchedule(schedule: Event[]): void {
    this.schedule = schedule;
  }

  public getSchedule(): Event[] {
    return this.schedule;
  }

  public getNewSchedule(): Event[] {
    return this.newSchedule;
  }

  public setCurrentEvent(event: Event[]): void {
    this.currentEvent.next(event);
  }

  public setNewStartTime(time: number): void {
    this.newStartTime.next(time);
  }

  public setNewEndTime(time: number): void {
    this.newEndTime.next(time);
  }
}
