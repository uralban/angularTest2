import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DiagramComponent } from './components/diagram/diagram.component';
import { MapComponent } from './components/map/map.component';
import { DetailsComponent } from './components/details/details.component';
import { ElementComponent } from './components/diagram/element/element.component';
import { SelectorComponent } from './components/diagram/selector/selector.component';
import { EventNamePipe } from './pipes/event-name.pipe';

@NgModule({
  declarations: [
    AppComponent,
    DiagramComponent,
    MapComponent,
    DetailsComponent,
    ElementComponent,
    SelectorComponent,
    EventNamePipe
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
