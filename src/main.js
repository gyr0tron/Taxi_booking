import React, { Component } from 'react';

import createStore from "./store/createStore";
import AppContainer from "./AppContainer";

export default class Main extends Component {
  renderApp() {
    const initialState = window.___INTITIAL_STATE__;
    const store = createStore(initialState);

    return (
      <AppContainer store = {store} />
    );
  }

  render() {
    return this.renderApp();
  }
}