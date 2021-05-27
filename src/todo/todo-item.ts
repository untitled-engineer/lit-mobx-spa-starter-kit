import {LitElement, html} from "lit";
import {customElement, property} from "lit/decorators.js";
import {Todo} from "./todo.js";


@customElement('todo-item')
export class TodoItem extends LitElement {

  @property({
    type: Object,
    attribute: 'todo'
  })
  private todo: Todo;

  constructor() {
    // Always call super() first
    super();
    this.todo = new Todo(0, "");
  }

  onRemoveItem(id: number) {
    const event = new CustomEvent('remove-item', {
      bubbles: true,
      composed: true,
      detail: {id}
    });
    this.dispatchEvent(event);
  }

  onDone(id: number) {
    const event = new CustomEvent('done-item', {
      bubbles: true,
      composed: true,
      detail: {id}
    });
    this.dispatchEvent(event);
  }

  render() {
    return html`
      <div class="list-item">
        <input type="checkbox"
               ?checked="${this.todo.done}"
               @click="${this.onDone(this.todo.id)}" />
        <div class="item">${this.todo.label}</div>
        <button class="delete"
                @click="${this.onRemoveItem(this.todo.id)}">
          <strong>X<strong>
        </button>
      </div>
    `;
  }
}
