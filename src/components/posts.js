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
  <ul className="pages row">
    {[...Array(Math.ceil(props.postCount/props.pageSize)).keys()].map((i) => {
      return (<li
        key={i}
        onClick={(e) => props.navigateTo(i+1)}
        className={`page button pointer ${props.currentPage === i+1 ?
          'fancy' :
          ''}`}>
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
    this.setState({ page: page });
  }

  currentPosts() {
    if (this.props.paginate) {   
      return this.props.posts.slice(
        (this.state.page-1) * (this.PAGESIZE),
        (this.state.page-1) * (this.PAGESIZE) + this.PAGESIZE
      );
    }

    return this.props.posts;
  }

  render() {
    return (
      <div>
        <ul className="postsList">
          {this.currentPosts().map((post,i) => (
            <PostItem key={i} {...post} />
          ))}
        </ul>
        {this.props.paginate ?
          <Pages
            pageSize={this.PAGESIZE}
            postCount={this.props.posts.length}
            currentPage={this.state.page}
            navigateTo={this.setPage}
          /> :
          ''}
      </div>
    );
  }
}


export default Posts;
