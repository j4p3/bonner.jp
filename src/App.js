import React from 'react'
import { Router, Link } from 'react-static'
import { hot } from 'react-hot-loader'
import Routes from 'react-static-routes'

import words from '../config/words.json';
import icons from './components/icons';
import './style/app.scss'
import Footer from './components/footer';

const App = () => (
  <Router>
    <div>
      <div>
        <Routes />
      </div>
      <Footer />
    </div>
  </Router>
)

export default hot(module)(App)
