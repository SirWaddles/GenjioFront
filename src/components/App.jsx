import React from 'react';
import LoginForm from './LoginForm';
import ImageList from './ImageList';
import LoginStore from '../stores/login';
import StoreContainer from './Container';

class AppView extends React.Component {
    render() {
        if (this.props.login) {
            return (<ImageList />);
        } else {
            return (<LoginForm />);
        }
    }
}

class App extends React.Component {
    render() {
        return (
            <StoreContainer store={LoginStore}>
                <AppView />
            </StoreContainer>
        );
    }
}

export default App;
