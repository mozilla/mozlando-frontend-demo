import React, { Component } from 'react';
import config from '../../config';


export default class SearchResults extends Component {


  render() {
    const styles = require('./Home.scss');

    return (
      <div className={styles.home}>
        <div className={styles.masthead}>
          <div className="container">
            <h1>Search Results</h1>
          </div>
        </div>
        <div className="container"></div>
      </div>
    );
  }
}
