import React from 'react';
import StoreContainer from './Container';
import ImageStore from '../stores/imagelist';
import { Card, Image, Embed, Button } from 'semantic-ui-react';

function getExtension(name) {
    var re = /(?:\.([^.]+))?$/;
    return re.exec(name)[1];
}

const ImageExtensions = ['png', 'jpeg', 'jpg', 'bmp', 'gif'];
const VideoExtensions = ['mp4', 'flv', 'avi'];
const TextExtensions = ['txt', 'html', 'xml', 'json'];

class ImageIcon extends React.Component {
    render() {
        var extension = getExtension(this.props.image.name);
        var displayElement = false;
        var imageSource = "https://i.genj.io/i/" + this.props.image.name;
        if (ImageExtensions.indexOf(extension) != -1) {
            displayElement = (
                <Card.Content>
                    <a href={imageSource}>
                        <Image src={imageSource} floated='right' />
                    </a>
                </Card.Content>
            );
        }
        if (VideoExtensions.indexOf(extension) != -1) {
            displayElement = (
                <Card.Content>
                    <video controls muted className='videoplayer'>
                        <source src={imageSource} type="video/mp4" />
                    </video>
                </Card.Content>
            );
        }
        if (TextExtensions.indexOf(extension) != -1) {
            displayElement = (
                <Card.Content>
                    <Embed url={imageSource} icon='file text outline' />
                </Card.Content>
            );
        }
        if (displayElement == false) {
            displayElement = (
                <Card.Content>

                </Card.Content>
            );
        }
        return (
            <Card>
                {displayElement}
                <Card.Content>
                    <Card.Header>
                        <a href={imageSource}>{this.props.image.name}</a>
                    </Card.Header>
                    <p>{this.props.image.dateUploaded}</p>
                </Card.Content>
                <Card.Content extra>
                    <Button basic color='red'>Delete</Button>
                </Card.Content>
            </Card>
        )
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
