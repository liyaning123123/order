import React from 'react';
import './App.css';
import Routers from './router/routerall'
import route from './router/routerconfig'
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import store from './store/index'
import '../node_modules/antd/dist/antd';
function App() {
  return (
    <Provider store={store}>
    <BrowserRouter>
      <Routers lis={route}></Routers>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
