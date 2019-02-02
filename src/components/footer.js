import React from 'react';

import words from '../../config/words.json';
import '../style/app.scss';


const Nav = () => (
  <footer>
    <div><a href='mailto:jp.bonner@bonner.jp'>jp.bonner@bonner.jp</a></div>
    <div className="for_overly_curious_people">
      {words[Math.floor(Math.random()*(words.length))]}
    </div>
  </footer>
);

export default Nav;