import React from 'react';

import { Page1 } from './page/Page1';
import { Page2 } from './page/Page2';
import { Redirect, Route, Switch } from './router';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/page1/:value">
          <Page1 />
        </Route>
        <Route path="/page2/:value">
          <Page2 />
        </Route>
        <Redirect to="/page1/1" />
      </Switch>
    </div>
  );
}
export default App;
