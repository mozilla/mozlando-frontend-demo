import DocumentMeta from 'react-document-meta';
import React, { Component, PropTypes } from 'react';

import { AddonResult } from '../../components';
import {initializeWithKey} from 'redux-form';

import connectData from 'helpers/connectData';
import * as searchResultsActions from 'redux/modules/searchResults';
import {connect} from 'react-redux';
import config from '../../config';
import 'isomorphic-fetch';
import {isLoaded, load as loadSearchResults} from 'redux/modules/searchResults';

function fetchDataDeferred(getState, dispatch) {
  const state = getState();
  const query = state.router.location.query.q;
  if (!isLoaded(state, query)) {
    return dispatch(loadSearchResults(query));
  }
}

@connectData(null, fetchDataDeferred)
@connect(
  state => ({
    searchResults: state.searchResults.data.result,
    query: state.searchResults.data.query,
    editing: state.searchResults.editing,
    error: state.searchResults.error,
    loading: state.searchResults.loading,
  }),
  {...searchResultsActions, initializeWithKey})
export default class SearchResults extends Component {
  static propTypes = {
    searchResults: PropTypes.array,
  };

  render() {
    const styles = require('./SearchResults.scss');
    const {searchResults} = this.props;

    return (
      <div className={styles.searchresults + ' container'}>
        <DocumentMeta title={config.app.title + ': Search Results'}/>
        <div className="container">
          <h1>Search Results</h1>
          <ul className={styles.searchlist}>
            {searchResults.map(addon => (
              <li><AddonResult {...addon}/></li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
