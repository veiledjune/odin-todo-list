import './styles.css';

import { Render } from './scripts/render';
import { FormEvents } from './scripts/form';
Render.renderNav();
Render.renderProject();
FormEvents.formEvents(
  '.project-dialog',
  '.project-form',
  '.project-add-btn',
  '.project-form-close-btn',
  '.project-form-add-btn'
);
FormEvents.formEvents(
  '.todo-dialog',
  '.todo-form',
  '.todo-add-btn',
  '.todo-form-close-btn',
  '.todo-form-add-btn'
);
FormEvents.formEvents(
  '.edit-dialog',
  '.edit-form',
  '.todo-edit-btn',
  '.edit-form-close-btn',
  '.edit-form-add-btn'
);
