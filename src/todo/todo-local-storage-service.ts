import {Todo} from "./todo.js";
import {TodoStore} from "./todo-store.js";

class TodoLocalStorageService {

  private todoStore: TodoStore;

  constructor(todoStore: TodoStore) {
    this.todoStore = todoStore;

  }

  onCreate(task: string) {
  }

  onRead() {

  }

  onUpdate() {

  }

  onDelete() {

  }

  private updateStore() {
    // localStorage.setItem('todo-list', JSON.stringify(this.todoList));
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onAddItem(value: string) {

  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  doneItem(id: number) {
    /*
    this.todoList = this.todoList.map((item: any) => {
      if (item.id === id) {
        // eslint-disable-next-line no-param-reassign
        item.isComplete = !item.isComplete;
      }

      return item;
    });

    localStorage.setItem('todo-list', JSON.stringify(this.todoList));

     */

  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeItem(id: number) {
    /*
    this.todoList = this.todoList.filter((item: any) => item.id !== id);

    localStorage.setItem('todo-list', JSON.stringify(this.todoList));


     */
  }
}

export default TodoLocalStorageService;
