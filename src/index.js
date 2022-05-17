import React from 'react';
import ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';
import App from './App';
import Mapp from './Mapp';
import "./index.css";
import "./map.css"


ReactDOM.render(
  <RecoilRoot>
    <App />
    <Mapp />
  </RecoilRoot>,
  document.getElementById('root')
);