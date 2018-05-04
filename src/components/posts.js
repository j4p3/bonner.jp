import React from 'react';
import { Link } from 'react-static';

import '../style/app.css';
import '../style/posts.css';

const PostItem = (props) => {
  return (
    <li>
      <Link to={`/posts/${props.slug}/`}>
        <div className="postItem">
          <h2>{props.title}</h2>
          <div className="row container">
            {props.image ? (
              <div
                className='img'
                style={{ background:
                  `url(${props.image}) center / cover no-repeat`
                }} />) :
            '' }
            <p>{props.blurb}</p>
          </div>
        </div>
      </Link>
    </li>
  )
}

const Posts = (props) =>  (
  <ul className="postsList">
    {props.posts.map((post,i) => (
      <PostItem key={i} {...post} />
    ))}
  </ul>
);

export default Posts;
