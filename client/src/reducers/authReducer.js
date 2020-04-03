// write anything related to the authentication into the store (give a specific responsibility)

// 1. WHAT part (data)
const initialState = {
  isAuthenticated: false,
  user: {}
}

// 2. HOW part (function)
// App.js wakes up reducer with default state/action
export default function(state = initialState, action) {
  // if statement
  switch (action.type) {

    
    default:
      // returns to the store
      return state;
  }
}