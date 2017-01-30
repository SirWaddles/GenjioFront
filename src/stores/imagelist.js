import Store from './store';
var imageStore = new Store();

imageStore.updateState({
    loading: false,
    images: [],
});

export default imageStore;
