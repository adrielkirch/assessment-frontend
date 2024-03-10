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
    this.authService.isLoggedIn().subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
  }
 
  tasks: Task[] = [
    { title: "A default item", done: false },
    { title: "A completed default item", done: true },
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
