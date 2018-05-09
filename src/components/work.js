import React from 'react';
import { withRouteData, Link } from 'react-static';
import convert from 'htmr';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import Nav from './nav';
import '../style/app.scss';
import '../style/work.scss';

const buttons = (type, list) => list.map((el,i) => (
  <span className={type + ' tag'} key={i}>{el}</span>
))

const PortfolioItem = (props) => (
  <div className='portfolioItem'>
    <div className='row'>
      <div className='img' style={{
        background: `url(${props.image}) center / contain no-repeat`
      }} />
      <div className='text container'>
        <h2>{props.title}</h2>
        <p>{props.blurb}</p>
        <div className="plain row buttonList">
          {props.link ? (<Link className="plain intext button" to={props.link}>visit <FontAwesomeIcon icon="external-link-alt" /></Link>) : null}
          <div className="tagList">
            {props.roles ? buttons('fancy', props.roles) : null}
            {props.tools ? buttons('plain', props.tools) : null}
          </div>
        </div>
      </div>
    </div>
  </div>
);


export default withRouteData(({ config, jobAd }) => (
  <div>
    <Nav />
    <section className='ad'>
      {convert(jobAd.contents)}
      <a className="resume" href="/BONNER_RESUME.pdf"><img src="/resume_small.png" alt="resume" /></a>
      <p className="center"></p>
      <a className="fancy button" href="mailto:mail@bonner.jp">Contact me <FontAwesomeIcon icon="external-link-alt" /></a>
    </section>
    <section className='portfolioList'>
      <div class="container">
        <h1>Things I've made</h1>
      </div>
      {config.works.map((item,i) => (
        <PortfolioItem key={i} {...item} />
      ))}
    </section>
    <section className="cta">
      <a className="fancy button" href="mailto:mail@bonner.jp">Contact me <FontAwesomeIcon icon="external-link-alt" /></a>
    </section>
  </div>
));
