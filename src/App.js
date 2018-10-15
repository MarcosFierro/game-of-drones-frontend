import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import MainSection from './containers/MainSection/MainSection';
import History from './containers/History/History';


class App extends Component {

  render() {
    return (
      <div >
        <Layout>
          <Switch>
            <Route path="/history" component={History} />
            <Route path="/" component={MainSection} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
