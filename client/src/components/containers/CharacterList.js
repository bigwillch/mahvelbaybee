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
      <div>
        <Search query='nameStartsWith' params={ params } endpoint={ endpoint }/>
        {chars.length > 0 &&
          chars
        }
      </div>
    );
  }

}

export default CharacterList = connect(
  mapStateToProps
)(CharacterList)
