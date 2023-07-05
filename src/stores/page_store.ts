import { createContext } from "preact";
import * as types from "../types";

export enum ActionTypes {
  ADD_PAGE = "ADD_PAGE",
  UPDATE_PAGE = "UPDATE_PAGE",
  DELETE_PAGE = "DELETE_PAGE",
}

export type Action =
  | { type: ActionTypes.ADD_PAGE, payload: types.Page }
  | { type: ActionTypes.UPDATE_PAGE, payload: { id: string, title: string } }
  | { type: ActionTypes.DELETE_PAGE, payload: { id: string } }
  ;

export const Reducer = (state: State, action: Action): State => {
  switch(action.type) {
    case ActionTypes.ADD_PAGE:
      return { ...state, pages: [...state.pages, action.payload] };

    case ActionTypes.UPDATE_PAGE:
      const updatePage = (page: types.Page) => {
        if (page.id === action.payload.id) {
          page.title = action.payload.title;
          return page
        } else {
          return page;
        }
      };

      return { ...state, pages: state.pages.map(updatePage) };

    case ActionTypes.DELETE_PAGE:
      const pages = state.pages.filter((page) => page.id !== action.payload.id);

      return { ...state, pages: pages };

    default:
      return state;
  }
}

export interface State {
  pages: types.Page[];
}

export const EmptyState: State = {
  pages: [],
}

export const Context = createContext<{state: State, dispatch: (a: Action) => void }>({ state: EmptyState, dispatch: () => undefined });
