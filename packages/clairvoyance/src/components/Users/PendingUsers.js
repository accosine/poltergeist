import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';

const WaitingUsers = ({ users, onAcceptUser }) => (
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>ID</TableCell>
        <TableCell>Email</TableCell>
        <TableCell>Accept</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {users.map(user => {
        return (
          <TableRow key={user.id}>
            <TableCell>{user.id}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>
              <IconButton onClick={() => onAcceptUser(user)}>
                <AddIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  </Table>
);

export default WaitingUsers;
