import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';


@connect(null, {pushState})
export default class Addon extends Component {

  static propTypes = {
    // description: PropTypes.string,
    download_url: PropTypes.string, /*eslint-disable */
    icons: PropTypes.object,
    name: PropTypes.string,
    slug: PropTypes.string,
    summary: PropTypes.string,
    pushState: PropTypes.func.isRequired,
  }

  handleGetDetails = (event) => {
    event.preventDefault();
    this.props.pushState(null, `addon/${this.props.slug}`);
  }

  createSummary() {
    return {__html: this.props.summary};
  }

  render() {
    const {download_url, icons, name, slug} = this.props;
    const styles = require('./AddonResult.scss');

    return (
      <div className={styles.addonresult + ' clickable'} onClick={this.handleGetDetails}>
        <h2>{name}</h2>
        <div className={styles.meta}>
          <img className={styles.resultimage} src={icons[64]} />
          <p dangerouslySetInnerHTML={this.createSummary()}></p>
          <a href={download_url} className="btn btn-success pull-right">Add to Firefox</a>
          <a href={'/addon/' + slug} className="jsonlyib btn btn-primary pull-right">View Details</a>
        </div>
      </div>
    );
  }
}
