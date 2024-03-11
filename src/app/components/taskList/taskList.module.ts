import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { TaskListComponent } from "./taskList.component";
import { TaskListRoutingModule } from "./taskList-routing.module";

@NgModule({
  declarations: [TaskListComponent],
  imports: [CommonModule, FormsModule, HttpClientModule, TaskListRoutingModule],
  exports: [TaskListComponent],
})
export class TaskListModule {}
