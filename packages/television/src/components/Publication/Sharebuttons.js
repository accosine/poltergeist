import React from 'react';
import { styled } from 'styletron-react';
import { withTheme } from '../../util/ThemeContext';
import Link from '../Link';

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
  margin: '5vw 0vw 5vw 0vw',
  position: 'relative',
  '@media screen and (min-width: 1024px)': {
    top: '0vw',
    justifyContent: 'center',
  },
});

const A = styled(Link, {
  textDecoration: 'none',
});

const SocialIcon = withTheme(
  styled('div', ({ $theme }) => ({
    alignItems: 'center',
    display: 'flex',
    fill: $theme.white,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderRadius: '50%',
    margin: '0 0.5vw',
    boxShadow: 'none',
    transform: 'translate(0, 0)',
    transition: 'box-shadow 0.2s ease-in-out, transform 0.2s ease-in-out',
    ':hover': {
      boxShadow: `3px 3px 5px 0px ${$theme.grey[400]}`,
      transform: 'translate(-1px, -1px)',
    },
  }))
);

const SocialIconSvg = styled('svg', {
  height: '7vw',
  padding: '3vw',
  width: '7vw',
  '@media screen and (min-width: 1024px)': {
    height: '2vw',
    padding: '1vw',
    width: '2vw',
  },
});

const Facebook = withTheme(
  styled(SocialIcon, ({ $theme }) => ({
    backgroundColor: $theme.facebook,
  }))
);

const Twitter = withTheme(
  styled(SocialIcon, ({ $theme }) => ({
    backgroundColor: $theme.twitter,
  }))
);

const Whatsapp = withTheme(
  styled(SocialIcon, ({ $theme }) => ({
    backgroundColor: $theme.whatsapp,
    '@media screen and (min-width: 1024px)': {
      display: 'none',
    },
  }))
);

export default ({
  slug,
  title,
  collection,
  collections,
  config: { protocol, domain, organization },
}) => (
  <Container>
    <A
      href={`https://facebook.com/sharer/sharer.php?u=${protocol}://${domain}/${
        collections[collection].slug
      }/${slug}&title=${encodeURIComponent(title)}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Facebook>
        <SocialIconSvg>
          <use xlinkHref="#social-icon-facebook" />
        </SocialIconSvg>
      </Facebook>
    </A>
    <A
      href={`whatsapp://send?text=${protocol}://${domain}/${
        collections[collection].slug
      }/${slug} ${encodeURIComponent(title)}`}
      data-action="share/whatsapp/share"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Whatsapp>
        <SocialIconSvg>
          <use xlinkHref="#social-icon-whatsapp" />
        </SocialIconSvg>
      </Whatsapp>
    </A>
    <A
      href={`https://twitter.com/intent/tweet?url=${protocol}://${domain}/${
        collections[collection].slug
      }/${slug}&text=${encodeURIComponent(title)}&via=${organization.name}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Twitter>
        <SocialIconSvg>
          <use xlinkHref="#social-icon-twitter" />
        </SocialIconSvg>
      </Twitter>
    </A>
  </Container>
);
