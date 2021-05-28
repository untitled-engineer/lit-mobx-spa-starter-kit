// https://github.com/PolymerLabs/todo-list/tree/master/app/elements
export class Todo {

  id: number;

  label: string;

  public isComplete: boolean;

  constructor(id: number, label: string, done?: boolean) {
    this.id = id;
    this.label = label;
    this.isComplete = (done) || false;
  }
}
