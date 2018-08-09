import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FilePreview from './FilePreview';
import { withStyles } from 'material-ui/styles';

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

  list(files) {
    return files.map(file => {
      console.log(file);
      return <FilePreview key={file.name} file={file} />;
    });
  }

  render() {
    const { files, classes } = this.props;

    if (files.length === 0) {
      return <div>Nothing to display</div>;
    }

    return <div className={classes.fileList}>{this.list(files)}</div>;
  }
}

export default withStyles(styleSheet)(FileList);
