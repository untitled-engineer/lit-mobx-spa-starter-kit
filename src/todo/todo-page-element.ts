import {html, LitElement} from "lit";
import {customElement} from "lit/decorators.js";

import TodoService from "./todo-service.js";

import "./add-item.js";
import "./list-items.js";


@customElement('todo-page-element')
export class TodoPageElement extends LitElement {

  private todoService: TodoService;

  private todoList: any;

  static get properties() {
    return {
      todoList: { type: Array },
    };
  }

  constructor() {
    super();
    this.todoService = new TodoService();
    this.todoList = this.todoService.getTodoList();
  }

  protected render() {
    return html`
      <h1>my today\`s todo list</h1>
      <add-item></add-item>
      <list-items .todo-list="${this.todoList}"></list-items>
    `
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
