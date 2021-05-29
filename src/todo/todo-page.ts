import {MobxLitElement} from "@adobe/lit-mobx";
import {html} from "lit";
import {customElement, property} from "lit/decorators.js";

import {toJS} from "mobx";

import "./add-item.js";
import "./list-items.js";

import {Todo} from "./todo.js";
import {TodoStore} from "./todo-store.js";


@customElement('todo-page-element')
export class TodoPage extends MobxLitElement {

  private todoStore: TodoStore;

  @property()
  private todoList: Array<Todo> | undefined;

  constructor() {
    super();


    this.todoStore = new TodoStore();

    this.todoStore.subscribeServerToStore();

    console.log(toJS(this.todoStore.todos))

      /*
      TodoStore.create({
      folders: [
        {
          id: "1",
          title: "draft"
        }
      ],
      todos: [
        // @ts-ignore
        {
          id: "1",
          label: "Eat a cake",
          isComplete: true,
          folder: "1"
        }
      ]
    });

    const todoStore = getSnapshot(this.todoStore);

    console.log(this.todoStore.all)
    console.log(todoStore)
    // @ts-ignore
    this.todos = todoStore.todos;


       */
  }

  protected render() {
    console.log('render a' )
    // this.todoList = toJS(this.todoStore.todos);

    return html`
      <h1>my today\`s todo list</h1>
      Count is ${this.todoStore.count}
      <br />
      <button @click=${this.incrementCount}>Add</button>
      <add-item></add-item>
      <list-items .todoList="${this.todoStore.todos}"></list-items>
    `
  }

  // eslint-disable-next-line class-methods-use-this
  private incrementCount() {
    this.todoStore.increment();
  }

  connectedCallback() {
    // eslint-disable-next-line wc/guard-super-call
    super.connectedCallback();

    let todoList: Array<Todo> = [];
    const todoListData = localStorage.getItem('todo-list');

    if (todoListData) {
      todoList = JSON.parse(todoListData).todos!;
      if (todoList.length) {
        todoList.map((object: Todo) => {
          const todo: Todo = Todo.fromJS(this.todoStore, object);
          this.todoStore.addTodo(todo);

          return todo;
        })
      }
    }


    this.addEventListener('add-item', (e: Event) => {
      console.log(e);
      // @ts-ignore
      this.todoStore.addTodo(new Todo(this.todoStore, e.detail))
      // this.todoList =
      // this.todoService.onAddItem(e.detail);
    });

    this.addEventListener('remove-item', (e) => {
      // @ts-ignore
      // this.todoList =
      // this.todoService.removeItem(e.detail.id);
    });

    this.addEventListener('done-item', (e) => {
      // @ts-ignore
      // this.todoList =
      // this.todoService.doneItem(e.detail.id);
    });
  }
}
