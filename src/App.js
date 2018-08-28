import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';

import './App.css';

import { NovelApp } from './reducers/reducers';
import { SearchPage } from './pages/search';
import { HomePage } from './pages/home';
import { NovelPage } from './pages/novel';
import { ReadPage } from './pages/read';

const persistConfig = {
  key: 'root',
  whitelist: ['novel'],
  storage
};

const persistedReducer = persistReducer(persistConfig, NovelApp);

const store = createStore(
  persistedReducer,
  applyMiddleware(thunk)
);

const persistor = persistStore(store);

const calHTMLFontSize = () => {
  const html = document.querySelector('html');
  html.style.fontSize = (document.documentElement.clientWidth / 10.8) + 'px';
};

class App extends Component {

  componentWillMount() {
    calHTMLFontSize();

    window.onresize = calHTMLFontSize;
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <div className="app">
              <Route exact path="/" component={HomePage}/>
              <Route path="/search" component={SearchPage}/>
              <Route path="/novel/:id" component={NovelPage}/>
              <Route path="/read/:id" component={ReadPage}/>
            </div>
          </Router>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
