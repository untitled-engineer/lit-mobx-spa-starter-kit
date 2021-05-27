export class Todo {

  id: number;

  label: string;

  public done: boolean;

  constructor(id: number, label: string, done?: boolean) {
    this.id = id;
    this.label = label;
    this.done = (done) || false;
  }
}
