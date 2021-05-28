import {observable, action} from "mobx";
import {Todo} from "./todo.js";

export class TodoPageStore {

  @observable
  private todos: Array<Todo> = [];

  @observable
  public count = 0;

  @action
  public increment() {
    this.count +=1;
    console.log(this.count)
  }

  get completedTodosCount() {
    return this.todos.filter(
      todo => todo.isComplete
    ).length;
  }

  report() {
    if (this.todos.length === 0)
      return "<none>";
    const nextTodo = this.todos.find(todo => !todo.isComplete);

    return `Next todo: "${nextTodo ? nextTodo.label : "<none>"}". ` +
      `Progress: ${this.completedTodosCount}/${this.todos.length}`;
  }

  addTodo(task: Todo) {
    this.todos.push(task);
  }
}
