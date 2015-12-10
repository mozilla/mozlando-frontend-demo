export const LOAD = 'mozlando-example/addon/LOAD';
export const LOAD_SUCCESS = 'mozlando-example/addon/LOAD_SUCCESS';
export const LOAD_FAIL = 'mozlando-example/addon/LOAD_FAIL';
const API_HOST = 'https://addons-dev.allizom.org';

export function isLoaded(globalState, slug) {
  return globalState.addon && globalState.addon.data &&
    globalState.addon.data.slug === slug &&
    globalState.addon.loaded;
}

export function load(slug) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: () => fetch(`${API_HOST}/api/v3/addons/${slug}/`)
      .then((response) => response.json()),
  };
}

const initialState = {
  loaded: false,
  editing: {},
  saveError: {}
};


export default function addon(state = initialState, action) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true,
      };
    case LOAD_SUCCESS:
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
