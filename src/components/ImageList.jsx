import React from 'react';
import StoreContainer from './Container';
import ImageStore from '../stores/imagelist';
import { Card } from 'semantic-ui-react';

class ImageIcon extends React.Component {
    render() {
        return <Card raised image={"https://i.genj.io/i/" + this.props.image.name} header={this.props.image.name} description={this.props.image.dateUploaded} />;
    }
}

class ImageView extends React.Component {
    render() {
        return (
            <Card.Group itemsPerRow={6}>
                {this.props.images.map((ele) => (<ImageIcon image={ele} />))}
            </Card.Group>
        );
    }
}

class ImageList extends React.Component {
    render() {
        return (
            <StoreContainer store={ImageStore}>
                <ImageView />
            </StoreContainer>
        );
    }
}

export default ImageList;
