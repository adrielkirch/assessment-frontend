import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule here

import { TaskComponent } from './task.component';

@NgModule({
  declarations: [
    TaskComponent
  ],
  imports: [
    CommonModule,
    FormsModule // Add FormsModule to the imports array
  ],
  exports: [
    TaskComponent
  ]
})
export class TaskModule { }
