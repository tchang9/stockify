import React from 'react';
import './App.css';
import Login from './components/Login'
import Register from './components/Register'
import Welcome from './components/Welcome'
import Transactions from './components/Transactions'
import Portfolio from './components/Portfolio'
import { Route } from 'react-router-dom'

class App extends React.Component {

  render() {
    return (
      <>
        <Route path='/login' component = {Login} />
        <Route path='/register' component = {Register} />
        <Route path='/portfolio' component = {Portfolio} />
        <Route path='/transactions' component = {Transactions} />

        <Route exact path='/' component = {Welcome} />
      </>
    )
  }
}

export default App;
