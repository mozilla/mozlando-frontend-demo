import React, {Component, PropTypes} from 'react';
import { pushState } from 'react-router';

export default class Addon extends Component {

  static propTypes = {
    // description: PropTypes.string,
    icons: PropTypes.object,
    installLink: PropTypes.string,
    name: PropTypes.string,
    slug: PropTypes.string,
    summary: PropTypes.string,
  }

  handleGetDetails = (event) => {
    event.preventDefault();
    pushState(null, 'addon',  {slug: this.props.slug});
  }

  createSummary() {
    return {__html: this.props.summary};
  }

  render() {
    const {icons, name, slug} = this.props;
    const styles = require('./AddonResult.scss');

    return (
      <div className={styles.addonresult} onClick={this.handleClick}>
        <h2>{name}</h2>
        <div className={styles.meta}>
          <img className={styles.resultimage} src={icons[64]} />
          <p dangerouslySetInnerHTML={this.createSummary()}></p>
          <form action={installLink} method="get">
            <button className="btn btn-success pull-right" type="submit">Add to Firefox</button>
          </form>
          <form className={'jsonly'} action={'/addon/' + slug + '?src=search'} method="get">
            <button className="btn btn-primary pull-right" type="submit">View Details</button>
          </form>
        </div>
      </div>
    );
  }
}
