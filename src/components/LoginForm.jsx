import React from 'react';
import StoreContainer from './Container';
import LoginStore from '../stores/login';
import { Grid, Form, Input, Button, Header, Image } from 'semantic-ui-react';
import TestLoginInformation from '../api/login';

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
        TestLoginInformation();
    }
}

class LoginHeader extends React.Component {
    render() {
        const pharah1Style = {
            color: "#fcc000",
        };
        const pharah2Style = {
            color: "#1e67c5",
        };
        const dotStyle = {
            color: "#2c2e34",
        }
        var imgUrl = "https://genj.io/genji.png";
        var hText = "i.Genjio";
        if (window.location.hostname == 'pharah.airforce') {
            imgUrl = "https://pharah.airforce/pharah.svg";
            hText = (
                <span>
                    <span style={pharah2Style}> Pharah</span>
                    <span style={dotStyle}>.</span>
                    <span style={pharah1Style}>Airforce</span>
                </span>
            );
        }
        return (
            <Header as='h2' textAlign='center'>
                <Image width='100' height='100' src={imgUrl} />
                {hText}
            </Header>
        );
    }
}

class LoginContainer extends React.Component {
    render() {
        return (
            <Grid verticalAlign='middle' columns={2} centered className='fullHeight'>
                <Grid.Column>
                    <LoginHeader />
                    <StoreContainer store={LoginStore}>
                        <LoginForm />
                    </StoreContainer>
                </Grid.Column>
            </Grid>
        );
    }
}

export default LoginContainer;
