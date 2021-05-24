import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import '@polymer/app-layout/app-drawer-layout/app-drawer-layout.js';
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-header-layout/app-header-layout.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@polymer/app-layout/demo/sample-content.js';

import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/iron-icons/iron-icons.js';

@customElement("x-app")
export class XApp extends LitElement {
  @property({ type: String }) title = 'My app';

  static styles = css`
    :host {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      font-size: calc(10px + 2vmin);
      color: #1a2b42;
      max-width: 960px;
      margin: 0 auto;
      text-align: center;
      background-color: var(--realm-app-background-color);
    }

    main {
      flex-grow: 1;
    }

    .logo > svg {
      margin-top: 36px;
      animation: app-logo-spin infinite 20s linear;
    }

    @keyframes app-logo-spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }

    .app-footer {
      font-size: calc(12px + 0.5vmin);
      align-items: center;
    }

    .app-footer a {
      margin-left: 5px;
    }
  `;

  render() {
    return html`
      <main>
        <h1>Hello world</h1>
        <app-drawer-layout>

          <app-drawer slot="drawer">
            <app-toolbar>Getting Started</app-toolbar>
          </app-drawer>

          <app-header-layout>

            <app-header slot="header" reveals effects="waterfall">
              <app-toolbar>
                <paper-icon-button icon="menu" drawer-toggle></paper-icon-button>
                <div main-title>Title</div>
              </app-toolbar>
            </app-header>

            <sample-content size="100"></sample-content>

          </app-header-layout>
        </app-drawer-layout>
      </main>
    `;
  }
}
