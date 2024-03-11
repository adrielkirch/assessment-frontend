import { Component } from "@angular/core";
import { Task } from "./model/model.task";
import { Comment } from "./model/model.comment";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-task",
  templateUrl: "./task.component.html",
  styleUrls: ["./task.component.scss"],
})
export class TaskComponent {
  isLoggedIn = false;

  newComment: string = "";
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
  }
 
  comments: Comment[] = [
    { title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut aliquet dapibus consectetur.", createdAt: new Date().toISOString()},
    { title: "Donec dapibus non augue id luctus. Vivamus porttitor ac eros et commodo.", createdAt: new Date().toISOString() },
    { title: "Ut id arcu ante. Cras blandit pretium orci, non pretium nisi tempus eget.", createdAt: new Date().toISOString()},
    { title: "Ut ornare mi ac cursus condimentum. Aliquam eu feugiat urna. Aenean in libero nec ante auctor laoreet faucibus id lectus.", createdAt: new Date().toISOString() }
  ];
  task: Task = {
    title: "Unit test all API customer",
    done: false,
  };

  taskKeys(): string[] {
    return Object.keys(this.task);
  }

  getTaskValue(key: string): any {
    return this.task[key];
  }
  
  addComment(): void {
    if (this.newComment.trim()) {
      this.comments.push({ title: this.newComment });
      this.newComment = "";
    }
    console.log(this.comments);
  }

  
  formatCreatedAt(dateString: string | undefined): string {
    if(dateString === undefined) {
      return ""
    }
    const date = new Date(dateString);
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }

}
