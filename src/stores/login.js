import Store from './store';
var loginStore = new Store();

loginStore.updateState({
    username: '',
    password: '',
    loading: false,
    login: false,
    passwordModal: false,
    newPassword: '',
});

export default loginStore;
