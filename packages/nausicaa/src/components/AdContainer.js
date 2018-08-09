import React from 'react';
import PropTypes from 'prop-types';
import { styled } from 'styletron-react';

const Container = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  position: 'relative',
  '@media screen and (min-width: 1024px)': {
    top: 0,
  },
});

const AdContainer = ({ adnetwork, adconfig, width, height }) => (
  <Container>
    <amp-ad width={width} height={height} type={adnetwork} {...adconfig} />
  </Container>
);

AdContainer.propTypes = {
  adnetwork: PropTypes.string.isRequired,
  adconfig: PropTypes.object.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
};
AdContainer.defaultProps = {
  width: 300,
  height: 250,
};
export default AdContainer;
