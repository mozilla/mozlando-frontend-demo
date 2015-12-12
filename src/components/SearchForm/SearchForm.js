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
    query: PropTypes.string,
  }

  render() {
    const {fields: {q}, handleSubmit, query} = this.props;
    const styles = require('./SearchForm.scss');

    return (
      <form className={styles.searchform + ' form-inline'} action="/search" method="GET" onSubmit={handleSubmit}>
        <div className={styles.formwrapper + ' form-group'}>
          <label htmlFor="search" className="sr-only">Search</label>
          <input value={query} className={styles.searchinput + ' form-control'} id="search" type="search" placeholder="e.g: privacy" {...q}/><button className={styles.searchbutton + ' btn btn-primary'} type="submit">Submit</button>
        </div>
      </form>
    );
  }
}
