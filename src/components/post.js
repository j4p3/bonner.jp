import React from 'react';
import { withRouteData, Link } from 'react-static'
import convert from 'htmr'

import Nav from './nav';
import '../style/app.scss';
import '../style/post.scss';


export default withRouteData(({ post }) => (
  <div>
    <Nav />
    <article>
      <h2>{post.title}</h2>
      {convert(post.contents)}
    </article>
  </div>
));
