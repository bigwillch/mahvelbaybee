// import { createActions, handleActions, combineActions } from 'redux-actions';
import { API_RESPONSE } from 'redux/constants/actionTypes'
import axios from 'axios';
import md5 from 'md5';
import auth from 'auth.json';

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
export const apiCall = (params) => (dispatch) => {
  const ts = Date.now();
  axios.get('http://gateway.marvel.com/v1/public/characters', {
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
      console.log(action);
      return { ...state, results: action.payload.results }
    default:
      return state
  }
}

// Selectors
export const getResults = (state) => state.results
