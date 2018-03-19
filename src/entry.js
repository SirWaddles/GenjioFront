import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

document.addEventListener("DOMContentLoaded", function(event) {
    ReactDOM.render(React.createElement(App, null), document.getElementById("main"));
});

import LoginStore from './stores/login';
import UpdateImageListings from './api/imagelist';
if (typeof Android != 'undefined') { // running from Android application
    if(Android.isLoggedIn()) {
        LoginStore.updateState({
            username: Android.getLoginName(),
            password: Android.getLoginKey(),
            login: true,
        });
        UpdateImageListings();
    }
}
