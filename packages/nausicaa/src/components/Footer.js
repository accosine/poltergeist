import React, { Fragment } from 'react';
import { styled } from 'styletron-react';
import { oneLine } from 'common-tags';
import { injectStyle } from 'styletron-utils';
import AmpComponent from './AmpComponent';
import withTheme from '../util/withTheme';

const LogoContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
});

const Logo = styled('div', {
  margin: '10vw auto 0 auto',
  width: '26vw',
  padding: '2vw 0 2vw 1vw',
  '@media screen and (min-width: 1024px)': {
    width: '10vw',
    height: 'inherit',
  },
});

const LogoText = styled('svg', {
  margin: '0 auto',
  height: '26vw',
  padding: '0 0 2vw 1vw',
  width: '54vw',
  display: 'block',
  '@media screen and (min-width: 1024px)': {
    width: '22vw',
    height: 'inherit',
  },
});

const Ul = styled('ul', {
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap',
  height: '40vw',
  listStyleType: 'none',
  padding: '5vw',
  '@media screen and (min-width: 1024px)': {
    height: 'inherit',
    flexDirection: 'row',
    width: '50vw',
    justifyContent: 'space-between',
    padding: '5vw 0 5vw 0',
  },
});

const Li = styled('li', {
  paddingBottom: '3vw',
});

const A = withTheme(
  styled('a', ({ styleProps: { theme } }) => ({
    textDecoration: 'none',
    color: theme.mausgrau,
  }))
);

const AmpUserNotification = withTheme(
  styled(
    AmpComponent('amp-user-notification'),
    ({ styleProps: { theme } }) => ({
      backgroundColor: theme.nausikamint,
      textAlign: 'center',
      padding: '1vw',
    })
  )
);

export default withTheme(({ config, styletron, styleProps }) => {
  const buttonClasses = injectStyle(styletron, {
    padding: '1vw',
    marginTop: '1vw',
    border: 0,
    backgroundColor: styleProps.theme.weißtransparent,
  });

  return (
    <Fragment>
      <footer>
        <LogoContainer>
          <a href="#main">
            <Logo>
              <amp-img
                width={'3'}
                height={'3'}
                src={`${config.media}${config.logo.src}${config.mediasuffix}`}
                alt={config.logo.alt}
                attribution="All Rights Reserved"
                layout="responsive"
              />
            </Logo>
          </a>
          <a href="#main">
            <LogoText>
              <use xlinkHref="#nausika--logotext-use" />
            </LogoText>
          </a>
        </LogoContainer>
        <Ul>
          {/* TODO */}
          {/* <Li>Newsletter</Li> */}
          {/* <Li>Über uns</Li> */}
          {/* <Li>FAQ</Li> */}
          {/* <Li>Werbung</Li> */}
          <Li>
            <A href="/impressum">Impressum</A>
          </Li>
          <Li>
            <A href="/datenschutz">Datenschutz</A>
          </Li>
          <Li>
            <A href="/agb">AGB</A>
          </Li>
          <Li>
            <A href="/rss">RSS</A>
          </Li>
          <Li>
            <A href={`https://www.facebook.com/${config.vanityurl}`}>
              Facebook
            </A>
          </Li>
          <Li>
            <A href={`https://www.twitter.com/${config.vanityurl}`}>Twitter</A>
          </Li>
        </Ul>
      </footer>
      <AmpUserNotification
        layout="nodisplay"
        id="amp-user-notification1"
        dangerouslySetInnerHTML={{
          __html: oneLine`
            <p>
              nausika nutzt Cookies in deinem Browser. Wir speichern darin allerlei
              Daten - aber keine Sorge, nichts Wildes. Mehr langweiliges bla bla
              über Cookies kannst du <a href="/datenschutz/">hier lesen...</a>
            </p>
            <button class="${buttonClasses}" on="tap:amp-user-notification1.dismiss">
              Cookies finde ich ganz ok
            </button>
            `,
        }}
      />
    </Fragment>
  );
});
