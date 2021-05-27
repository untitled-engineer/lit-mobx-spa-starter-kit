import type {BehaviorSubject, Observable, Subject, Subscription} from "rxjs";
import type {Route} from "../index.js"
import type {EagRouterChild,} from "../eag-router-child.js";
import {stringToHTML} from "./helper-fuctions.js";

type Constructor<T = any> = new (...args: any[]) => T;

export const RouterMix = <T extends Constructor>(Base: T) =>
  class extends Base {
    subscriptions: Subscription[] = [];

    routes: Route[] = [];

    element: Element = stringToHTML("<eag-router-empty></eag-router-empty>");

    connectedCallback() {
      super.connectedCallback();
    }

    addToSub(sub: Observable<any>) {
      this.subscriptions.push(sub.subscribe());
    }

    // Resolve bundle if bundle exist and also resolve component.
    async resolveBundle(elem: Route, resolved: WeakSet<object>) {
      // Resolve bundle if bundle exist.
      if (elem.bundle!) {
        if (!resolved.has(elem.bundle())) {
          await elem.bundle();
        }
      }
      // Create new element and update element
      const oldElem = this.element;
      this.element = stringToHTML(elem.component!);

      this.requestUpdate("element", oldElem);

      console.log(this.element)
      return this.element;
    }

    // eslint-disable-next-line class-methods-use-this
    observerHandler(
      theElement: Element,
      pageFoundSubject$: BehaviorSubject<boolean>,
      myWindow: Window,
      pendingSubject$: Subject<number>,
      contextQuerystring: string = "",
      queryStringSubject$: BehaviorSubject<string> | null = null,
      parentOrChild: "parent" | "child" = "child"
    ) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const observer = new IntersectionObserver((_) => {
        const childRouter =
          theElement.querySelector<EagRouterChild>("eag-router-child") ||
          theElement?.shadowRoot?.querySelector<EagRouterChild>(
            "eag-router-child"
          );

        if (childRouter === null || childRouter === undefined) {
          pageFoundSubject$.next(true);
        }
        // Decrement pending count
        pendingSubject$.next(-1);
        if (parentOrChild === "parent") {
          queryStringSubject$?.next(contextQuerystring);
        }
        myWindow.scrollTo(0, 0);
        observer.disconnect();
      });
      observer.observe(theElement);
    }

    disconnectedCallback() {
      this.subscriptions.forEach((sub) => sub.unsubscribe());
      super.disconnectedCallback();
    }
  };
