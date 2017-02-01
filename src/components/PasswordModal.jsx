import React from 'react';
import { Modal } from 'semantic-ui-react';

class PasswordModal extends React.Component {
    render() {
        if (!this.props.passwordModal) return <div />;
        return (
            <Modal open={true}>
                <Modal.Header>Change your Password</Modal.Header>
                <Modal.Content>
                    <p>Change your Password</p>
                </Modal.Content>
            </Modal>
        );
    }
}

export default PasswordModal;
