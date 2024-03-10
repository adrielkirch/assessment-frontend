import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule here

import { TaskListComponent } from './taskList.component';

@NgModule({
  declarations: [
    TaskListComponent
  ],
  imports: [
    CommonModule,
    FormsModule // Add FormsModule to the imports array
  ],
  exports: [
    TaskListComponent
  ]
})
export class TaskListModule { }
