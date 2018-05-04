import React from 'react';
import { withRouteData, Link } from 'react-static';

import Posts from './posts'
import Nav from './nav';
import '../style/app.scss';
import '../style/blag.scss';


export default withRouteData(({ config, posts }) => (
  <div>
    <Nav />
    <section className="posts margin">
      <Posts posts={posts} />
    </section>
  </div>
))
