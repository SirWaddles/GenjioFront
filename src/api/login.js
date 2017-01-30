import LoginStore from '../stores/login';

function TestLoginInformation(response) {
    var loginObj = LoginStore.getState();
    var options = {
        method: 'GET',
        headers: {
            'Genjio-API-Key': loginObj.password,
            'Genjio-API-Username': loginObj.username,
        },
    };
    fetch("https://i.genj.io/api/login", options).then(response).catch(function(error) {
        console.log(error);
    });
}

export default TestLoginInformation;
