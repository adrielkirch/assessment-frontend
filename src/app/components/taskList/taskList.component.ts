import { Component } from "@angular/core";
import { Task } from "../task/model/model.task";
import { AuthService } from "../../services/auth.service";
import { TaskService } from "../../services/task.service";
import { Router } from "@angular/router";
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
    private taskService: TaskService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.fetchTasks();
  }

  fetchTasks(): void {
    this.taskService.getAllTasks().subscribe(
      (tasks: Task[]) => {
        this.tasks = this.processAllCheckBoxes(tasks);
      },
      (error) => {
        console.error("Error fetchTasks task:", error);
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
    this.taskService.createTask(this.newTaskTitle, this.newTaskText).subscribe(
      () => {
        this.tasks.unshift({
          title: this.newTaskTitle,
          text: this.newTaskText,
          status: "TODO",
          statusMap: {
            TODO: true,
            IN_PROGRESS: false,
            DONE: false,
          },
        });
        this.newTaskTitle = "";
        this.newTaskText = "";
      },
      (error) => {
        console.error("Error adding task:", error);
      }
    );
  }

  toggleTaskStatus(task: Task, status: "TODO" | "IN_PROGRESS" | "DONE"): void {
    task.status = status;
    this.taskService.updateTask(task).subscribe(
      () => {
        task = this.processOneCheckBox(task);
      },
      (error) => {
        console.error("Error on updating task:", error);
      }
    );
  }

  navigate(id: string) {
    this.router.navigate([`/task/${id}`]);
  }

  processAllCheckBoxes(tasks: Task[]): Task[] {
    for (let i = 0; i < tasks.length; i++) {
      let task = tasks[i];
      task = this.processOneCheckBox(task);
    }
    return tasks;
  }
  processOneCheckBox(task: Task): Task {
    switch (task.status) {
      case "TODO":
        task.statusMap = {
          TODO: true,
          IN_PROGRESS: false,
          DONE: false,
        };
        break;
      case "IN_PROGRESS":
        task.statusMap = {
          TODO: false,
          IN_PROGRESS: true,
          DONE: false,
        };
        break;
      case "DONE":
        task.statusMap = {
          TODO: false,
          IN_PROGRESS: false,
          DONE: true,
        };
        break;
      default:
        break;
    }

    return task;
  }
}
