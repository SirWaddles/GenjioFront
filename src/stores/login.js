import Store from './store';
var loginStore = new Store();

loginStore.updateState({
    username: '',
    password: '',
    loading: false,
    login: false,
});

export default loginStore;
