import { Component } from "@angular/core";
import { Task, TaskUpdate } from "./model/model.task";
import { Comment } from "./model/model.comment";
import { AuthService } from "../../services/auth.service";
import { TaskService } from "../../services/task.service";
import { CommentService } from "../../services/comment.service";
import { ActivatedRoute, Router } from "@angular/router";
import { LocalStorageUtil } from "../../utils/util.localstorage";
import { DateUtil } from "../../utils/util.date";

@Component({
  selector: "app-task",
  templateUrl: "./task.component.html",
  styleUrls: ["./task.component.scss"],
})
export class TaskComponent {
  isLoggedIn = false;

  newCommentText = "";
  taskId = "";
  userId = LocalStorageUtil.getCurrentUserId();
  task: Task = {
    title: "",
    text: "",
    status: "",
  };
  comments: Comment[] = [];
  edit: { [key: string]: boolean } = {};
  editedValues: { [key: string]: string } = {};
  newComment: string = "";

  constructor(
    private authService: AuthService,
    private taskService: TaskService,
    private commentService: CommentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.route.params.subscribe((params) => {
      this.taskId = params["id"];
      this.fetchTask();
      this.fetchComments();
    });
  }

  fetchTask(): void {
    this.taskService.getTaskById(this.taskId).subscribe(
      (task: Task) => {
        console.log(task);
        task["createdAt"] = this.formatCreatedAt(task["createdAt"]?.toString());
        delete task["__v"];
        this.task = this.processOneCheckBox(task);
      },
      (error) => {
        this.router.navigate(["/login"]);
        console.error("Error fetchTask task:", error);
      }
    );
  }

  fetchComments(): void {
    this.commentService.getAllComments(this.taskId).subscribe(
      (comments: Comment[]) => {
        console.log(comments);
        this.comments = comments;
      },
      (error) => {
        this.router.navigate(["/login"]);
        console.error("Error fetchTask task:", error);
      }
    );
  }

  taskKeys(): string[] {
    let keys = Object.keys(this.task);
    return keys;
  }

  getTaskValue(key: string): any {
    return this.task[key];
  }

  addComment(): void {
    if (this.newComment.trim()) {
      this.commentService
        .createComment(this.newComment, this.userId, this.taskId)
        .subscribe(
          (comment: Comment) => {
            this.comments.unshift(comment);
            this.newComment = "";
          },
          (error) => {
            this.router.navigate(["/login"]);
            console.error("Error fetchTask task:", error);
          }
        );
    }
  }

  deleteComment(id: string | undefined): void {
    this.commentService.deleteComment(id).subscribe(
      () => {
        this.comments = this.comments.filter(
          (comment) => comment["_id"] !== id
        );
        alert("Comment deleted successfully.");
      },
      (error) => {
        console.error("Error deleting task:", error);
      }
    );
  }

  toggleEdit(key: string): void {
    this.edit[key] = true;
    this.editedValues[key] = this.getTaskValue(key);
  }

  saveEdit(key: string): void {
    const taskToUpdate = {
      ...this.task,
      [key]: this.editedValues[key], // Use the edited value from editedValues
    };

    this.edit[key] = false;

    this.taskService.updateTask(taskToUpdate).subscribe(
      (updatedTask) => {
        // Update only the edited property in this.task
        this.task[key] = updatedTask[key];
      },
      (error) => {
        console.error("Error on updating task:", error);
      }
    );
  }

  cancelEdit(key: string): void {
    this.edit[key] = false;
  }
  formatCreatedAt(dateString: string | undefined): string {
    return DateUtil.formatCreatedAt(dateString);
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
