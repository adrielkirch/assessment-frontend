import { Component } from "@angular/core";
import { Task } from "../task/model/model.task";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-task-list",
  templateUrl: "./taskList.component.html",
  styleUrls: ["./taskList.component.scss"],
})
export class TaskListComponent {
  isLoggedIn = false;

  newTask: string = "";
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
  }
 
  tasks: Task[] = [
    { title: "A default item", done: false },
   
  ];

  addTask(): void {
    if (this.newTask.trim()) {
      this.tasks.push({ title: this.newTask, done: false });
      this.newTask = "";
    }
    console.log(this.tasks);
  }

  clearCompleted(): void {
    this.tasks = this.tasks.filter((task) => !task.done);
  }


}
