import React from 'react';
import LoginForm from './LoginForm';
import ImageList from './ImageList';
import LoginStore from '../stores/login';
import StoreContainer from './Container';
import { Container } from 'semantic-ui-react';
import PasswordModal from './PasswordModal';

class AppView extends React.Component {
    render() {
        if (this.props.login) {
            return (
                <div>
                    <ImageList />
                    {React.createElement(PasswordModal, this.props)}
                </div>
            );
        } else {
            return (<LoginForm />);
        }
    }
}

class App extends React.Component {
    render() {
        return (
            <Container className='fullHeight'>
                <StoreContainer store={LoginStore}>
                    <AppView />
                </StoreContainer>
            </Container>
        );
    }
}

export default App;
