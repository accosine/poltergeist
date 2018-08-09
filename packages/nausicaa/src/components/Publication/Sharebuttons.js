import React from 'react';
import { styled } from 'styletron-react';
import withTheme from '../../util/withTheme';

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

const Link = styled('a', {
  textDecoration: 'none',
});

const SocialIcon = styled('div', {
  alignItems: 'center',
  display: 'flex',
  fill: 'white',
  flexDirection: 'row',
  justifyContent: 'space-around',
});

const SocialIconSvg = styled('svg', {
  height: '8vw',
  padding: '2vw 0vw 2vw 1vw',
  width: '9vw',
  '@media screen and (min-width: 1024px)': {
    height: '2vw',
    padding: '1vw 0 1vw 1vw',
    width: '2vw',
  },
});

const Facebook = withTheme(
  styled(SocialIcon, ({ styleProps: { theme } }) => ({
    backgroundColor: theme.facebookblau,
  }))
);

const Twitter = withTheme(
  styled(SocialIcon, ({ styleProps: { theme } }) => ({
    backgroundColor: theme.twitterblau,
  }))
);

const Whatsapp = withTheme(
  styled(SocialIcon, ({ styleProps: { theme } }) => ({
    backgroundColor: theme.whatsappgruen,
    '@media screen and (min-width: 1024px)': {
      display: 'none',
    },
  }))
);

const SocialIconText = withTheme(
  styled('span', ({ styleProps: { theme } }) => ({
    color: theme.eierschale,
    fontSize: '5vw',
    padding: '1vw',
    '@media screen and (min-width: 1024px)': {
      color: '#f9fafb',
      fontSize: '1vw',
      padding: '1vw',
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
    <Link
      href={`https://facebook.com/sharer/sharer.php?u=${protocol}://${domain}/${
        collections[collection].slug
      }/${slug}&title=${encodeURIComponent(title)}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Facebook>
        <SocialIconSvg>
          <use xlinkHref="#social-icon--facebook-use" />
        </SocialIconSvg>
        <SocialIconText>TEILEN</SocialIconText>
      </Facebook>
    </Link>
    <Link
      href={`whatsapp://send?text=${protocol}://${domain}/${
        collections[collection].slug
      }/${slug} ${encodeURIComponent(title)}`}
      data-action="share/whatsapp/share"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Whatsapp>
        <SocialIconSvg>
          <use xlinkHref="#social-icon--whatsapp-use" />
        </SocialIconSvg>
        <SocialIconText id="social-icon--whatsapp-text">APPSEN</SocialIconText>
      </Whatsapp>
    </Link>
    <Link
      href={`https://twitter.com/intent/tweet?url=${protocol}://${domain}/${
        collections[collection].slug
      }/${slug}&text=${encodeURIComponent(title)}&via=${organization.name}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Twitter>
        <SocialIconSvg>
          <use xlinkHref="#social-icon--twitter-use" />
        </SocialIconSvg>
        <SocialIconText id="social-icon--twitter-text">TWEETEN</SocialIconText>
      </Twitter>
    </Link>
  </Container>
);
