import React, { Component } from 'react'
import { connect } from 'react-redux'
import { apiCall, apiClear } from 'redux/actions/api'

const mapDispatchToProps = (dispatch) => {
  return {
    onChange: (params, endpoint) => {
      dispatch(apiCall(params, endpoint))
    },
    clearSearch: () => dispatch(apiClear())
  }
}

class Search extends Component {
  state = {
   query: '',
  }

  clearSearch = () => {
    this.search.value = '';
    this.props.clearSearch()
  }

  handleInputChange = () => {
    this.setState({
     query: this.search.value
    }, () => {
     if (this.state.query && this.state.query.length > 1) {
       if (this.state.query.length % 2 === 0) {
         this.props.onChange({...this.props.params, [this.props.query]: this.state.query}, this.props.endpoint);
       }
     } else if (!this.state.query) {
       this.clearSearch();
     }
    })
  }

  render() {
   return (
     <div>
       <input
         placeholder="Search for..."
         ref={input => this.search = input}
         onChange={this.handleInputChange}
       />
       <button onClick={ this.clearSearch }>Clear</button>
     </div>
   )
  }
}

export default Search = connect(
  null,
  mapDispatchToProps
)(Search)
