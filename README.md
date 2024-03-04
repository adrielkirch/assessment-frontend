## Task 2: Frontend

Extend the Angular project provided to you with the following functionality:

1. **Task Service:**
   - Create a `TaskService` that manages the http calls to retrieve and update tasks. Connect the service to your backend from Task #1.
   - Implement methods in the service to:
     - Get all tasks.
     - Get a specific task by id.
     - Update a task
     - [OPTIONAL] Add a new task.
     - [OPTIONAL] Delete a task.
     - [OPTIONAL] Add a comment to a task.
     - [OPTIONAL] Get all comments of a task.

2. **Task List Component (`TaskListComponent`):**
   - Display the list of tasks retrieved from the `TaskService`.
   - Display all fields for each task.
   - Clicking on an entry in the list should navigate to the detail view of a specific task.
   - [OPTIONAL] Allow the user to create a new task

3. **Task Detail Component (`TaskDetailComponent`):**
   - Display the details of a specific task retrieved from the `TaskService`.
   - Display the task details.
   - Allow editing of the follwing fields: title, text and status.
   - Include a save button to save the task.
   - [OPTIONAL] Use the id in the path to load the details
   - [OPTIONAL] Include a Delete button to delete the task.
   - [OPTIONAL] Show the comments of the task.
   - [OPTIONAL] Allow adding a comment to the task.

4. **Routing:**
   - Implement routing as follows:
     - `/tasks` => `TaskListComponent`
     - `/tasks/<taskId>` => `TaskDetailComponent` that loads the task given the id in the path.

5. **Bonus Tasks (Optional):**
   - [OPTIONAL] Use state management to store the loaded tasks & comments.
   - [OPTIONAL] Implement a robust authentication system with a LoginComponent that simulates user authentication.
   - [OPTIONAL] Use guards to protect routes, ensuring that only authenticated users can access the /tasks and /tasks/<taskId> routes.
   - [OPTIONAL] Add loading spinners while the http operations are in progress.

## Evaluation Criteria:

- Correct implementation of the requirements.
- Proper use of advanced Angular features, libraries, and patterns.
- Code organization and structure.
- Proper use of Reactive Programming
- Bonus points for creativity, additional features, and handling edge cases.

Notes:

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.2.2.