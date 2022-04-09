import React from 'react';
import './App.scss';
import Header from './partials/header';
import Main from './partials/main'

import { BrowserRouter} from "react-router-dom";



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
        <Main/>
      </BrowserRouter>
    </div>
  );
}

export default App;
