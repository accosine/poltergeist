import React, { useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import CreateIcon from '@material-ui/icons/Create';
import { makeStyles } from '@material-ui/styles';

import StaffUsers from './StaffUsers';
import WaitingUsers from './WaitingUsers';
import WaitingUserDialog from './WaitingUserDialog';
import PendingUsers from './PendingUsers';
import FixedButton from '../FixedButton';
import {
  useFirebaseContext,
  useFirestoreCollectionSubscription,
} from '../../firebase';

const useStyles = makeStyles(theme => ({
  tabContainer: {
    padding: theme.spacing.unit * 3,
    overflow: 'scroll',
    width: '100%',
  },
  root: {
    marginTop: 2 * theme.spacing.unit,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
}));

// TODO: confirmations for delete dialogs
// TODO: create new entries via plus symbol in new line

const TabContainer = props => {
  const classes = useStyles();
  return <div className={classes.tabContainer}>{props.children}</div>;
};

const Users = () => {
  const classes = useStyles();
  const [tabId, setTabId] = useState(0);
  const [waitingUserOpen, setWaitingUserOpen] = useState(false);
  const { firestore } = useFirebaseContext();
  const [staffusers, loadingStaff] = useFirestoreCollectionSubscription(
    'staffusers'
  );
  const [waitingusers, loadingWaiting] = useFirestoreCollectionSubscription(
    'waitingusers'
  );
  const [pendingusers, loadingPending] = useFirestoreCollectionSubscription(
    'pendingusers'
  );

  // TODO: handle loading state (disable save button) and errors
  const handleCreateWaiting = async ({ email, role }) => {
    await firestore
      .collection('waitingusers')
      .doc(email)
      .set({ role });
    setWaitingUserOpen(false);
  };

  const handleStaffUserChange = ({ id, ...user }) =>
    firestore
      .collection('staffusers')
      .doc(id)
      .set(user);

  const handleDeleteStaffUser = ({ id }) =>
    firestore
      .collection('staffusers')
      .doc(id)
      .delete();

  const handleDeleteWaitingUser = ({ id }) =>
    firestore
      .collection('waitingusers')
      .doc(id)
      .delete();

  const handleAcceptUser = async ({ id, email }) => {
    await firestore
      .collection('staffusers')
      .doc(id)
      .set({ email, role: 'editor' });
    await firestore
      .collection('pendingusers')
      .doc(id)
      .delete();
  };

  return (
    <div className={classes.root}>
      <Tabs value={tabId} onChange={(event, value) => setTabId(value)}>
        <Tab label="Staff" />
        <Tab label="Waiting" />
        <Tab label="Pending" />
      </Tabs>

      {tabId === 0 ? (
        <TabContainer>
          {loadingStaff ? (
            <CircularProgress />
          ) : staffusers.length ? (
            <StaffUsers
              users={staffusers}
              onUserChange={handleStaffUserChange}
              onDeleteUser={handleDeleteStaffUser}
            />
          ) : (
            <Typography>No users. Impossible. Who are you?</Typography>
          )}
        </TabContainer>
      ) : null}

      {tabId === 1 ? (
        <TabContainer>
          {loadingWaiting ? (
            <CircularProgress />
          ) : waitingusers.length ? (
            <WaitingUsers
              users={waitingusers}
              onDeleteUser={handleDeleteWaitingUser}
            />
          ) : (
            <Typography>No waiting users.</Typography>
          )}
        </TabContainer>
      ) : null}

      {tabId === 2 ? (
        <TabContainer>
          {loadingPending ? (
            <CircularProgress />
          ) : pendingusers.length ? (
            <PendingUsers
              users={pendingusers}
              onAcceptUser={handleAcceptUser}
            />
          ) : (
            <Typography>No pending users.</Typography>
          )}
        </TabContainer>
      ) : null}

      {tabId === 1 ? (
        <FixedButton onClick={() => setWaitingUserOpen(true)} position="right">
          <CreateIcon />
        </FixedButton>
      ) : null}
      <WaitingUserDialog
        open={waitingUserOpen}
        onClose={() => setWaitingUserOpen(false)}
        onSubmit={handleCreateWaiting}
      />
    </div>
  );
};

export default Users;
