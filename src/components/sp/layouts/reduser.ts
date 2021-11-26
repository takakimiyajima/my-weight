export type State = {
  visibleBackground: boolean;
  visibleSearchBar: boolean;
  visibleDrawerMenu: boolean;
};

export const initialState: State = {
  visibleBackground: false,
  visibleSearchBar: false,
  visibleDrawerMenu: false,
};

export type Action =
  | { type: "open_search_bar" }
  | { type: "open_drawer_menu" }
  | { type: "close_all" };

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "open_search_bar":
      return {
        visibleDrawerMenu: false,
        visibleSearchBar: true,
        visibleBackground: true,
      };
    case "open_drawer_menu":
      return {
        visibleSearchBar: false,
        visibleDrawerMenu: true,
        visibleBackground: true,
      };
    case "close_all":
      return {
        ...initialState,
      };
    default:
      return {
        ...state,
      };
  }
}
