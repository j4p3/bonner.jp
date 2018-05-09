import React from 'react';
import { Link } from 'react-static';

import words from '../../config/words.json'
import '../style/app.scss';


const Nav = () => (
  <footer>
    <div><a href='mailto:mail@bonner.jp'>mail@bonner.jp</a></div>
    <div className="for_overly_curious_people">
      {words[Math.floor(Math.random()*(words.length))]}
    </div>
  </footer>
)

export default Nav;