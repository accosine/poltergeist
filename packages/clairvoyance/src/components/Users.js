import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FixedButton from './FixedButton';
import { CircularProgress } from 'material-ui/Progress';
import Tabs, { Tab } from 'material-ui/Tabs';
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from 'material-ui/Table';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import connectFirebase from '../util/connect-firebase';
import CreateIcon from 'material-ui-icons/Create';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';

class WaitingUserDialog extends Component {
  state = {
    email: '',
    role: 'editor',
  };

  handleEmailChange = event =>
    this.setState({
      email: event.target.value,
    });

  handleRoleChange = event =>
    this.setState({
      role: event.target.value,
    });

  render() {
    const { open, onClose, onSubmit } = this.props;

    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Add user to waitlist</DialogTitle>
        <DialogContent>
          <DialogContentText>asdlkfjadslkf</DialogContentText>
          <TextField
            value={this.state.email}
            onChange={this.handleEmailChange}
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
          />
          <FormControl>
            <InputLabel htmlFor="role">Role</InputLabel>
            <Select
              value={this.state.role}
              onChange={this.handleRoleChange}
              inputProps={{
                name: 'role',
                id: 'role',
              }}
            >
              <MenuItem value="editor">Editor</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => onSubmit(this.state)} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const TabContainer = props => (
  <Typography component="div" style={{ padding: 8 * 3 }}>
    {props.children}
  </Typography>
);

const styleSheet = theme => ({
  root: {
    marginTop: 2 * theme.spacing.unit,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
});

class Users extends Component {
  state = {
    tabId: 0,
    staffusers: [],
    loadingStaff: true,
    pendingusers: [],
    loadingPending: true,
    waitingusers: [],
    loadingWaiting: true,
    waitingUserOpen: false,
  };

  componentDidMount() {
    this.firestoreUnsubscribeStaffusers = this.props.firebase.firestore
      .collection('staffusers')
      .onSnapshot(snapshot => {
        this.setState({
          staffusers: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })),
          loadingStaff: false,
        });
      });
    this.firestoreUnsubscribeWaitingusers = this.props.firebase.firestore
      .collection('waitingusers')
      .onSnapshot(snapshot => {
        this.setState({
          waitingusers: snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          })),
          loadingWaiting: false,
        });
      });
    this.firestoreUnsubscribePendingusers = this.props.firebase.firestore
      .collection('pendingusers')
      .onSnapshot(snapshot => {
        this.setState({
          pendingusers: snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          })),
          loadingPending: false,
        });
      });
  }

  openDialog = () => {
    if (this.state.tabId === 1) {
      this.setState({
        waitingUserOpen: true,
      });
    }
  };

  // TODO: handle loading state (disable save button) and errors
  handleCreateWaiting = ({ email, role }) => {
    this.props.firebase.firestore
      .collection('waitingusers')
      .doc(email)
      .set({ role })
      .then(() => {
        this.setState({ waitingUserOpen: false });
      });
  };

  componentWillUnmount() {
    // Remove database change listeners
    this.firestoreUnsubscribeStaffusers();
    this.firestoreUnsubscribeWaitingusers();
    this.firestoreUnsubscribePendingusers();
  }

  render() {
    const { classes } = this.props;
    const {
      tabId,
      staffusers,
      pendingusers,
      waitingusers,
      loadingStaff,
      loadingPending,
      loadingWaiting,
      waitingUserOpen,
    } = this.state;

    return (
      <div className={classes.root}>
        <Tabs
          value={tabId}
          onChange={(event, value) => this.setState({ tabId: value })}
        >
          <Tab label="Staff" />
          <Tab label="Waiting" />
          <Tab label="Pending" />
        </Tabs>

        {tabId === 0 ? (
          <TabContainer>
            {loadingStaff ? (
              <CircularProgress />
            ) : staffusers.length ? (
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Role</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {staffusers.map(user => {
                    return (
                      <TableRow key={user.id}>
                        <TableCell>{user.id}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.role}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            ) : (
              <Typography>No users.</Typography>
            )}
          </TabContainer>
        ) : null}

        {tabId === 1 ? (
          <TabContainer>
            {loadingWaiting ? (
              <CircularProgress />
            ) : waitingusers.length ? (
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>Email</TableCell>
                    <TableCell>Role</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {waitingusers.map(user => {
                    return (
                      <TableRow key={user.id}>
                        <TableCell>{user.id}</TableCell>
                        <TableCell>{user.role}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            ) : (
              <Typography>No waiting users.</Typography>
            )}
          </TabContainer>
        ) : null}

        {tabId === 2 ? (
          <TabContainer>
            {loadingPending ? (
              <CircularProgress />
            ) : (
              <pre>{JSON.stringify(pendingusers, null, 2)}</pre>
            )}
          </TabContainer>
        ) : null}

        {tabId === 1 ? (
          <FixedButton onClick={this.openDialog} position="right">
            <CreateIcon />
          </FixedButton>
        ) : null}
        <WaitingUserDialog
          open={waitingUserOpen}
          onClose={() => this.setState({ waitingUserOpen: false })}
          onSubmit={this.handleCreateWaiting}
        />
      </div>
    );
  }
}

Users.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(connectFirebase(Users));
