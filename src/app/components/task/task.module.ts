import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TaskComponent } from './task.component';
import { TaskRoutingModule } from './task-routing.module';

@NgModule({
  declarations: [TaskComponent],
  imports: [CommonModule, FormsModule,TaskRoutingModule],
  exports: [TaskComponent]
})
export class TaskModule { }
