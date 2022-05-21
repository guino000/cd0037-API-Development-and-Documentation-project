import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './stylesheets/App.css';
import FormView from './components/FormView';
import QuestionView from './components/QuestionView';
import Header from './components/Header';
import QuizView from './components/QuizView';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Header path />
        <BrowserRouter>
          <Switch>
            <Route path='/' exact component={QuestionView} />
            <Route path='/add' component={FormView} />
            <Route path='/play' component={QuizView} />
            <Route component={QuestionView} />
          </Switch>
        </BrowserRouter>
  </div>
    );
  }
}

export default App;
