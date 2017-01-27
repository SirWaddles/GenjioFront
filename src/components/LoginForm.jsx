import React from 'react';
import { Grid, Form } from 'semantic-ui-react';

class LoginForm extends React.Component {
    render() {
        return (
            <Form size='large'>
                <Form.Field icon='user' iconPosition='left' fluid>
                    <label>Username</label>
                    <input icon='user' iconPosition='left' fluid />
                </Form.Field>
                <Form.Group>
                    <Form.Input label='Password' type='password' icon='lock' iconPosition='left' fluid />
                </Form.Group>
                <Form.Group>
                    <Form.Button>Submit</Form.Button>
                </Form.Group>
            </Form>
        );
    }
}

class LoginContainer extends React.Component {
    render() {
        return (
            <Grid verticalAlign='middle' columns={4} centered>
                <Grid.Column>
                    <LoginForm />
                </Grid.Column>
            </Grid>
        );
    }
}

export default LoginContainer;
