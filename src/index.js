import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Modal from 'react-modal';

const root = document.getElementById('root');
Modal.setAppElement(root);
ReactDOM.render(<App />, root);
