import dialog from './dialog';
import transform from './transform';

export const shortcode = {
  name: 'amp-gist',
  label: 'gist',
  title: 'Insert Github Gist shortcode',
  dialog,
  theme: {
    transform,
    ampScript: 'gist',
  },
};
