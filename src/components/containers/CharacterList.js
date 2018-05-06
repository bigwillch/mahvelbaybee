import React from 'react';
import { connect } from 'react-redux'
import { apiCall } from 'redux/actions/api'
import Character from 'components/presentational/Character'

let params = {
  limit: 10,
  orderBy: 'modified'
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    results: state.api.results
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoad: (params) => {
      dispatch(apiCall(params) )
    }
  }
}

class CharacterList extends React.Component {

  componentWillMount() {
    this.props.onLoad(params);
  }

  render() {
    const chars = this.props.results.map((item, index) => {
      return <Character key={index} name={item.name} {...index} />
    });

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
