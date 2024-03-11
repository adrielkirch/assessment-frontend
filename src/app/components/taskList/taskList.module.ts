import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TaskListComponent } from './taskList.component';


@NgModule({
  declarations: [
    TaskListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule 
  ],
  exports: [
    TaskListComponent
  ],
  
})
export class TaskListModule { }
