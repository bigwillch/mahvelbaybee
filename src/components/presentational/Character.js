import React from 'react';
import PropTypes from 'prop-types';

export default class Character extends React.Component {

  static propTypes = {
    name: PropTypes.string.isRequired
  }

  render() {
    return (
      <h2>{ this.props.name }</h2>
    );
  }
}
