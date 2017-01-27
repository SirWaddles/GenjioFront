import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';

document.addEventListener("DOMContentLoaded", function(event) {
    ReactDOM.render(React.createElement(App, null), document.getElementById("main"));
});
