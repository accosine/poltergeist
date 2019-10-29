import React, { useEffect, useRef } from 'react';

const styles = {
  iframe: 'width: 100%; height: 100%; border: 0;',
  hidden: 'display: none;',
};

const Iframe = ({ html = '', ...props }) => {
  const containerEl = useRef(null);
  const latestScrollTop = useRef(0);

  useEffect(() => {
    const iframe = document.createElement('iframe');
    iframe.setAttribute(
      'style',
      styles.iframe + ' ' + styles.hidden
    );

    containerEl.current.appendChild(iframe);

    // remove old child(ren), make newest child visible and restore scroll position
    const onLoad = () => {
      while (containerEl.current.children.length > 1) {
        containerEl.current.removeChild(
          containerEl.current.firstChild
        );
      }
      iframe.setAttribute('style', styles.iframe);
      iframe.contentWindow.scrollTo(
        0,
        latestScrollTop.current
      );
    };
    const onScroll = event => {
      latestScrollTop.current =
        event.target.scrollingElement.scrollTop;
    };

    iframe.contentDocument.open();

    iframe.contentWindow.addEventListener('load', onLoad);
    iframe.contentDocument.addEventListener(
      'scroll',
      onScroll
    );

    iframe.contentDocument.write(html);
    iframe.contentDocument.close();

    return () => {
      // cleanup event listeners of old iframes
      iframe.contentWindow.removeEventListener(
        'load',
        onLoad
      );
      iframe.contentWindow.removeEventListener(
        'scroll',
        onScroll
      );
    };
  }, [html, latestScrollTop]);

  return (
    <div
      style={{ height: '100%' }}
      {...props}
      ref={containerEl}
    />
  );
};

export default Iframe;
