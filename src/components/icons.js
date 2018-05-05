import ReactDOM from 'react-dom';
import fontawesome from '@fortawesome/fontawesome';
import twitter from '@fortawesome/fontawesome-free-brands/faTwitter';
import github from '@fortawesome/fontawesome-free-brands/faGithub';
import key from '@fortawesome/fontawesome-free-solid/faKey';
import pencil from '@fortawesome/fontawesome-free-solid/faPencilAlt';
import fire from '@fortawesome/fontawesome-free-solid/faFire';
import bars from '@fortawesome/fontawesome-free-solid/faBars';

fontawesome.library.add(twitter, github, key, pencil, fire, bars);

export default fontawesome;
