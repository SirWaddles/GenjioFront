import LoginStore from '../stores/login';
import UpdateImageListings from './imagelist';

function GetLoginHeaders() {
    var loginObj = LoginStore.getState();
    return {
        'Genjio-API-Password': loginObj.password,
        'Genjio-API-Username': loginObj.username,
    };
}

export { GetLoginHeaders };

function TestLoginInformation() {
    var options = {
        method: 'GET',
        headers: GetLoginHeaders(),
    };
    fetch(gbl_endpoint + "/app/login", options).then(response => response.json()).then(function(data) {
        if (data.success == true) {
            LoginStore.updateState({loading: false, login: true});
            UpdateImageListings();
        } else {
            LoginStore.updateState({loading: false, login: false});
        }
    }).catch(function(error) {
        console.log(error);
        LoginStore.updateState({loading: false});
    });
}

function ChangePassword(password) {
    var options = {
        method: 'POST',
        headers: Object.assign(GetLoginHeaders(), {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify({newPassword: password}),
    };

    fetch(gbl_endpoint + "/app/password", options).then(response => response.json()).then(function(data) {
        if (data.success == true) {
            LoginStore.updateState({'password': password});
        }
    }).catch(function(error) {
        console.log(error);
    });
}

export { ChangePassword };

export default TestLoginInformation;
