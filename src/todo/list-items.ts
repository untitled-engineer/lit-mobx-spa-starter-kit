import {MobxLitElement} from "@adobe/lit-mobx";
import {html} from "lit";
import {customElement, property} from "lit/decorators.js";

import {Todo} from "./todo.js";
import './todo-item.js'
import {toJS} from "mobx";

@customElement('list-items')
export class ListItems extends MobxLitElement {

  @property({
    type: Array,
    attribute: 'todoList'
  })
  private todoList: Array<Todo>;

  constructor() {
    super();
    this.todoList = [];
  }

  connectedCallback() {
    super.connectedCallback();
  }

  render() {
    console.log('render b', this.todoList)

    const list = toJS(this.todoList).map((todo: Todo) => html`
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
