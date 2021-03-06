// import { createActions, handleActions, combineActions } from 'redux-actions';
import axios from 'axios';

import md5 from 'md5';

const auth = {
  marvel: {
    public: process.env.REACT_APP_MARVEL_PUBLIC,
    private: process.env.REACT_APP_MARVEL_PRIVATE
  }
}
const ts = Date.now();
const authParams = {
  apikey: auth.marvel.public,
  ts: ts,
  hash: md5(ts+auth.marvel.private+auth.marvel.public)
}

const CancelToken = axios.CancelToken;
let cancel = null;


export const API_RESPONSE = 'API_RESPONSE';
export const API_CLEAR = 'API_CLEAR';

// Action creators
export const apiResponse = (response) => {
  return {
    type: API_RESPONSE,
    payload: {
      results: response.data.results
    }
  }
}

export const apiClear = () => {
  return {
    type: API_CLEAR,
    payload: {
      results: []
    }
  }
}

// Thunk action wrapper
export function apiCall(params, endpoint) {
  typeof cancel === 'function' && cancel()

  const thunk = dispatch => {
    axios.get('//localhost:5000/api/marvel', {
      params: { ...params, ...authParams, endpoint },
      cancelToken: new CancelToken(
        function executor(c) {
          cancel = c;
        }
      )
    })
    .then(response => {
      console.log(response)
      dispatch(apiResponse(response))
    })
    .catch(error => {
      console.log(error);
    });
  };
  thunk.meta = {
    debounce: {
      time: 200,
      key: 'API_CALL'
    }
  };
  return thunk;
}


const initialState = {
  results: []
}

// Reducers
export default (state = initialState, action) => {
  switch (action.type) {
    case API_RESPONSE:
    case API_CLEAR:
      return { ...state, results: action.payload.results }
    default:
      return state
  }
}

// Selectors
export const getResults = (state) => state.results
