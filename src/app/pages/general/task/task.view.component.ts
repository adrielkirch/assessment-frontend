import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TaskModule } from '../../../components/task/task.module';
@Component({
  selector: 'app-task-view',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, TaskModule],
  templateUrl: './task.view.component.html',
  styleUrl: './task.view.component.scss'
})
export class TaskComponent {

}
