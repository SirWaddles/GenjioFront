import React from 'react';
import LoginForm from './LoginForm';
import ImageList from './ImageList';
import LoginStore from '../stores/login';
import StoreContainer from './Container';
import { Container } from 'semantic-ui-react';

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
            <Container className='fullHeight'>
                <StoreContainer store={LoginStore}>
                    <AppView />
                </StoreContainer>
            </Container>
        );
    }
}

export default App;
