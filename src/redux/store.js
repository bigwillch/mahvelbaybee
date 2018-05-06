import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk'
import reducers from 'redux/reducers';

const store = createStore(
  reducers,
  applyMiddleware(
    thunkMiddleware
  )
);

export default store;
