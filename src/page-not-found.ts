import {html, LitElement} from "lit";
import {customElement} from "lit/decorators.js";

@customElement('page-not-found')
export class PageNotFound extends LitElement{
  protected render(): unknown {
    return html`
      <h1>Page not found</h1>
      <h6>Try to use search on <a href="/">home page</a></h6>`
  }

}
