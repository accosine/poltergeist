import React from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import config from '../config';

const Home = props => (
  <ExpansionPanel defaultExpanded={false}>
    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
      <Typography variant="body1">Config</Typography>
    </ExpansionPanelSummary>
    <Divider />
    <ExpansionPanelDetails>
      <pre>{JSON.stringify(config, null, 2)}</pre>
    </ExpansionPanelDetails>
  </ExpansionPanel>
);

export default Home;
