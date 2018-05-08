import React from 'react';
import PropTypes from 'prop-types';
import Image from 'components/presentational/Image'

export default class Character extends React.Component {

  static propTypes = {
    name: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired
  }

  render() {
    return (
      <div>
        <h2>{ this.props.name }</h2>
        { !this.props.img.includes('image_not_available') &&
          <Image src={ this.props.img } />
        }
      </div>
    );
  }
}
