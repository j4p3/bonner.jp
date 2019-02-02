import React from 'react';
import { withRouteData, Link } from 'react-static';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import Posts from './posts';
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
      <Posts posts={posts} />
    </section>
  </div>
))
