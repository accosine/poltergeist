import React, { useCallback, useState, useEffect, useRef } from 'react';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

const styleSheet = {
  container: {
    height: '100%',
  },
  iframe: {
    width: '100%',
    height: '100%',
    border: 0,
  },
  hidden: {
    display: 'none',
  },
};

const Iframe = ({ html, classes }) => {
  const containerEl = useRef(null);
  const createIframe = useCallback(
    () => {
      const iframe = document.createElement('iframe');
      iframe.setAttribute('class', classnames(classes.iframe, classes.hidden));
      iframe.setAttribute('title', 'preview');
      return iframe;
    },
    [classes.hidden, classes.iframe]
  );
  const [scrollTop, setScrollTop] = useState(0);
  useEffect(
    () => {
      const iframe = createIframe();
      containerEl.current.appendChild(iframe);
      const iframeDocument = iframe.contentDocument;

      iframeDocument.open();

      iframe.contentWindow.onload = () => {
        if (containerEl.current.children.length > 1) {
          containerEl.current.removeChild(containerEl.current.firstChild);
        }
        iframe.className = classes.iframe;
        iframe.contentWindow.scrollTo(0, scrollTop);
      };
      iframeDocument.addEventListener('scroll', event =>
        setScrollTop(event.target.scrollingElement.scrollTop)
      );

      iframeDocument.write(html);
      iframeDocument.close();
    },
    [html, classes.iframe, createIframe]
  );

  return <div className={classes.container} ref={containerEl} />;
};

export default withStyles(styleSheet)(Iframe);
