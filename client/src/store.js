import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index'

const middleWare = [thunk]

// three params: 1) reducers 2) initial state: when you want to have initial data as soons as App.js starts (optional) 3) enhance data: transform the raw data as how you want it to be (optional)
const store = createStore(
  // returns array
  rootReducer,
  // initial data
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