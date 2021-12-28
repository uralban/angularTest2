import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'eventName'
})
export class EventNamePipe implements PipeTransform {

  transform(value: string, args?: any): any {
    switch (value) {
      case 'OFF': {
        return 'Off Duty';
      }
      case 'SB': {
        return 'Sleeper Berth';
      }
      case 'D': {
        return 'Driving';
      }
      case 'ON': {
        return 'On Duty';
      }
      default: {
        return null;
      }
    }
  }

}
