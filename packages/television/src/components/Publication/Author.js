import React from 'react';
import { styled, withStyle } from 'styletron-react';

import { withTheme } from '../../util/ThemeContext';
import AmpComponent from '../AmpComponent';
import Link from '../Link';

const Container = withTheme(
  styled('div', ({ $theme }) => ({
    backgroundColor: $theme.grey[200],
    padding: '5vw 0 5vw 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }))
);

const Wrapper = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const PictureWrapper = styled('div', {
  margin: '4vw',
});

const By = withTheme(
  styled('div', ({ $theme }) => ({
    textTransform: 'uppercase',
    fontWeight: '900',
    color: $theme.grey[200],
    fontSize: '3vw',
    textShadow: `1px -1px ${$theme.grey[900]}`,
    '@media screen and (min-width: 1024px)': {
      fontSize: '2vw',
      textShadow: `3px -2px ${$theme.grey[900]}`,
    },
  }))
);

const Slogan = withTheme(
  styled('div', ({ $theme }) => ({
    color: $theme.grey[900],
    fontSize: '3vw',
    '@media screen and (min-width: 1024px)': {
      fontSize: '1vw',
    },
  }))
);

const Social = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  // margin: '3vw',
});

const SocialLeft = withStyle(Social, {
  textAlign: 'right',
});

const SocialRight = withStyle(Social, {});

const SocialIcon = styled('div', {
  margin: '1vw',
});

const SocialIconSvg = withTheme(
  styled('svg', ({ $theme }) => ({
    width: '10vw',
    height: '10vw',
    transition:
      'fill 0.3s ease-in-out, filter 0.2s ease-in-out, transform 0.2s ease-in-out',
    fill: $theme.white,
    filter: 'none',
    transform: 'translate(0, 0)',
    ':hover': {
      filter: `drop-shadow(${$theme.grey[400]} 3px 3px 0px)`,
      transform: 'translate(-1px, -1px)',
    },
    '@media screen and (min-width: 1024px)': {
      width: '5vw',
      height: '5vw',
    },
  }))
);

const Snapchat = withTheme(
  styled(SocialIconSvg, ({ $theme }) => ({
    ':hover': {
      fill: $theme.snapchat,
    },
  }))
);

const Twitter = withTheme(
  styled(SocialIconSvg, ({ $theme }) => ({
    ':hover': {
      fill: $theme.twitter,
    },
  }))
);

const Instagram = withTheme(
  styled(SocialIconSvg, ({ $theme }) => ({
    ':hover': {
      fill: $theme.instagram,
    },
  }))
);

const Facebook = withTheme(
  styled(SocialIconSvg, ({ $theme }) => ({
    ':hover': {
      fill: $theme.facebook,
    },
  }))
);

const Github = withTheme(
  styled(SocialIconSvg, ({ $theme }) => ({
    ':hover': {
      fill: $theme.github,
    },
  }))
);

const Email = withTheme(
  styled(SocialIconSvg, ({ $theme }) => ({
    ':hover': {
      fill: $theme.email,
    },
  }))
);

const Name = withTheme(
  styled('span', ({ $theme }) => ({
    textTransform: 'uppercase',
    display: 'block',
    fontSize: '5vw',
    textAlign: 'center',
    fontWeight: '900',
    color: $theme.grey[200],
    textShadow: `2px -2px ${$theme.grey[900]}`,
    '@media screen and (min-width: 1024px)': {
      fontSize: '3vw',
      textShadow: `3px -2px ${$theme.grey[900]}`,
    },
  }))
);

const Picture = withTheme(
  styled(AmpComponent('amp-img'), ({ $theme }) => ({
    width: '40vw',
    border: `5px solid ${$theme.grey[700]}`,
    borderRadius: '50%',
    '@media screen and (min-width: 1024px)': {
      width: '15vw',
    },
  }))
);

const Author = ({ config, author }) => {
  const {
    name,
    slogan,
    email,
    facebook,
    github,
    twitter,
    instagram,
    snapchat,
    avatar,
  } = config.authors[author];
  return (
    <Container>
      <By>written by</By>
      <Wrapper>
        <SocialLeft>
          {email ? (
            <SocialIcon>
              <Link href={`mailto:${email}`}>
                <div>
                  <Email>
                    <use xlinkHref="#social-icon-email" />
                  </Email>
                </div>
              </Link>
            </SocialIcon>
          ) : null}
          {github ? (
            <SocialIcon>
              <Link href={`https://github.com/${github}`} target="_blank">
                <div>
                  <Github>
                    <use xlinkHref="#social-icon-github" />
                  </Github>
                </div>
              </Link>
            </SocialIcon>
          ) : null}
          {twitter ? (
            <SocialIcon>
              <Link href={`https://twitter.com/${twitter}`} target="_blank">
                <div>
                  <Twitter>
                    <use xlinkHref="#social-icon-twitter" />
                  </Twitter>
                </div>
              </Link>
            </SocialIcon>
          ) : null}
        </SocialLeft>
        <PictureWrapper>
          <Picture
            width={4}
            height={4}
            src={`${config.media}${avatar}${config.mediasuffix}`}
            alt={name}
            layout="responsive"
          />
        </PictureWrapper>
        <SocialRight>
          {facebook ? (
            <SocialIcon>
              <Link href={`https://facebook.com/${facebook}`} target="_blank">
                <div>
                  <Facebook>
                    <use xlinkHref="#social-icon-facebook" />
                  </Facebook>
                </div>
              </Link>
            </SocialIcon>
          ) : null}
          {instagram ? (
            <SocialIcon>
              <Link href={`https://instagram.com/${instagram}`} target="_blank">
                <div>
                  <Instagram>
                    <use xlinkHref="#social-icon-instagram" />
                  </Instagram>
                </div>
              </Link>
            </SocialIcon>
          ) : null}
          {snapchat ? (
            <SocialIcon>
              <Link href={`https://www.snapchat.com/add/${snapchat}`} target="_blank">
                <div>
                  <Snapchat>
                    <use xlinkHref="#social-icon-snapchat" />
                  </Snapchat>
                </div>
              </Link>
            </SocialIcon>
          ) : null}
        </SocialRight>
      </Wrapper>
      <Name>{name}</Name>
      {slogan ? <Slogan>"{slogan}"</Slogan> : null}
    </Container>
  );
};

export default Author;
