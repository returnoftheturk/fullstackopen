const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const incrementStateProperty = (state, property) => {
  const key = property.toLowerCase();
  return {
    ...state,
    [key]: state[key] + 1
  }
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
    case 'OK':
    case 'BAD':
      return incrementStateProperty(state, action.type)
    case 'ZERO':
      return initialState
    default: return state
  }
  
}

export default counterReducer
