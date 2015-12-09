import React, { Component } from 'react';
import config from '../../config';


export default class Home extends Component {


  render() {
    const styles = require('./Home.scss');

    return (
      <div className={styles.home}>
        <div className={styles.masthead}>
          <div className="container">
            <h1>{config.app.title}</h1>
            <p>{config.app.description}</p>
          </div>
        </div>
        <div className="container"></div>
      </div>
    );
  }
}
