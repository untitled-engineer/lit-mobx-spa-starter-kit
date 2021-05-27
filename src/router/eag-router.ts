// Create lit element component
import {LitElement} from "lit";
import {tap, throttleTime} from "rxjs/operators";
import page from "page";
import {customElement} from "lit/decorators.js";
import {RouterMix} from "./utils/mixins.js";
import {Context} from "./utils/interfaces.js";
import {guardHandler} from "./utils/helper-fuctions.js";
import {
  pageFound$,
  latestRouterPathSubject$,
  queryStringSubject$,
  pendingSubject$,
  pageFoundSubject$
} from "./index.js"

let oldPath: string = "--";
const myWindow = window;

// Save lazy loaded modules in weak set
const resolved = new WeakSet();

@customElement('eag-router')
export class EagRouter extends RouterMix(LitElement) {

  base: string = "";

  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    // eslint-disable-next-line wc/guard-super-call
    super.connectedCallback();
    // Install routes
    this.installRoute();
    const newCustomEvent = new CustomEvent("eag-child-page-not-found", {
      bubbles: true,
      composed: true,
    });

    // navigationEvents$.subscribe((item) => {
    //   console.log(item);
    // });
    this.addToSub(
      pageFound$.pipe(
        throttleTime(500),
        tap((found) => {
          if (found === false) {
            this.dispatchEvent(newCustomEvent);
          }
        })
      )
    );
  }

  installRoute() {
    console.log(this.routes)
    this.routes.forEach((route) => {
      if (route.redirect) {
        page.redirect(route.path, route.redirect);
        return;
      }
      console.log(route)
      page(route.path, (context) => {
        // eslint-disable-next-line no-console
        this.changeRoute(context).then(r => console.log('change router done', r));
        // eslint-disable-next-line no-console
        console.log('pagejs callback', context)
      });
    });

    page.base(this.base);

    page();
  }

  // This function changes routes
  async changeRoute(context: Context) {
    try {
      const elem = this.routes.find(
        (route) => route.path === context.routePath!
      );

      // Check if there is a guard
      const guardExist = elem?.guard;

      if (guardExist) {
        const guard = await guardHandler(guardExist, "parent");
        if (!guard) {
          console.log('return from guard')
          return;
        }
      }

      if (!elem) {
        console.log('no elm')
        return;
      }

      // pageFoundSubject$.next(true);

      latestRouterPathSubject$.next(context.pathname!);
      if (oldPath.startsWith(elem.path)) {
        queryStringSubject$.next(context.querystring!);
        return;
      }

      pendingSubject$.next(1);
      // Resolve bundle if bundle exist and also resolve component.
      const theElement = await this.resolveBundle(elem, resolved);
      console.log(theElement)
      this.observerHandler(
        theElement,
        pageFoundSubject$,
        myWindow,
        pendingSubject$,
        context.querystring!,
        queryStringSubject$,
        "parent"
      );
      oldPath = elem.path;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      pendingSubject$.next(-1);
    }
  }

  disconnectedCallback() {
    // eslint-disable-next-line wc/guard-super-call
    super.disconnectedCallback();
  }

  render() {
    return this.element;
  }
}
