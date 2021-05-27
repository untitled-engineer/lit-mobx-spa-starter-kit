import { Todo} from "./todo.js";

class TodoService {
  private todoList: Array<Todo>;

  constructor() {
    this.todoList = [];

    const data = localStorage.getItem('todo-list');
    if (data) {
      console.log(data)
      this.todoList = JSON.parse(data);
    }
  }

  getTodoList() {
    return [...this.todoList];
  }

  onAddItem(value: string) {
    console.log(value)
    this.todoList.push(new Todo(
      new Date().valueOf(),
      value,
      false,
    ));
    localStorage.setItem('todo-list', JSON.stringify(this.todoList));

    return this.getTodoList();
  }

  doneItem(id: number) {
    this.todoList = this.todoList.map((item: Todo) => {
      if (item.id === id) {
        // eslint-disable-next-line no-param-reassign
        item.done = !item.done;
      }

      return item;
    });

    localStorage.setItem('todo-list', JSON.stringify(this.todoList));

    return this.getTodoList();
  }

  removeItem(id: number) {
    this.todoList = this.todoList.filter((item: Todo) => item.id !== id);

    localStorage.setItem('todo-list', JSON.stringify(this.todoList));

    return this.getTodoList();
  }
}

export default TodoService;
