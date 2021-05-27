
//  Child router
import {LitElement} from "lit";
import {tap} from "rxjs/operators";
import {customElement} from "lit/decorators.js";
import {RouterMix} from "./utils/mixins.js";
import {pathToRegexp} from "./utils/path-to-regex.js";
import {guardHandler, pathMatchKey, stringToHTML} from "./utils/helper-fuctions.js";
import {
  latestRouterPath$,
  pendingSubject$,
  pageFoundSubject$,
  queryStringSubject$
} from "./index.js";

const myWindow = window;

// Save lazy loaded modules in weak set
const resolved = new WeakSet();

@customElement("eag-router-child")
export class EagRouterChild extends RouterMix(LitElement) {

  private pathMatch = "eagPathMatch";

  private latestPath$ = latestRouterPath$.pipe(
    tap((route: string) => {
      if (route) {
        // eslint-disable-next-line no-console
        this.renderView(route).then(r => console.log(r));
      }
    })
  );

  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    // eslint-disable-next-line wc/guard-super-call
    super.connectedCallback();
    this.addToSub(this.latestPath$);
  }

  disconnectedCallback() {
    // eslint-disable-next-line wc/guard-super-call
    super.disconnectedCallback();
  }

  async renderView(path: string) {
    if (pathToRegexp(this.pathMatch, [pathMatchKey]).test(path)) {
      queueMicrotask(() => pendingSubject$.next(0));
      // setTimeout(() => pendingSubject$.next(0));
      return;
    }
    try {
      const elem = this.routes.find((route) =>
        pathToRegexp(route.path, [pathMatchKey]).test(path)
      );
      if (!elem) {
        this.pathMatch = "eagPathMatch";
        const oldElemNotFound = this.element;
        this.element = stringToHTML("<eag-router-empty></eag-router-empty>");
        this.requestUpdate("element", oldElemNotFound);
        pageFoundSubject$.next(false);
        queueMicrotask(() => pendingSubject$.next(0));
        // setTimeout(() => pendingSubject$.next(0));
        return;
      }
      this.pathMatch = elem.path;

      const guardExist = elem.guard;

      // Check for guard
      if (guardExist) {
        const guard = await guardHandler(guardExist, "child");
        if (!guard) {
          return;
        }
      }

      // increment pending count
      pendingSubject$.next(1);

      // Resolve bundle if bundle exist and also resolve component.
      const theElement = await this.resolveBundle(elem, resolved);

      // Using intersection observer to check when element is loaded
      this.observerHandler(
        theElement,
        pageFoundSubject$,
        myWindow,
        pendingSubject$,
        "",
        queryStringSubject$
      );
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      pendingSubject$.next(-1);
    }
  }

  render() {
    return this.element;
  }
}
