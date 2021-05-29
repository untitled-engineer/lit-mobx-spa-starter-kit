import {action, computed, observable, reaction, toJS} from "mobx";
import {Todo } from "./todo.js";

export class TodoStore {

  @observable
  public todos: Array<Todo> = [];

  @observable
  public count = 0;

  private value: string = "";

  @action
  public increment() {
    this.count +=1;
    console.log(this.count)
  }

  @computed
  get double() {
    return this.count * 2
  }

  *fetch() {
    // @ts-ignore
    const response = yield fetch("/api/value")
    this.value = response.json()
  }

  get allTodos() {
    return toJS(this.todos);
  }

  get completedTodosCount() {
    return this.todos.filter(
      todo => todo.isComplete
    ).length;
  }

  @computed
  get remainingCount() {
    return this.todos.filter(todo => !todo.isComplete).length;
  }

  /*
  @computed
  report() {
    if (this.todos.length === 0)
      return "<none>";
    const nextTodo = this.todos.find(todo => !todo.isComplete);

    return `Next todo: "${nextTodo ? nextTodo.value : "<none>"}". ` +
      `Progress: ${this.completedTodosCount}/${this.todos.length}`;
  }
   */

  @action
  addTodo(task: Todo) {
    this.todos.push(task);
  }

  subscribeServerToStore() {
    console.log('will be reactive')
    reaction(
      () => this.toJS(),
      todos => {
        console.log('reaction')
        localStorage.setItem('todo-list', JSON.stringify({todos}));
        fetch('/api/todos', {
          method: 'post',
          body: JSON.stringify({todos}),
          headers: new Headers({ 'Content-Type': 'application/json' })
        })
      }
    );
  }

  toJS() {
    return this.todos.map(todo => todo.toJS());
  }

  static fromJS(array: Array<Todo>) {
    const todoStore = new TodoStore();
    todoStore.todos = array.map(item => Todo.fromJS(todoStore, item));

    return todoStore;
  }

}

/*
export const TodoStore = types
  .model({
    todos: types.array(Todo),
    folders: types.array(Folder),
  })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  .views(self => ({
    get all() {
      return self.todos
    },
    get pendingCount() {
      return values(self.todos).filter((todo: any) => !todo.isComplete).length
    },
    get completedCount() {
      return values(self.todos).filter((todo: any) => todo.isComplete).length
    }
  }))
  .actions(self => ({
    addTodo(id: string, value: string) {
      self.todos.push(Todo.create({
        id,
        folder: "1",
        isComplete: false,
        label: value,
      }))
    }
  }))

 */
