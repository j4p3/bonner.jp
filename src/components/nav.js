import React from 'react';
import { Link } from 'react-static';

import config from '../../config/site.json'
import '../style/nav.css';


const Nav = () => (
  <nav className="clearfix">
    <Link to="/" className="logo"></Link>
    <div className="links">
      {config.links.map((item,i) => (
        <Link key={i} to={item.href}>{item.text}</Link>
      ))}
    </div>
  </nav>
)

export default Nav;