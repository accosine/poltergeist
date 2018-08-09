import React, { Component } from 'react';
import { DragDropContext, DragDropContextProvider } from 'react-dnd';
import HTML5Backend, { NativeTypes } from 'react-dnd-html5-backend';
import TargetBox from './TargetBox';
import FileList from './FileList';
import { CircularProgress } from 'material-ui/Progress';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import SaveIcon from 'material-ui-icons/Save';
import connectFirebase from '../../util/connect-firebase';

const styleSheet = {
  savebutton: {
    position: 'absolute',
  },
  wrapper: {
    position: 'relative',
  },
  progress: {
    top: -2,
    left: -2,
    position: 'absolute',
  },
};

class ImageUploader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      droppedFiles: [],
      upload: 0,
      isUploading: false,
    };
  }

  uploadFiles = files => {
    const { firebase: { firestore, storage } } = this.props;
    this.setState({ isUploading: true });
    const timestamp = Date.now();
    const incrementUpload = cb =>
      this.setState({ upload: this.state.upload + 1 }, cb);
    const switchTabIfReady = (tabnumber, arrlength) => {
      if (this.state.upload === arrlength) {
        this.props.switchTab(null, tabnumber);
      }
    };
    const fileext = type => {
      let extension;
      switch (type) {
        case 'image/jpeg':
          extension = '.jpg';
          break;
        case 'image/gif':
          extension = '.gif';
          break;
        case 'image/png':
          extension = '.png';
          break;
        default:
      }
      return extension;
    };
    const storageRef = storage.ref();

    files.map(file => {
      // Get a ref for a new image
      var newImageRef = firestore.collection('images').doc();

      return storageRef
        .child(`${file.newname}` + timestamp + fileext(file.type))
        .put(file, { customMetadata: { dbkey: newImageRef.id } })
        .then(function(snapshot) {
          incrementUpload(() => {
            switchTabIfReady(1, files.length);
          });
          newImageRef.set({
            name: file.newname + timestamp + fileext(file.type),
            attribution: file.newattribution,
            caption: file.newcaption,
            alt: file.newalttext,
            width: file.width,
            height: file.height,
            tags: file.tags.reduce(
              (tags, tag) => ({ ...tags, [tag]: true }),
              {}
            ),
          });
        })
        .catch(console.log);
    });
  };

  handleFileDrop = (item, monitor) => {
    if (monitor) {
      const droppedFiles = monitor.getItem().files;
      this.setState({ droppedFiles });
    }
  };

  render() {
    const { FILE } = NativeTypes;
    const { droppedFiles, isUploading } = this.state;
    const { classes } = this.props;

    const hasFiles = droppedFiles.length > 0;

    return (
      <DragDropContextProvider backend={HTML5Backend}>
        <div>
          <TargetBox accepts={[FILE]} onDrop={this.handleFileDrop} />
          <FileList files={droppedFiles} />
          <div className={classes.wrapper}>
            <Button
              disabled={!hasFiles || isUploading}
              onClick={() => this.uploadFiles(droppedFiles)}
              variant="fab"
              className={classes.savebutton}
            >
              <SaveIcon />
            </Button>
            {isUploading && (
              <CircularProgress size={60} className={classes.progress} />
            )}
          </div>
        </div>
      </DragDropContextProvider>
    );
  }
}
export default withStyles(styleSheet)(
  DragDropContext(HTML5Backend)(connectFirebase(ImageUploader))
);
