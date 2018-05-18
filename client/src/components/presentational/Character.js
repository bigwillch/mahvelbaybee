import React from 'react';
import PropTypes from 'prop-types';
import Image from 'components/presentational/Image'

export default class Character extends React.Component {

  static propTypes = {
    name: PropTypes.string.isRequired,
    img: PropTypes.string
  }

  render() {
    return (
      <div className="card">
        <h2>{ this.props.name }</h2>
        { this.props.img &&
          <Image src={ this.props.img } />
        }
      </div>
    );
  }
}
