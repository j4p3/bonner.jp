import React from 'react';
import { withRouteData, Link } from 'react-static';

import Nav from './nav';
import '../style/app.scss';
import '../style/work.scss';

const buttons = (type, list) => list.map((el,i) => (
  <span className={type + ' button'} key={i}>{el}</span>
))

const PortfolioItem = (props) => {
  return (
    <div className='portfolioItem'>
      <div className='row'>
        <div className='img' style={{
          background: `url(${props.image}) center / contain no-repeat`
        }} />
        <div className='text container'>
          <h2>{props.title}</h2>
          <div className="buttonList">
            {props.roles ? buttons('role', props.roles) : null}
            {props.tools ? buttons('tool', props.tools) : null}
          </div>
          <p>{props.blurb} &nbsp;
            {props.link ? (<Link className="link button" to={props.link}>(visit)</Link>) : null}</p>
        </div>
      </div>
    </div>
  )
}

export default withRouteData(({ config }) => (
  <div>
    <Nav />
    <section className='ad'>
      <h3>hi there.</h3>
      <p>A few years ago, I set out to learn how people make great products on the internet. My primary research was traveling around the world writing code and creating products for clients. It was pretty fun. I learned a lot.</p>
      <p>Now it's starting to feel like I've reached the limit of what I'm going to learn this way. I've been tinkering with a co-op agency model and hacking on my own projects in the meantime, but it's time to try something new.</p>
      <p>I'd like to join a company making rad stuff, and learn from a team by making rad stuff with them. For context, I've listed some of the things I've made below.</p>
      <p>If you're interested in working together, shoot me a message at <b><a href="mailto:jp.bonner@bonner.jp">jp@bonner.jp</a></b>.</p>
    </section>
    <section className='portfolioList'>
      {config.works.map((item,i) => (
        <PortfolioItem key={i} {...item} />
      ))}
    </section>
  </div>
));
