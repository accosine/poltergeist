import Shortcode from './shortcode-parser';
import { oneLine } from 'common-tags';
import addSizeSuffix from './addSizeSuffix';
// import { injectStyle } from 'styletron-utils';

export default (config, plugins) => {
  const storageurl = config.media;
  const storagesuffix = config.mediasuffix;

  // TODO: make srcset sizes configurable
  const shortcodes = {
    image: (str, params, { styletron }) => {
      const figText = `${params.caption || ''}${
        params.attribution ? ' (' + params.attribution + ')' : ''
      }`;
      const figOpen = params.caption || params.attribution ? '<figure>' : '';
      const figClose =
        params.caption || params.attribution
          ? `<figcaption>${figText}</figcaption></figure>`
          : '';
      const lightbox = params.lightbox
        ? 'on="tap:lightbox1" role="button" tabindex="0"'
        : '';
      return `<div>${figOpen}<amp-img
                  ${
                    params.fill
                      ? ''
                      : `width=${params.width || 1}
                  height=${params.height || 1}`
                  }
                  src="${storageurl}${addSizeSuffix(
        params.name,
        '-s'
      )}${storagesuffix}"
                  srcset="${storageurl}${addSizeSuffix(
        params.name,
        '-l'
      )}${storagesuffix} 1280w,
                  ${storageurl}${addSizeSuffix(
        params.name,
        '-m'
      )}${storagesuffix} 640w,
                  ${storageurl}${addSizeSuffix(
        params.name,
        '-s'
      )}${storagesuffix} 320w"
                  alt="${params.alttext || ''}"
                  attribution="${params.attribution || ''}" ${lightbox}
                  layout="${
                    params.fill ? 'fill' : 'responsive'
                  }"></amp-img/>${figClose}</div>`;
    },
    // video: (str, params) =>
    //   `<div><amp-video
    //     layout="responsive"
    //     width=${params.width || 16}
    //     height=${params.height || 9}
    //     ${params.autoplay ? 'autoplay' : ''}
    //     ${params.loop ? 'loop' : ''}
    //      src="${params.url || ''}"
    //      poster="${params.poster || ''}">
    //        <div fallback>
    //          <p>Your browser doesn’t support HTML5 video</p>
    //        </div>
    //   </amp-video></div>`,
    // gif: (str, params) =>
    //   `<div><amp-anim
    //     layout="responsive"
    //     width=${params.width || 1}
    //     height=${params.height || 1}
    //     src="/${config.media}/${params.name}">
    //     <amp-img
    //     placeholder
    //     layout="responsive"
    //     width=${params.width || 1}
    //     height=${params.height || 1}
    //     src="/${config.media}/placeholder-${params.name}">
    //     </amp-img>
    //   </amp-anim></div>`,
    // audio: (str, params) =>
    //   `<div><amp-audio
    //     src="${params.url}">
    //     <div fallback>
    //     <p>Your browser doesn’t support HTML5 audio</p>
    //     </div>
    //     <source type="audio/mpeg" src="foo.mp3">
    //     <source type="audio/ogg" src="foo.ogg">
    //   </amp-audio></div>`,
    soundcloud: (str, params) =>
      oneLine`<div><amp-soundcloud
          height=${params.height || 166}
          layout="fixed-height" ${
            params.color && !params.visual ? `data-color="${params.color}"` : ''
          } data-trackid="${params.id}"
          ${params.visual ? 'data-visual="true"' : ''}>
        </amp-soundcloud></div>`,
    carousel: (str, { autoplay, delay, controls, width, height, loop }) =>
      oneLine`<div><amp-carousel
                type="slides"
                layout="responsive"
                ${autoplay ? `autoplay delay="${delay || 3000}"` : ''}
                ${controls ? 'controls' : ''}
                ${loop ? 'loop' : ''}
                width=${width || 4}
                height=${height || 3}>
                ${str}
              </amp-carousel></div>`,
    facebook: (str, { url, width, height, video }) =>
      oneLine`<div><amp-facebook width="${width}" height="${height}"
                layout="responsive"
                ${video ? 'data-embed-as="video"' : ''}
                data-href="${url}">
              </amp-facebook></div>`,
    facebookcomments: (str, { url, width, height, numposts }) =>
      oneLine`<div><amp-facebook-comments
                width=${width || 1}
                height=${height || 1}
                layout="responsive"
                data-numposts="${numposts || 5}"
                data-href="${url}">
              </amp-facebook-comments></div>`,
    fittext: (str, { width, height, min, max }) =>
      oneLine`<div><amp-fit-text
                width=${width || 4}
                height=${height || 3}
                min-font-size=${min || 10}
                max-font-size=${max || 52}
                layout="responsive">
              ${str}
            </amp-fit-text></div>`,
    gfycat: (str, params) =>
      oneLine`<div><amp-gfycat
                data-gfyid="${params.id}"
                width="${params.width || 4}"
                height="${params.height || 3}"
                layout="responsive">
                ${params.noautoplay ? 'noautoplay' : ''}>
              </amp-gfycat></div>`,
    iframe: (str, params) =>
      oneLine`<div><amp-iframe
                sandbox="allow-scripts allow-same-origin allow-popups"
                src=${params.url || ''}
                width=${params.width || 1}
                height=${params.height || 1}
                layout="responsive">
              </amp-iframe></div>`,
    instagram: (str, params) =>
      oneLine`<div><amp-instagram
                data-shortcode="${params.id || ''}"
                ${params.captioned ? 'data-captioned' : ''}
                width=${params.width || 1}
                height=${params.height || 1}
                layout="responsive">
              </amp-instagram></div>`,
    pinterest: (str, { width, height, url }) =>
      oneLine`<div><amp-pinterest
                width=${width || '236'}
                height=${height || '326'}
                data-do="embedPin"
                data-url="${url}">
              </amp-pinterest></div>`,
    playbuzz: (str, { height, url, iteminfo }) =>
      oneLine`<div><amp-playbuzz
                src="${url}"
                height=${height}
                ${iteminfo ? 'data-item-info="true"' : ''}>
              </amp-playbuzz></div>`,
    twitter: (str, { id, width, height, cardshidden }) =>
      oneLine`<div><amp-twitter
                width=${width}
                height=${height}
                layout="responsive"
                data-align="center"
                data-tweetid=${id}
                ${cardshidden ? 'data-cards="hidden"' : ''}>
              </amp-twitter></div>`,
    vine: (str, params) =>
      oneLine`<div><amp-vine
                data-vineid="${params.vineid || ''}"
                width=${params.width || 400}
                height=${params.height || 400}>
                layout="responsive">
              </amp-vine></div>`,
    vimeo: (str, params) =>
      oneLine`<div><amp-vimeo
                data-videoid="${params.videoid || ''}"
                width=${params.width || 500}
                height=${params.height || 281}
                layout="responsive">
              </amp-vimeo></div>`,
    youtube: (str, params) => {
      return oneLine`<div><amp-youtube
                data-videoid="${params.videoid || ''}"
                width=${params.width || 480}
                height=${params.height || 270}
                layout="responsive">
              </amp-youtube></div>`;
    },
    // EXAMPLE: styling with classes
    // youtube: (str, params, { styletron }) => {
    //   const classes = injectStyle(styletron, {
    //     border: '1px solid red',
    //     borderRadius: '100%',
    //   });
    //   return oneLine`<div><amp-youtube class="${classes}"
    //             data-videoid="${params.videoid || ''}"
    //             width=${params.width || 480}
    //             height=${params.height || 270}
    //             layout="responsive">
    //           </amp-youtube></div>`;
    // },
  };

  plugins
    .filter(plugin => plugin.shortcode && plugin.shortcode.theme)
    .forEach(plugin =>
      Shortcode.add(plugin.shortcode.label, plugin.shortcode.theme.transform)
    );

  for (let s in shortcodes) {
    Shortcode.add(s, shortcodes[s]);
  }

  return (text, styletron) => Shortcode.parse(text, { styletron, config });
};
