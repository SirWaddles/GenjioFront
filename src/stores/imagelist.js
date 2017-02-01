import Store from './store';
var imageStore = new Store();

imageStore.updateState({
    loading: false,
    images: [],
    page: 0,
    uploadProgress: 0,
    uploading: false,
});

export default imageStore;
