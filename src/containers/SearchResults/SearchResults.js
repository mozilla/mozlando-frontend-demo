import DocumentMeta from 'react-document-meta';
import React, { Component } from 'react';
import config from '../../config';

export default class SearchResults extends Component {

  render() {
    const styles = require('./SearchResults.scss');

    return (
      <div className={styles.searchResults + ' container'}>
        <DocumentMeta title={config.app.title + ': Search Results'}/>
        <div className="container">
          <h1>Search Results</h1>
        </div>
      </div>
    );
  }
}
