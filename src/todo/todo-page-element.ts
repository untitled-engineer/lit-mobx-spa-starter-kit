import {MobxLitElement} from "@adobe/lit-mobx/src/lit-mobx";
import {html} from "lit";
import {customElement} from "lit/decorators.js";

import TodoService from "./todo-service.js";

import "./add-item.js";
import "./list-items.js";

import {TodoPageStore} from "./todo-page-store.js";

import {Todo} from "./todo.js";

@customElement('todo-page-element')
export class TodoPageElement extends MobxLitElement {

  private todoPageState: TodoPageStore;

  private todoService: TodoService;

  private todoList: Array<Todo>;

  static get properties() {
    return {
      todoList: { type: Array },
    };
  }

  constructor() {
    super();
    this.todoService = new TodoService();
    this.todoPageState = new TodoPageStore();
    this.todoList = this.todoService.getTodoList();
  }

  protected render() {
    return html`
      <h1>my today\`s todo list</h1>
      Count is ${this.todoPageState.count}
      <br />
      <button @click=${this.incrementCount}>Add</button>
      <add-item></add-item>
      <list-items .todo-list="${this.todoList}"></list-items>
    `
  }


  private incrementCount() {
    this.todoPageState.increment();
  }

  connectedCallback() {
    // eslint-disable-next-line wc/guard-super-call
    super.connectedCallback();

    this.addEventListener('add-item', (e: Event) => {
      // @ts-ignore
      this.todoList = this.todoService.onAddItem(e.detail);
    });

    this.addEventListener('remove-item', (e) => {
      // @ts-ignore
      this.todoList = this.todoService.removeItem(e.detail.id);
    });

    this.addEventListener('done-item', (e) => {
      // @ts-ignore
      this.todoList = this.todoService.doneItem(e.detail.id);
    });
  }
}
