import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import CryptoTable from './components/CryptoTable';
import ThemeConfig from './theme/config';

function App() {
  return (
    <ThemeConfig>
      <Router>
        <Switch>
          <Route path="/">
            <CryptoTable />
          </Route>
        </Switch>
      </Router>
    </ThemeConfig>
  );
}

export default App;
