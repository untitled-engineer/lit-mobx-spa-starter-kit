import {MobxLitElement} from "@adobe/lit-mobx";
import { html} from "lit";
import {customElement, property} from "lit/decorators.js";


@customElement('add-item')
export class AddItem extends MobxLitElement {

  @property({type: String})
  private todoItem: string;

  constructor() {
    // Always call super() first
    super();
    this.todoItem = '';
  }

  inputKeyPress(e: Event) {
    // @ts-ignore
    if (e.keyCode === 13) {
      this.onAddItem()
    } else {
      // @ts-ignore
      this.todoItem = e.target.value;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onAddItem(e?: Event) {
    console.log(e)
    if (this.todoItem !== '') {
      const event = new CustomEvent('add-item', {
        bubbles: true,
        composed: true,
        detail: this.todoItem
      });
      this.dispatchEvent(event);
      this.todoItem = '';
    }
  }

  render() {
    return html`
      <div class="container">
        <div class="add">
          <div class="header">
            <h1>Add a new todo</h1>
          </div>
          <div class="input-container">
            <input
              type="text"
              .value="${this.todoItem}"
              placeholder="Todo item"
              @keyup=${(e: Event) => this.inputKeyPress(e)}
            />
            <button class="btn-enter"
                    @click=${(e: Event) => this.onAddItem(e)}
            >Add item
            </button>
          </div>
        </div>
    `;
  }
}
