import React from 'react';
import { withRouteData, Link } from 'react-static'
import convert from 'htmr'

import Nav from './nav';
import '../style/app.css';
import '../style/post.css';


export default withRouteData(({ post }) => (
  <div>
    <Nav />
    <article className="margin">
      <h2>{post.title}</h2>
      {convert(post.contents)}
    </article>
  </div>
))