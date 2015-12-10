export const LOAD = 'mozlando-example/search-results/LOAD';
export const LOAD_SUCCESS = 'mozlando-example/search-results/LOAD_SUCCESS';
export const LOAD_FAIL = 'mozlando-example/search-results/LOAD_FAIL';
const API_HOST = 'https://addons-dev.allizom.org';

export function isLoaded(globalState) {
  return globalState.searchResults && globalState.searchResults.loaded;
}

export function load(query) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: () => fetch(`${API_HOST}/api/v3/addons/search/?q=${query}`)
      .then((response) => response.json()),
  };
}

const initialState = {
  loaded: false,
  editing: {},
  data: [],
  saveError: {}
};


export default function searchResults(state = initialState, action) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true,
      };
    case LOAD_SUCCESS:
      console.log(action);
      return {
        ...state,
        loaded: true,
        loading: false,
        data: action.result,

        error: null,
      };
    case LOAD_FAIL:
      return {
        ...state,
        loaded: false,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
}
