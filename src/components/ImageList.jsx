import React from 'react';
import StoreContainer from './Container';
import ImageStore from '../stores/imagelist';
import { UploadFile, DeleteImage } from '../api/imagelist';
import { Card, Image, Embed, Button, Header, Segment, Divider, Menu, Dimmer, Icon, Progress } from 'semantic-ui-react';

function getExtension(name) {
    var re = /(?:\.([^.]+))?$/;
    return re.exec(name)[1];
}

const ImageExtensions = ['png', 'jpeg', 'jpg', 'bmp', 'gif'];
const VideoExtensions = ['mp4', 'flv', 'avi'];
const TextExtensions = ['txt', 'html', 'xml', 'json'];
const IMAGES_PAGE_LENGTH = 16;

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
                    <Button basic color='red' onClick={this.handleDeleteFile.bind(this)}>Delete</Button>
                </Card.Content>
            </Card>
        )
    }

    handleDeleteFile(e) {
        DeleteImage(this.props.image);
    }
}

class ImageView extends React.Component {
    render() {
        var images = this.props.images.slice(this.props.page * IMAGES_PAGE_LENGTH, (this.props.page + 1) * IMAGES_PAGE_LENGTH);
        var pages = Math.ceil(this.props.images.length / IMAGES_PAGE_LENGTH);
        return (
            <div>
                <Segment padded>
                    <Card.Group itemsPerRow={4}>
                        {images.map((ele) => (<ImageIcon image={ele} />))}
                    </Card.Group>
                </Segment>
                <Segment padded>
                    {this.props.page > 0 && <Button content='Back' icon='left arrow' labelPosition='left' onClick={this.handleLeft.bind(this)} />}
                    {this.props.page < (pages - 1) && <Button content='Next' icon='right arrow' labelPosition='right' onClick={this.handleRight.bind(this)} />}
                </Segment>
                {React.createElement(UploadProgressDisplay, this.props)}
            </div>
        );
    }

    handleLeft(e) {
        ImageStore.updateState({page: this.props.page - 1});
    }

    handleRight(e) {
        ImageStore.updateState({page: this.props.page + 1});
    }
}

class UploadProgressDisplay extends React.Component {
    render() {
        if (!this.props.uploading) return <div />;

        return (
            <Dimmer active={true} page>
                <Header as='h2' icon inverted>
                    <Icon name='upload' />
                    <Progress percent={this.uploadProgress * 100} indicating />
                </Header>
            </Dimmer>
        );
    }
}

class ImageList extends React.Component {
    render() {
        return (
            <div>
                <Header as='h2' textAlign='center'>
                    <Image src='https://genj.io/genji.png' />
                    {' i.Genjio'}
                </Header>
                <Menu horizontal>
                    <Menu.Item name='Upload' icon='upload' onClick={this.handleUpload.bind(this)} />
                </Menu>
                <Divider horizontal />
                <StoreContainer store={ImageStore}>
                    <ImageView />
                </StoreContainer>
            </div>
        );
    }

    handleUpload(e) {
        var input = document.createElement('input');
        input.type = 'file';
        input.addEventListener('change', this.handleFileSelect.bind(this), false);
        input.click();
    }

    handleFileSelect(e) {
        UploadFile(e.target.files[0]);
    }
}

export default ImageList;