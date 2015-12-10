import DocumentMeta from 'react-document-meta';
import React, { Component, PropTypes } from 'react';
import connectData from 'helpers/connectData';
import {initializeWithKey} from 'redux-form';
import * as searchResultsActions from 'redux/modules/searchResults';
import {connect} from 'react-redux';
import config from '../../config';

const LOAD_SUCCESS = 'mozlando-example/search-results/LOAD_SUCCESS';
const LOAD_FAIL = 'mozlando-example/search-results/LOAD_FAIL';

const API_HOST = 'http://olympia.dev';

function isLoaded(globalState) {
  return globalState.searchResults && globalState.searchResults.loaded;
}

function loadSearchResults(dispatch, query) {
  fetch(`${API_HOST}/api/v3/addons/search/?q=${query}`)
    .then((response) => response.json())
    .then(
      (data) => dispatch({type: LOAD_SUCCESS, results: data}),
      (error) => dispatch({type: LOAD_FAIL, error: error}));
}

function fetchDataDeferred(getState, dispatch) {
  const state = getState();
  if (!isLoaded(state)) {
    loadSearchResults(dispatch, state.router.location.query.q);
  }
}

@connectData(null, fetchDataDeferred)
@connect(
  state => ({
    searchResults: state.searchResults,
  }),
  {...searchResultsActions, initializeWithKey})
export default class SearchResults extends Component {
  static propTypes = {
    searchResults: PropTypes.array.isRequired,
  };

  render() {
    const styles = require('./SearchResults.scss');
    const {searchResults} = this.props;

    return (
      <div className={styles.searchResults + ' container'}>
        <DocumentMeta title={config.app.title + ': Search Results'}/>
        <div className="container">
          <h1>Search Results</h1>
          <ul>
            {searchResults.map(addon => (
              <li style={{listStyleType: 'none', padding: 0, margin: 0}}>
                <img src={API_HOST + addon.icons['32']} width="32" height="32" />
                {' '}
                <h4 style={{display: 'inline-block'}}>{addon.name}</h4>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
