import page from "page";
import { BehaviorSubject, Subject } from "rxjs";
import type { Observable } from "rxjs";
import {
  distinctUntilChanged,
  map,
  shareReplay,
  scan,
  startWith,
  skip,
  filter,
  buffer,
} from "rxjs/operators";

// Interface for navigation state
export type NavState = "navStart" | "navEnd" | "navCold";

export interface Route {
  path: string;
  redirect?: string;
  component?: string;
  bundle?: () => Promise<any>;
  guard?: () => Observable<boolean> | Promise<boolean> | boolean;
}

export {EagRouter} from "./eag-router.js";
export {EagRouterChild} from "./eag-router-child.js";


export const pendingSubject$ = new Subject<number>();

// Stores full query string
export const queryStringSubject$ = new BehaviorSubject("");

// Stores latest router path
export const latestRouterPathSubject$ = new BehaviorSubject<string>("");

// Exposes navigation events
export const navigationEvents$: Observable<string> = pendingSubject$.pipe(
  scan((acc: number, curr: number) => acc + curr, 0),
  map((num) => (num === 0 ? "navEnd" : "navStart")),
  startWith("navCold" as NavState),
  shareReplay(1)
);

export const pageFoundSubject$ = new BehaviorSubject(false);

export const pageFound$ = pageFoundSubject$.pipe(
  buffer(navigationEvents$.pipe(filter((env) => env === "navEnd"))),
  map((item: boolean[]) => item[item.length - 1])
);

// Exposes full query string
export const queryString$ = queryStringSubject$.pipe(
  skip(1),
  distinctUntilChanged(),
  shareReplay(1)
);

// Exposes query string of particular element
export const param$ = (id: string) =>
  queryString$.pipe(map((query: string) => new URLSearchParams(query).get(id)));

// exposes page router for navigating programmatically

// This will be deprecated soon
export const outlet = (location: string) => page.show(location);

export const push = (location: string) => page.show(location);

export const replace = (
  path: string,
  state?: any,
  init?: boolean | undefined,
  dispatch?: boolean | undefined
) => page.replace(path, state, init, dispatch);

export const routerHistory = {
  push,
  replace,
};

Object.freeze(routerHistory);

// Exposes later router path

export const latestRouterPath$ = latestRouterPathSubject$.pipe(
  distinctUntilChanged(),
  shareReplay(1)
);
