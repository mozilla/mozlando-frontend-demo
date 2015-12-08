import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';

@reduxForm({
  form: 'search',
  fields: ['q'],
})
export default class SearchForm extends Component {

  static propTypes = {
    q: PropTypes.string,
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
  }

  render() {
    const {fields: {q}, handleSubmit} = this.props;
    const styles = require('./SearchForm.scss');

    return (
      <form className={styles.searchform + ' form-inline'} action="/search" method="GET" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="search" className="sr-only">Search</label>
          <input className="form-control" id="search" type="search" placeholder="e.g: privacy" {...q} />
          <button className="btn btn-primary" type="submit">Submit</button>
        </div>
      </form>
    );
  }
}
