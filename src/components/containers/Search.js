import React, { Component } from 'react'
import { connect } from 'react-redux'
import { apiCall } from 'redux/actions/api'

const mapDispatchToProps = (dispatch) => {
  return {
    onChange: (params, endpoint) => {
      dispatch(apiCall(params, endpoint))
    }
  }
}

class Search extends Component {
  state = {
   query: '',
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
     }
   })
  }

  render() {
   console.log(this.props)
   return (
     <form>
       <input
         placeholder="Search for..."
         ref={input => this.search = input}
         onChange={this.handleInputChange}
       />
       <p>{this.state.query}</p>
     </form>
   )
  }
}

export default Search = connect(
  null,
  mapDispatchToProps
)(Search)
