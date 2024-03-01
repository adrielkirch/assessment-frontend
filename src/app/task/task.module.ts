import { NgModule } from '@angular/core';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { TaskListComponent } from './task-list/task-list.component';
@NgModule({
  declarations: [
    TaskListComponent,
    TaskDetailComponent
  ]
})
export class TaskModule {
}
