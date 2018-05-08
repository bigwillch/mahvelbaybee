import React from 'react';
import PropTypes from 'prop-types';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default class Character extends React.Component {

  static propTypes = {
    src: PropTypes.string.isRequired
  }

  render() {
    const image = this.props
    return (
      <LazyLoadImage
        src={image.src}
        alt={image.alt ? image.alt : null}
        height={image.height ? image.height : null}
        width={image.width ? image.width : null}
      />
    );
  }
}
