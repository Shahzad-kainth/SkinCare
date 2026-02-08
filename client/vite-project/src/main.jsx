import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import {Provider} from 'react-redux';
import store from './app/store.js';
import { BrowserRouter } from "react-router";
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
 <BrowserRouter>
  <Provider store={store}>
  <StrictMode>
    <App />
  </StrictMode>,
  </Provider> 
  </BrowserRouter>
)
