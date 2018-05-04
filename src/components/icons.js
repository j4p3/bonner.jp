import ReactDOM from 'react-dom';;
import fontawesome from '@fortawesome/fontawesome';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import twitter from '@fortawesome/fontawesome-free-brands/faTwitter';
import github from '@fortawesome/fontawesome-free-brands/faGithub';
import rss from '@fortawesome/fontawesome-free-solid/faRss';
import key from '@fortawesome/fontawesome-free-solid/faKey';
import pencil from '@fortawesome/fontawesome-free-solid/faPencilAlt';
import fire from '@fortawesome/fontawesome-free-solid/faFire';

fontawesome.library.add(twitter, github, rss, key, pencil, fire);

export default fontawesome;
