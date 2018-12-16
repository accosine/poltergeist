import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FilePreview from './FilePreview';
import { withStyles } from '@material-ui/core/styles';

const styleSheet = {
  fileList: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};

class FileList extends Component {
  static propTypes = {
    files: PropTypes.arrayOf(PropTypes.object),
  };

  handleFileChange = (file, i) => newSettings => {
    this.props.onFilesChange([
      ...this.props.files.slice(0, i),
      { ...file, ...newSettings },
      ...this.props.files.slice(i + 1, this.props.files.length),
    ]);
  };

  handleFileRemove = i => () => {
    this.props.onFilesChange([
      ...this.props.files.slice(0, i),
      ...this.props.files.slice(i + 1, this.props.files.length),
    ]);
  };

  render() {
    const { files, classes } = this.props;

    if (files.length === 0) {
      return <div>Nothing to display</div>;
    }

    return (
      <div className={classes.fileList}>
        {files.map((file, i) => (
          <FilePreview
            key={file.nativeFile.name}
            file={file}
            onFileChange={this.handleFileChange(file, i)}
            onFileRemove={this.handleFileRemove(i)}
          />
        ))}
      </div>
    );
  }
}

export default withStyles(styleSheet)(FileList);
