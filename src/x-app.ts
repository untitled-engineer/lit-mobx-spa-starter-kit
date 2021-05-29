import {MobxLitElement} from "@adobe/lit-mobx/src/lit-mobx";
import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import {autorun} from "mobx";

import '@polymer/app-layout/app-drawer-layout/app-drawer-layout.js';
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-header-layout/app-header-layout.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@polymer/app-layout/demo/sample-content.js';

import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/iron-icons/iron-icons.js';

import "./home-page-element.js";

import "./router/index.js";
import type { Route } from "./router/index.js";


autorun(() => {
  console.log(this)
})


@customElement("x-app")
export class XApp extends MobxLitElement {
  @property({ type: String }) title = 'My app';

  routes: Route[]  = [
    { // For pages without lazy loading, use like this
      path: "/",
      // redirect: "/home",
      component: "<home-page-element></home-page-element>",
    },

    { // For pages with lazy loading, use like this
      component: "<todo-page-element></todo-page-element>",
      path: "/todo",
      bundle: () => import("./todo/todo-page.js"),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      guard: () => new Promise((resolve, _) => {
        // eslint-disable-next-line no-console
          console.log(this,false);
          // @TODO: Application permission
          resolve(true);
        })
    },

    /*

    {
      component: "<todo-page></todo-page>",
      // Matches all products path because of * symbol
      path: "/todo/*",// Use * to match multiple paths
      bundle: () => import("./pages/products"),
    },

     */

    {
      path: "*", // use * for pages with routes that don't match.
      component: "<page-not-found></page-not-found>",
      bundle: () => import("./page-not-found.js"),
    },
  ];

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
            <a href="/todo"><button>todo</button></a>
          </app-drawer>

          <app-header-layout>

            <app-header slot="header" reveals effects="waterfall">
              <app-toolbar>
                <paper-icon-button icon="menu" drawer-toggle></paper-icon-button>
                <div main-title>Title</div>
              </app-toolbar>
            </app-header>

            <eag-router .routes=${this.routes}></eag-router>

            <!--<sample-content size="100"></sample-content>-->

          </app-header-layout>
        </app-drawer-layout>
      </main>
    `;
  }
}

// todo https://www.webcomponents.org/element/@polymer/app-storage
