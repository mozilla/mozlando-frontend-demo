import DocumentMeta from 'react-document-meta';
import React, { Component, PropTypes } from 'react';

import { AddonResult } from '../../components';
import {initializeWithKey} from 'redux-form';

import connectData from 'helpers/connectData';
import * as searchResultsActions from 'redux/modules/searchResults';

import {connect} from 'react-redux';
import config from '../../config';

import 'isomorphic-fetch';


const LOAD_SUCCESS = 'mozlando-example/search-results/LOAD_SUCCESS';
const LOAD_FAIL = 'mozlando-example/search-results/LOAD_FAIL';

const API_HOST = 'https://addons-dev.allizom.org';

function isLoaded(globalState) {
  return globalState.searchResults && globalState.searchResults.loaded;
}

function loadSearchResults(dispatch, query) {
  fetch(`${API_HOST}/api/v3/addons/search/?q=${query}`)
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((data) => dispatch({type: LOAD_SUCCESS, results: data}))
    .catch((error) => dispatch({type: LOAD_FAIL, error: error}));
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
      <div className={styles.searchresults + ' container'}>
        <DocumentMeta title={config.app.title + ': Search Results'}/>
        <div className="container">
          <h1>{name}</h1>
          <p>{description}</p>
          <a className="btn btn-primary" href={xpi}>Install</a>
        </div>
      </div>
    );
  }
}
