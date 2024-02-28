import React from 'react'
import ReactDOM from 'react-dom/client'

import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const buttonDispatchMap = {
  good: 'GOOD',
  bad: 'BAD',
  ok: 'OK', 
  zero: 'ZERO'
}

const App = () => {
  const dispatchToStore = (buttonKey) => {
    store.dispatch({
      type: buttonDispatchMap[buttonKey]
    })
  }

  return (
    <div>
      <button onClick={() => dispatchToStore('good')}>good</button> 
      <button onClick={() => dispatchToStore('ok')}>ok</button> 
      <button onClick={() => dispatchToStore('bad')}>bad</button>
      <button onClick={() => dispatchToStore('zero')}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
