import React, { Component } from 'react';
import { SearchForm } from '../../components';
import config from '../../config';


export default class Home extends Component {

  handleSubmit(event) {
    window.alert('Data submitted! ' + JSON.stringify(event));
  }

  render() {
    const styles = require('./Home.scss');

    return (
      <div className={styles.home}>
        <div className={styles.masthead}>
          <div className="container">
            <h1>{config.app.title}</h1>
            <p>{config.app.description}</p>
            <SearchForm onSubmit={this.handleSubmit}/>
          </div>
        </div>
        <div className="container"></div>
      </div>
    );
  }
}
