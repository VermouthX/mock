import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import HomePage from './routes/HomePage';
import Privacy from './routes/Privacy';
import Movie from './routes/Movie';
import Register from './routes/Register';
import IndexPage from './routes/IndexPage';
import Management from './routes/Management';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
      <Route path="/demo" exact component={IndexPage} />
        <Route path="/" exact component={HomePage} />
        <Route path="/privacy" component={Privacy} />
        <Route path="/movie" component={Movie} />
        <Route path="/register" component={Register} />
        <Route path="/manage" component={Management} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
