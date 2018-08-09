import React from 'react';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import ExpansionPanel, {
  ExpansionPanelDetails,
  ExpansionPanelSummary,
} from 'material-ui/ExpansionPanel';
import Divider from 'material-ui/Divider';
import Typography from 'material-ui/Typography';

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
