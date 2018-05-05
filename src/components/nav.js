import React from 'react';
import { Link } from 'react-static';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import config from '../../config/site.json';
import '../style/nav.scss';


class Nav extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      show: false
    };

    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu() {
    this.setState(state => ({
      show: !state.show
    }));
  }

  render() {
    return (
      <nav className="clearfix">
        <Link to="/" className="logo"></Link>
        <div className="links">
          {config.links.map((item,i) => (
            <Link key={i} to={item.href}>{item.text}</Link>
          ))}
        </div>
        <div className={`dropdown ${this.state.show ? 'show' : ''}`}>
          <div className="toggle" onClick={this.toggleMenu}>
            <FontAwesomeIcon icon='bars'/>
          </div>
          <ul className="menu">
            {config.links.map((item,i) => (
              <li key={i}><Link to={item.href}>{item.text}</Link></li>
            ))}
          </ul>
          <div className="backdrop" onClick={this.toggleMenu}></div>
        </div>
      </nav>
    );
  }
} 

export default Nav;