// import { createActions, handleActions, combineActions } from 'redux-actions';
import axios from 'axios';
import md5 from 'md5';
import auth from 'auth.json'; // use process.env?

export const API_RESPONSE = 'API_RESPONSE';

// Action creators
export const apiResponse = (response) => {
  return {
    type: API_RESPONSE,
    payload: {
      results: response.data.data.results
    }
  }
}

// Thunk action wrapper
export const apiCall = (params, endpoint) => (dispatch) => {
  const ts = Date.now();
  axios.get('http://gateway.marvel.com/v1/public/' + endpoint, {
    params: { ...params,
      apikey: auth.marvel.public,
      ts: ts,
      hash: md5(ts+auth.marvel.private+auth.marvel.public)
    }
  })
  .then(response => {
    dispatch(apiResponse(response))
  })
  .catch(error => {
    console.log(error);
  });
}

const initialState = {
  results: []
}

// Reducers
export default (state = initialState, action) => {
  switch (action.type) {
    case API_RESPONSE:
      return { ...state, results: action.payload.results }
    default:
      return state
  }
}

// Selectors
export const getResults = (state) => state.results
