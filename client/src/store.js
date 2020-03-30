import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index'

const middleWare = [thunk]

// three params: reducers, initial state(optional), enhance data(optional)
const store = createStore(
  rootReducer,
  {},
  // compose: put multiple enhancements together
  compose(
    // first enhancement: spread the data and thunk it
    applyMiddleware(...middleWare),
    // second enhancement: for debugging purpose
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)

export default store