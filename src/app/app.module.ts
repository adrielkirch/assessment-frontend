import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorModule } from './interceptors/interceptor.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Interceptor } from './interceptors/interceptor.service';
@NgModule({
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule
  ],
  providers: [
    Interceptor, 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor, 
      multi: true
    }
  ]
})
export class AppModule { }
