import './styles.css';
import { events } from './scripts/events';
import { render } from './scripts/render';

events.formEvents();
render.renderNav();
render.renderProject();
events.menuButtonEvent();
