import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Repository from '../pages/Repository';
import GithubRepositories from '../pages/GithubRepositories'

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />
    <Route path="/repositories/:repository+" component={Repository} />
    <Route path="/github-repositories" component={GithubRepositories} />
  </Switch>
);

export default Routes;