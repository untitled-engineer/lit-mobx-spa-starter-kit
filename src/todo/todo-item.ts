import {LitElement, html} from "lit";
import {customElement, property} from "lit/decorators.js";
import {Todo} from "./todo.js";

import '@polymer/paper-material/paper-material.js';
import '@polymer/paper-checkbox/paper-checkbox.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-icon-button/paper-icon-button.js';

@customElement('todo-item')
export class TodoItem extends LitElement {

  @property({
    type: Object,
    attribute: 'todo'
  })
  private readonly todo: Todo;

  private active: boolean;

  constructor() {
    // Always call super() first
    super();
    this.todo = new Todo(0, "");
    this.active = false;
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
      <paper-material elevation="${this._computeElevation(this.active)}"
                      class="row layout horizontal center">

        <!-- Note the use of $= for aria-labelledby. This is because there's
        no corresponding js property so we need to write a literal attribute
        value, which is what $= does. -->
        <paper-checkbox id="checkbox"
                        checked="${this.todo.isComplete}"
                        aria-labelledby="${this._computeLabelId(this.todo.id)}"></paper-checkbox>

        <paper-input id="${this._computeLabelId(this.todo.id)}"
                     class="flex"
                     value="${this.todo.label}"
                     no-label-float
                     @keypress="${this._checkConfirmation}"></paper-input>

        <paper-icon-button icon="todo-icons:delete"
                           class="btn-cancel"
                           aria-label="Delete Todo"
                           tabindex="0"
                           @click="${this._onDelete}">
        </paper-icon-button>

      </paper-material>

    `;
  }

  connectedCallback() {
    // eslint-disable-next-line wc/guard-super-call
    super.connectedCallback();

    this.addEventListener('focus', this._activate.bind(this), true);
    this.addEventListener('blur', this._deactivate.bind(this), true);
    this.addEventListener('mouseenter', this._activate.bind(this));
    this.addEventListener('mouseleave', this._deactivate.bind(this));
  }

  private _activate():void  {
    this.active = true;
  }

  private _deactivate():void  {
    this.active = false;
  }

  // eslint-disable-next-line class-methods-use-this
  private _computeElevation(active: boolean) {
    return active ? 2 : 0;
  }

  // eslint-disable-next-line class-methods-use-this
  private _computeLabelId(id: number): string{
    return String(id);

  }

  // eslint-disable-next-line class-methods-use-this
  private _checkConfirmation(e: Event):void{
    // @ts-ignore
    if (e.keyCode === 13) {
      e.preventDefault();
      // @ts-ignore
      e.target.blur();
    }
  }

  private _onDelete(){
    // @ts-ignore
    this.dispatchEvent(new Event('delete-todo', {todo: this.todo}));
  }
}
