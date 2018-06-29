import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import './App.css';

import { NovelApp } from './reducers/reducers';
import { SearchPage } from './pages/search';
import { HomePage } from './pages/home';
import { NovelPage } from './pages/novel';
import { ReadPage } from './pages/read';

const store = createStore(
  NovelApp,
  applyMiddleware(thunk)
);

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
        <Router>
          <div className="app">
            <Route exact path="/" component={HomePage}/>
            <Route path="/search" component={SearchPage}/>
            <Route path="/novel/:id" component={NovelPage}/>
            <Route path="/read/:id" component={ReadPage}/>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
