import React, { Component, PropTypes } from 'react';
import {initializeWithKey} from 'redux-form';
import connectData from 'helpers/connectData';
import * as addonActions from 'redux/modules/addon';
import {isLoaded, load as loadAddon} from 'redux/modules/addon';
import {connect} from 'react-redux';
import 'isomorphic-fetch';

function fetchDataDeferred(getState, dispatch) {
  const state = getState();
  const slug = state.router.params.slug;
  if (!isLoaded(state, slug)) {
    return dispatch(loadAddon(slug));
  }
}


@connectData(null, fetchDataDeferred)
@connect(
  state => ({
    addon: state.addon.data,
    slug: state.router.params.slug,
  }),
  {...addonActions, initializeWithKey})
export default class AddonDetail extends Component {
  static propTypes = {
    slug: PropTypes.string.isRequired,
    addon: PropTypes.object,
  };

  render() {
    const styles = require('./AddonDetail.scss');
    const {addon, slug} = this.props;
    return (
      <div className={styles.addondetail + ' container'}>
        <h1>{addon && addon.name || slug}</h1>
        <img width="64" height="64" src={addon.icons['64']} />
        <p>{addon && addon.description}</p>
        <a className="btn btn-success pull-right" href={addon && addon.download_url}>Install</a>
      </div>
    );
  }
}
