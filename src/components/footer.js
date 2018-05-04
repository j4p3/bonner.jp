import React from 'react';
import { Link } from 'react-static';

import words from '../../config/words.json'
import '../style/app.css';


const Nav = () => (
  <footer className="container">
    <span>bonner.jp</span>
    <span className="for_overly_curious_people">
      {words[Math.floor(Math.random()*(words.length))]}
    </span>
  </footer>
)

export default Nav;