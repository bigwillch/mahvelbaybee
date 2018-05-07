import React from 'react';
import { connect } from 'react-redux'
import { apiCall } from 'redux/actions/api'
import Character from 'components/presentational/Character'

const params = {
  limit: 10,
  orderBy: 'modified'
}
const endpoint = 'characters'

const mapStateToProps = (state) => {
  console.log(state);
  return {
    results: state.api.results
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoad: (params, endpoint) => {
      dispatch(apiCall(params, endpoint) )
    }
  }
}

class CharacterList extends React.Component {

  componentWillMount() {
    this.props.onLoad(params, endpoint);
  }

  render() {
    const chars = this.props.results.map((item, index) =>
      <Character
        key={index}
        name={item.name}
        img={item.thumbnail.path + '.' + item.thumbnail.extension}
      />
    );

    if(chars.length > 0) {
      return <div>{chars}</div>
    }else{
      return null
    }
  }

}

export default CharacterList = connect(
  mapStateToProps,
  mapDispatchToProps
)(CharacterList)
