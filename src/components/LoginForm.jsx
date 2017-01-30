import React from 'react';
import StoreContainer from './Container';
import LoginStore from '../stores/login';
import { Grid, Form, Input, Button } from 'semantic-ui-react';
import TestLoginInformation from '../api/login';
import UpdateImageListings from '../api/imagelist';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.loading) {
            return (<div><p>Loading</p></div>);
        }
        return (
            <Form size='large'>
                <Form.Field>
                    <label>Username</label>
                    <Input icon='user' iconPosition='left' fluid onChange={this.handleUsernameChange.bind(this)} value={this.props.username} />
                </Form.Field>
                <Form.Field>
                    <label>Password</label>
                    <Input icon='lock' iconPosition='left' type='password' fluid onChange={this.handlePasswordChange.bind(this)} value={this.props.password} />
                </Form.Field>
                <Form.Group>
                    <Button fluid onClick={this.handleSubmit.bind(this)}>Submit</Button>
                </Form.Group>
            </Form>
        );
    }

    handleUsernameChange(e) {
        LoginStore.updateState({username: e.target.value});
    }

    handlePasswordChange(e) {
        LoginStore.updateState({password: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        LoginStore.updateState({loading: true});
        TestLoginInformation((response) => {
            if (response.status == 200) {
                LoginStore.updateState({loading: false, login: true});
                UpdateImageListings();
            } else {
                LoginStore.updateState({loading: false, login: false});
            }
        });
    }
}

class LoginContainer extends React.Component {
    render() {
        return (
            <Grid verticalAlign='middle' columns={4} centered>
                <Grid.Column>
                    <StoreContainer store={LoginStore}>
                        <LoginForm />
                    </StoreContainer>
                </Grid.Column>
            </Grid>
        );
    }
}

export default LoginContainer;
