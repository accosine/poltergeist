import React, { Fragment } from 'react';
import { styled } from 'styletron-react';
import { oneLine } from 'common-tags';
import AmpComponent from './AmpComponent';
import Link from './Link';
import { withTheme } from '../util/ThemeContext';

const LogoContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
});

const LogoText = withTheme(
  styled('svg', ({ $theme }) => ({
    fill: $theme.grey[900],
    margin: '0 auto',
    height: '26vw',
    padding: '0 0 2vw 1vw',
    width: '54vw',
    display: 'block',
    '@media screen and (min-width: 1024px)': {
      width: '22vw',
      height: 'inherit',
    },
  }))
);

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
  styled(Link, ({ $theme }) => ({
    textDecoration: 'none',
    color: $theme.grey[700],
  }))
);

const UserConsent = withTheme(
  styled(AmpComponent('amp-user-notification'), ({ $theme }) => ({
    backgroundColor: $theme.grey[200],
    textAlign: 'center',
    padding: '1vw',
  }))
);

const SocialMedia = ({ name, handle, base }) =>
  handle ? (
    <Li>
      <A href={`${base}${handle}`} target="_blank">
        {name}
      </A>
    </Li>
  ) : null;

export default withTheme(({ config, styletron, $theme }) => {
  const buttonClasses = styletron.renderStyle({
    padding: '1vw',
    marginTop: '1vw',
    border: 0,
    backgroundColor: $theme.transparentwhite,
  });

  return (
    <Fragment>
      <footer>
        <LogoContainer>
          <a href="#main">
            <LogoText>
              <use xlinkHref="#biglogo" />
            </LogoText>
          </a>
        </LogoContainer>
        <Ul>
          <Li>
            <A href="/imprint">Imprint</A>
          </Li>
          <Li>
            <A href="/privacypolicy">Privacy</A>
          </Li>
          {config.socialmedia.map(props => (
            <SocialMedia key={props.name} {...props} />
          ))}
        </Ul>
      </footer>
      <UserConsent
        layout="nodisplay"
        id="amp-user-notification1"
        dangerouslySetInnerHTML={{
          __html: oneLine`
            <p>
              Let's have a cookie! They are not only delicious, they help us
              analyzing how you use this website. We use them so store some data
              in them (but not too much). Don't be afraid, we won't give this
              data to anyone (promise 🤞).
              If you like to read really boring stuff you can read all about it
              in <a href="/privacypolicy">our privacy policy here...</a>
            </p>
            <button class="${buttonClasses}" on="tap:amp-user-notification1.dismiss">
              Yay cookies, nom nom nom
            </button>
            `,
        }}
      />
    </Fragment>
  );
});
