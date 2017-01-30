import LoginStore from '../stores/login';
import ImageStore from '../stores/imagelist';

function RetrieveListings(response) {
    console.log(response.body);
}

function UpdateImageListings() {
    var loginObj = LoginStore.getState();
    var options = {
        method: 'GET',
        headers: {
            'Genjio-API-Key': loginObj.password,
            'Genjio-API-Username': loginObj.username,
        },
    };
    fetch("https://i.genj.io/api/list", options).then(RetrieveListings).catch(function(error) {
        console.log(error);
    });
}

export default UpdateImageListings;
