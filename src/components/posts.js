import React, { Component } from 'react';
import { Link } from 'react-static';

import '../style/app.scss';
import '../style/posts.scss';


const PostItem = (props) => {
  return (
    <li>
      <Link to={`/posts/${props.slug}/`}>
        <div className="postItem">
          <h2>{props.title}</h2>
          <div className="postContent">
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
  );
};

const Pages = (props) => (
  <ul className="pages">
    {[...Array(Math.ceil(props.postCount/props.pageSize)).keys()].map((i) => {
      return (<li
        key={i}
        onClick={(e) => props.navigateTo(i+1)}
        className="page button">
        {i+1}
      </li>);
    })}
  </ul>
);

class Posts extends Component {
  constructor(props) {
    super(props);
    this.PAGESIZE = 5;
    this.state = {
      page: 1
    };
    this.setPage = this.setPage.bind(this);
  }

  setPage(page) {
    console.log(page);
    this.setState({ page: page });
  }

  currentPosts() {
    return this.props.posts.slice(
      (this.state.page-1) * (this.PAGESIZE),
      (this.state.page-1) * (this.PAGESIZE) + this.PAGESIZE - 1
    );
  }

  render() {
    return (
      <div>
        <ul className="postsList">
          {this.currentPosts().map((post,i) => (
            <PostItem key={i} {...post} />
          ))}
        </ul>
        <Pages
          pageSize={this.PAGESIZE}
          postCount={this.props.posts.length}
          currentPage={this.state.page}
          navigateTo={this.setPage}
        />
      </div>
    );
  }
}


export default Posts;
