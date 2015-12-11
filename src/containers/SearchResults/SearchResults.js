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
    loading: PropTypes.bool,
  };


  renderResults() {
    let result;
    const nyan = require('../nyan.gif');
    const styles = require('./SearchResults.scss');
    const {loading, searchResults} = this.props;

    const nyanImg = <img className={styles.nyan} src={nyan} />;

    if (loading) {
      result = nyanImg;
    } else {
      if (Object.keys(searchResults).length) {
        result = (<div className={styles.searchresults + ' container'}>
          <DocumentMeta title={config.app.title + ': Search Results'}/>
          <div className="container">
            <h1 className={styles.title}>Search Results</h1>
            <ul className={styles.searchlist}>
              {searchResults.map(addon => (
                <li key={addon.slug}><AddonResult {...addon}/></li>
              ))}
            </ul>
          </div>
        </div>);
      } else {
        result = (
          <div className={styles.noresults}>
            {nyanImg}
            <p>No results, Soz!</p>
          </div>);
      }
    }
    return result;
  }

  render() {
    return (
      <div>{this.renderResults()}</div>
    );
  }
}
