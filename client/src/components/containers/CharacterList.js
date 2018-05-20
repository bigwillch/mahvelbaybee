import React from 'react';
import { connect } from 'react-redux'
// import { apiCall } from 'redux/actions/api'
import Search from 'components/containers/Search'
import Character from 'components/presentational/Character'

const params = {
  limit: 20,
  orderBy: 'name'
}
const endpoint = 'characters'

const mapStateToProps = (state) => {
  return {
    results: state.api.results
  }
}

class CharacterList extends React.Component {

  render() {
    const chars = this.props.results.map((item, index) =>
      <Character
        key={index}
        name={item.name}
        img={item.img}
      />
    );

    return (
      <React.Fragment>
        <Search query='nameStartsWith' params={ params } endpoint={ endpoint }/>
        {chars.length > 0 &&
          chars
        }
      </React.Fragment>
    );
  }

}

export default CharacterList = connect(
  mapStateToProps
)(CharacterList)
