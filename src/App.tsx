import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store';

import Loading from './components/Loading'
const MainPage = React.lazy(() => import('./pages/MainPage'));

const App: React.FC = () => {
  return (
    <Router>
      <Provider store={store}>
        <React.Suspense fallback={<Loading/>}>
          <Route path="/" exact component={MainPage} />
          <Redirect from='*' to='/'/>
        </React.Suspense>
      </Provider>
    </Router>
  );
}

export default App;
