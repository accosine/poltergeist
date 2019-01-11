import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const WaitingUsers = ({ users, onDeleteUser }) => (
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Email</TableCell>
        <TableCell>Role</TableCell>
        <TableCell />
      </TableRow>
    </TableHead>
    <TableBody>
      {users.map(user => {
        return (
          <TableRow key={user.id}>
            <TableCell>{user.id}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell>
              <IconButton onClick={() => onDeleteUser(user)}>
                <DeleteIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  </Table>
);

export default WaitingUsers;
