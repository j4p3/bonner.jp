import React from 'react';
import { withRouteData, Link } from 'react-static';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import Posts from './posts'
import '../style/app.scss';
import '../style/home.scss';

const HeadlineItem = (props) => (
  <li className="heading">
    <Link to={props.href}>
      <span className="icon">
        <FontAwesomeIcon
          icon={props.icon}
          style={{
            width: '1em',
            height: '1em',
          }}/>
      </span>
      <span className="text" data-text={props.text}>{props.text}</span>
    </Link>
  </li>
);


export default withRouteData(({ config, posts }) => (
  <div>
    <section className="atf">
      <div className="grid">
        <img src='./logo.png' />
        <h1>jp bonner</h1>
        <ul className="headlines">
          {config.links.map((item,i) => (
            <HeadlineItem key={i} {...item} />
          ))}
        </ul>
      </div>
    </section>
    <section className="posts">
      <Link to='/work'>
        <div className="blurb">
          <h2>Looking for Roles</h2>
          <p>After a few years traveling around slinging code for clients and hacking on my own projects, I'd really like to link up with a company where people are making cool stuff. Details over at my portfolio.</p>
        </div>
      </Link>
      <Posts posts={posts} />
    </section>
  </div>
))
