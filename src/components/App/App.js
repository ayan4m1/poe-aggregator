import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux';
import Header from 'components/Header/Header';

export class App extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <main>
          <h1>Hello World</h1>
        </main>
      </Fragment>
    );
  }
}

export default connect(null, null)(App);
