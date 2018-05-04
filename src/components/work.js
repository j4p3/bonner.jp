import React from 'react';
import { withRouteData, Link } from 'react-static';

import Nav from './nav';
import '../style/app.css';
import '../style/work.css';

const buttons = (type, list) => {
  return (
  <div className="buttonList">
    {list.map((el,i) => (
      <span className={type + ' button'} key={i}>{el}</span>
    ))}
  </div>
)}

const PortfolioItem = (props) => {
  return (
    <div className='portfolioItem'>
      <div className='row container'>
        <div className='img' style={{
            background: `url(${props.image}) center / cover no-repeat`
          }} />
        <div className='text container'>
          <h2>{props.title}</h2>
          {props.tools ? buttons('tool', props.tools) : null}
          <p>{props.blurb} &nbsp;
          {props.link ? (<Link to={props.link}>(visit)</Link>) : null}</p>
          {props.roles ? buttons('role', props.roles) : null}
        </div>
      </div>
    </div>
  )
}

export default withRouteData(({ config }) => (
  <div>
    <Nav />
    <section className='hmmm margin'>
    <h3>hi there.</h3>
    <p>A few years ago, I set out to learn how people starting companies on the internet make great stuff. My primary research was travelling around the world writing code and creating products for people. It was pretty fun. I learned a lot.</p>
    <p>Now it's starting to feel like I've reached the limit of what I'm going to learn this way. I've been tinkering with a co-op agency model and hacking on my own projects in the meantime, but it's time to try something new.</p>
    <p>I'd like to join a team making rad stuff, and learn from them, and make rad stuff with them. For context, I've listed some of the things I've made below.</p>
    <p>If you're interested in working together, shoot me a message at <b><a href="mailto:jp.bonner@bonner.jp">jp@bonner.jp</a></b>.</p>
    </section>
    <section className='portfolioList margin'>
      {config.works.map((item,i) => (
        <PortfolioItem key={i} {...item} />
      ))}
    </section>
  </div>
));
