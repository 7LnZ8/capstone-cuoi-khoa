import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './client/App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './client/redux/configStore'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
)