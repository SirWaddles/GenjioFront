import React from 'react';
import LoginStore from '../stores/login';
import { Modal, Input, Button } from 'semantic-ui-react';
import { ChangePassword } from '../api/login';

class PasswordModal extends React.Component {
    render() {
        if (!this.props.passwordModal) return <div />;
        return (
            <Modal onClose={this.handleClose.bind(this)} open={true} basic>
                <Modal.Header>Change your Password</Modal.Header>
                <Modal.Content>
                    <p>Enter your new password</p>
                    <Input icon='lock' type='password' value={this.props.newPassword} onChange={e => LoginStore.updateState({newPassword: e.target.value})} fluid />
                </Modal.Content>
                <Modal.Actions>
                    <Button positive icon='checkmark' labelPosition='right' content='Submit' onClick={this.handleChangePassword.bind(this)} />
                </Modal.Actions>
            </Modal>
        );
    }

    handleChangePassword(e) {
        ChangePassword(this.props.newPassword);
        this.handleClose(e);
    }

    handleClose(e) {
        LoginStore.updateState({passwordModal: false, newPassword: ''});
    }
}

export default PasswordModal;
