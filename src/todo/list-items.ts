import {LitElement, html} from "lit";
import {customElement, property} from "lit/decorators.js";
import {Todo} from "./todo.js";
import TodoService from "./todo-service.js";

import './todo-item.js'

@customElement('list-items')
export class ListItems extends LitElement {

  @property({
    type: Array,
    attribute: 'todo-list'
  })
  private readonly todoList: Todo[];

  private todoService: TodoService;

  constructor() {
    super();
    // this.todoList = [];
    this.todoService = new TodoService();
    this.todoList = this.todoService.getTodoList();
    console.log(this.todoList)
  }

  render() {
    const list = this.todoList.map((todo: Todo) => html`
      <todo-item .todo="${todo}"></todo-item>
    `);

    return html`
      <div class="lists">
        <div class="list">
          <h2 class="title">Today's todo list </h2>
          <div class="list-wrapper">${list}</div>
        </div>
      </div>
    `;
  }
}
