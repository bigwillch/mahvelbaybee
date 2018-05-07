import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import createDebounce from 'redux-debounced';
import reducers from 'redux/reducers';

const store = createStore(
  reducers,
  applyMiddleware(
    createDebounce(),
    thunk
  )
);

export default store;
