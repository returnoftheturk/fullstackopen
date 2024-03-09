import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import noteReducer, {createNote} from './reducers/noteReducer';
import filterReducer, {filterChange} from './reducers/filterReducer';
import App from './App';

const store = configureStore({
  reducer: {
    notes: noteReducer,
    filter: filterReducer
  }
})

store.subscribe(() => console.log('subscribe log:', store.getState()))
store.dispatch(filterChange('IMPORTANT'))
store.dispatch(createNote('combineReducers forms one reducer from many simple reducers'))

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  )
}

renderApp()
store.subscribe(renderApp)
