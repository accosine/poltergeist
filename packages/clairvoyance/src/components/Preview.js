import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FixedButton from './FixedButton';
import Dialog from '@material-ui/core/Dialog';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import Theme from '../theme';
import config from '../config.js';
import plugins from '../plugins';

import DevicePreview from './DevicePreview';
import Iframe from './Iframe';

const theme = Theme(config.application, plugins);

const styleSheet = {
  container: {
    width: '100%',
    height: '100%',
  },
  iframe: {
    width: '100%',
    height: '100%',
    border: 0,
    background: 'white',
  },
  devicePreview: {
    zIndex: 1299,
  },
};

class Preview extends PureComponent {
  state = {
    fullscreen: false,
    preview: '',
  };

  renderTimeout = null;

  componentDidMount() {
    this.updatePreview();
  }

  componentDidUpdate() {
    this.updatePreview();
  }

  updatePreview = () => {
    if (this.renderTimeout) {
      clearTimeout(this.renderTimeout);
    }

    this.renderTimeout = setTimeout(() => {
      const { text, kind, classes, ...frontmatter } = this.props;
      try {
        const preview =
          text && frontmatter
            ? theme[kind]({ ...frontmatter, content: text })
            : '';
        this.setState({ preview });
      } catch (error) {
        this.setState({ preview: false });
      }
    }, this.props.renderDelay);
  };

  toggleFullscreen = () =>
    this.setState({ fullscreen: !this.state.fullscreen });

  render() {
    const { classes } = this.props;
    const { fullscreen, preview } = this.state;
    return (
      <Fragment>
        <div className={classes.container}>
          {fullscreen ? (
            <FixedButton position="left" onClick={this.toggleFullscreen}>
              <FullscreenExitIcon />
            </FixedButton>
          ) : (
            <Fragment>
              <Iframe html={preview} />
              <FixedButton position="left" onClick={this.toggleFullscreen}>
                <FullscreenIcon />
              </FixedButton>
            </Fragment>
          )}
        </div>
        {fullscreen ? (
          <Dialog
            className={classes.devicePreview}
            fullScreen
            open
            onClose={this.toggleFullscreen}
          >
            <DevicePreview onClose={this.toggleFullscreen}>
              <Iframe html={preview} />
            </DevicePreview>
          </Dialog>
        ) : null}
      </Fragment>
    );
  }
}

Preview.defaultProps = {
  renderDelay: 750,
};

Preview.propTypes = {
  text: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  collection: PropTypes.string.isRequired,
  headline: PropTypes.string.isRequired,
  subline: PropTypes.string.isRequired,
  layout: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  attribution: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  renderDelay: PropTypes.number.isRequired,
};

export default withStyles(styleSheet)(Preview);
