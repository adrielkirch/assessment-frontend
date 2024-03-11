import { Component } from "@angular/core";
import { Task } from "../task/model/model.task";
import { AuthService } from "../../services/auth.service";
import { TaskService } from "../../services/task.service";
@Component({
  selector: "app-task-list",
  templateUrl: "./taskList.component.html",
  styleUrls: ["./taskList.component.scss"],
})
export class TaskListComponent {
  isLoggedIn = false;
  tasks: Task[] = [];
  newTaskTitle: string = "";
  newTaskText: string = "";
  constructor(
    private authService: AuthService,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.fetchTasks();
  }

  fetchTasks(): void {
    this.taskService.getAllTasks().subscribe(
      (tasks: Task[]) => {
        console.log(tasks);
        this.tasks = tasks;
      },
      (error) => {
        console.error("Error fetching tasks:", error);
      }
    );
  }

  deleteTask(id: string): void {
    this.taskService.deleteTask(id).subscribe(
      () => {
        this.tasks = this.tasks.filter((task) => task["_id"] !== id);
        alert("Task deleted successfully.");
      },
      (error) => {
        console.error("Error deleting task:", error);
      }
    );
  }

  addTask(): void {
    this.taskService.createTask(this.newTaskTitle,this.newTaskText).subscribe(
      () => {
        this.tasks.push({
          title: this.newTaskTitle,
          text: this.newTaskText,
          status: "TODO",
        });
        this.newTaskTitle = "";
        this.newTaskText = "";
      },
      (error) => {
        console.error("Error deleting task:", error);
      }
    );
  }

  toggleTaskStatus(task: Task, status: "TODO" | "IN_PROGRESS" | "DONE"): void {
    task.status = status;
  }
  
}
