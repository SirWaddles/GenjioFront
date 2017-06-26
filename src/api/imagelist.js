import LoginStore from '../stores/login';
import ImageStore from '../stores/imagelist';
import { GetLoginHeaders } from './login';

function GetQuickDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd='0'+dd
    }

    if(mm<10) {
        mm='0'+mm
    }

    today = yyyy+'-'+mm+'-'+dd;
    return today;
}

function RetrieveListings(response) {
    return ImageStore.updateState({images: response});
}

function UpdateImageListings() {
    var options = {
        method: 'GET',
        headers: GetLoginHeaders(),
    };
    fetch(gbl_endpoint + "/api/list", options).then((response) => response.json()).then(RetrieveListings).catch(function(error) {
        console.log(error);
    });
}

function DeleteImage(image) {
    var options = {
        method: 'POST',
        headers: Object.assign(GetLoginHeaders(), {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify({id: image.id}),
    };
    fetch(gbl_endpoint + "/api/delete", options).then((response) => response.json()).then(function(data) {
        if (data.success == true) {
            ImageStore.updateState({
                images: ImageStore.getState().images.filter((val) => val.id != image.id)
            });
        }
    }).catch(function(error) {
        console.log(error);
    })
}

export { DeleteImage };

function UploadFile(file) {
    var data = new FormData();
    data.append('form[uploadFile][file]', file);
    ImageStore.updateState({uploading: true});
    var uploadRequest = new XMLHttpRequest();
    uploadRequest.open('POST', gbl_endpoint + "/upload", true);
    var loginObj = LoginStore.getState();
    uploadRequest.setRequestHeader('Genjio-API-Key', loginObj.password);
    uploadRequest.setRequestHeader('Genjio-API-Username', loginObj.username);
    uploadRequest.addEventListener('progress', function(e) {
        if (!e.lengthComputable) return;
        ImageStore.updateState({uploadProgress: e.loaded / e.total});
    });
    uploadRequest.addEventListener('load', function(e) {
        var responseObj = JSON.parse(uploadRequest.responseText);
        var images = ImageStore.getState().images;
        images.unshift({
            id: responseObj.id,
            name: responseObj.filename,
            dateUploaded: GetQuickDate(),
        });
        ImageStore.updateState({
            images: images,
            uploading: false,
        })
    });
    uploadRequest.send(data);
}

export { UploadFile };

export default UpdateImageListings;
