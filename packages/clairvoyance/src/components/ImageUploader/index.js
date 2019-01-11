import React, { Component } from 'react';
import { DragDropContext, DragDropContextProvider } from 'react-dnd';
import HTML5Backend, { NativeTypes } from 'react-dnd-html5-backend';
import TargetBox from './TargetBox';
import FileList from './FileList';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';
import { FirebaseContext } from '../../firebase';

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
  static contextType = FirebaseContext;
  constructor(props) {
    super(props);

    this.state = {
      droppedFiles: [],
      upload: 0,
      isUploading: false,
    };
  }

  uploadFiles = () => {
    const { firestore, storage } = this.context;
    const { droppedFiles } = this.state;

    this.setState({ isUploading: true }, () => {
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

      droppedFiles.forEach(
        async ({
          nativeFile,
          name,
          attribution,
          caption,
          alttext,
          width,
          height,
          tags,
        }) => {
          // Get a ref for a new image
          const imageRef = firestore.collection('images').doc();

          try {
            await storageRef
              .child(`${name}` + timestamp + fileext(nativeFile.type))
              .put(nativeFile, {
                customMetadata: {
                  dbkey: imageRef.id,
                  shouldResize: true,
                },
              });

            incrementUpload(() => {
              switchTabIfReady(1, droppedFiles.length);
            });

            imageRef.set({
              name: name + timestamp + fileext(nativeFile.type),
              attribution,
              caption,
              alt: alttext,
              width,
              height,
              tags: tags.reduce((tags, tag) => ({ ...tags, [tag]: true }), {}),
            });
          } catch (error) {
            console.log(error);
          }
        }
      );
    });
  };

  handleFileDrop = (item, monitor) => {
    if (monitor) {
      const droppedFiles = monitor
        .getItem()
        .files.map(nativeFile => ({ nativeFile }));
      this.setState({ droppedFiles });
    }
  };

  handleFilesChange = droppedFiles => {
    this.setState({ droppedFiles });
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
          <FileList
            files={droppedFiles}
            onFilesChange={this.handleFilesChange}
          />
          <div className={classes.wrapper}>
            <Fab
              disabled={
                !hasFiles ||
                isUploading ||
                !droppedFiles.every(
                  file =>
                    file.name &&
                    file.alttext &&
                    file.attribution &&
                    file.caption &&
                    file.tags &&
                    file.tags.length
                )
              }
              onClick={this.uploadFiles}
              className={classes.savebutton}
            >
              <SaveIcon />
            </Fab>
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
  DragDropContext(HTML5Backend)(ImageUploader)
);
