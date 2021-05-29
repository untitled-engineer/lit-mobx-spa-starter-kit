// https://github.com/PolymerLabs/todo-list/tree/master/app/elements


import {observable} from "mobx";
import {TodoStore} from "./todo-store.js";

export class Todo {
  store: TodoStore

  id: number = 0;

  @observable
  isComplete: boolean = false;

  @observable
  task: string = "";

  constructor(store: TodoStore, task: string, isComplete = false) {
    this.store = store;
    this.task = task;
    this.isComplete = isComplete;
  }

  toJS() {
    return {
      id: this.id,
      task: this.task,
      isComplete: this.isComplete
    };
  }

  static fromJS(store: TodoStore, object: Todo) {
    return new Todo(store, object.task, object.isComplete);
  }
}

/*
export const Folder = types
  .model({
    id: types.identifier,
    title: types.string,
  })
  .views(self => ({
    get fullTitle() {
      return self.title
    }
  }))

export const Todo = types
  .model({
    id: types.identifier,
    label: types.string,
    isComplete: types.boolean,
    folder: types.reference(Folder)
  })
  .actions(self => ({
    setTitle(newName: string) {
      // eslint-disable-next-line no-param-reassign
      self.label = newName
    },

    toggleComplete() {
      // eslint-disable-next-line no-param-reassign
      self.isComplete = !self.isComplete
    }
  }))


 */
