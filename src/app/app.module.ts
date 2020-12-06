import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import { HttpClientModule } from '@angular/common/http';
import { AppService } from './app.service';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    AmazingTimePickerModule ,
    HttpClientModule,
    NgxPaginationModule ],
    providers: [HttpClientModule, AppService],
    bootstrap: [AppComponent]
})
export class AppModule { }
