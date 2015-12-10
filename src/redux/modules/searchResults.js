export const LOAD_SUCCESS = 'mozlando-example/search-results/LOAD_SUCCESS';

export default function searchResults(state = [], action) {
  console.log(action);
  switch (action.type) {
    case LOAD_SUCCESS:
      return action.results;
    default:
      return state;
  }
}
