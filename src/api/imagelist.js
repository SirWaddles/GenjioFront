import LoginStore from '../stores/login';
import ImageStore from '../stores/imagelist';

function RetrieveListings(response) {
    return ImageStore.updateState({images: response});
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
    fetch("https://i.genj.io/api/list", options).then((response) => response.json()).then(RetrieveListings).catch(function(error) {
        console.log(error);
    });
}

export default UpdateImageListings;
