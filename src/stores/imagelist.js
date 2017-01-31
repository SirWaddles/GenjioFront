import Store from './store';
var imageStore = new Store();

imageStore.updateState({
    loading: false,
    images: [],
    page: 0,
});

export default imageStore;
