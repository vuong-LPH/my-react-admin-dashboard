import { FC, ChangeEvent, useState } from 'react';
import { format } from 'date-fns';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import {
  Tooltip,
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Select,
  MenuItem,
  Typography,
  useTheme,
  CardHeader
} from '@mui/material';

import Label from 'src/components/Label';
import { User, UserStatus } from 'src/models/user';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BulkActions from './BulkActions';

interface UsersTableProps {
  className?: string;
  Users: User[];
}

interface Filters {
  status?: UserStatus;
}

const getStatusLabel = (UserStatus: UserStatus): JSX.Element => {
  const map = {
    failed: {
      text: 'Failed',
      color: 'error'
    },
    completed: {
      text: 'Completed',
      color: 'success'
    },
    pending: {
      text: 'Pending',
      color: 'warning'
    }
  };

  const { text, color }: any = map[UserStatus];

  return <Label color={color}>{text}</Label>;
};

const applyFilters = (
  Users: User[],
  filters: Filters
): User[] => {
  return Users.filter((User) => {
    let matches = true;

    if (filters.status && User.status !== filters.status) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  Users: User[],
  page: number,
  limit: number
): User[] => {
  return Users.slice(page * limit, page * limit + limit);
};

const UsersTable: FC<UsersTableProps> = ({ Users }) => {
  const [selectedUsers, setSelectedUsers] = useState<string[]>(
    []
  );
  const selectedBulkActions = selectedUsers.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [filters, setFilters] = useState<Filters>({
    status: null
  });

  const statusOptions = [
    {
      id: 'all',
      name: 'All'
    },
    {
      id: 'completed',
      name: 'Completed'
    },
    {
      id: 'pending',
      name: 'Pending'
    },
    {
      id: 'failed',
      name: 'Failed'
    }
  ];

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;

    if (e.target.value !== 'all') {
      value = e.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      status: value
    }));
  };

  const handleSelectAllUsers = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedUsers(
      event.target.checked
        ? Users.map((User) => User.id)
        : []
    );
  };

  const handleSelectOneUser = (
    event: ChangeEvent<HTMLInputElement>,
    UserId: string
  ): void => {
    if (!selectedUsers.includes(UserId)) {
      setSelectedUsers((prevSelected) => [
        ...prevSelected,
        UserId
      ]);
    } else {
      setSelectedUsers((prevSelected) =>
        prevSelected.filter((id) => id !== UserId)
      );
    }
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredUsers = applyFilters(Users, filters);
  const paginatedUsers = applyPagination(
    filteredUsers,
    page,
    limit
  );
  const selectedSomeUsers =
    selectedUsers.length > 0 &&
    selectedUsers.length < Users.length;
  const selectedAllUsers =
    selectedUsers.length === Users.length;
  const theme = useTheme();

  return (
    <Card>
      {selectedBulkActions && (
        <Box flex={1} p={2}>
          <BulkActions /> {/* sau khi click chon tat ca thi moi thay duoc chuc nang cua bulkAction */}
        </Box>
      )} 
      {!selectedBulkActions && (
        <CardHeader
          action={
            <Box width={150}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Status</InputLabel>
                <Select
                  value={filters.status || 'all'}
                  onChange={handleStatusChange}
                  label="Status"
                  autoWidth
                >
                  {statusOptions.map((statusOption) => (
                    <MenuItem key={statusOption.id} value={statusOption.id}>
                      {statusOption.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          }
          title="Users"
        />
      )}
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={selectedAllUsers}
                  indeterminate={selectedSomeUsers}
                  onChange={handleSelectAllUsers}
                />
              </TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell>EMAIL</TableCell>
              <TableCell>PHONE</TableCell>
              <TableCell align="right">ADDRESS</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedUsers.map((User) => {
              const isUserSelected = selectedUsers.includes(
                User.id
              );
              return (
                <TableRow
                  hover
                  key={User.id}
                  selected={isUserSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isUserSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneUser(event, User.id)
                      }
                      value={isUserSelected}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {User.fullName}
                    </Typography>
                    {/* <Typography variant="body2" color="text.secondary" noWrap>
                      {format(User.orderDate, 'MMMM dd yyyy')}
                    </Typography> */}
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {User.email}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {User.phone}
                    </Typography>
                    {/* <Typography variant="body2" color="text.secondary" noWrap>
                      {User.sourceDesc}
                    </Typography> */}
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {User.address}
                      {/* {User.cryptoCurrency} */}
                    </Typography>
                    {/* <Typography variant="body2" color="text.secondary" noWrap>
                      {numeral(User.amount).format(
                        `${User.currency}0,0.00`
                      )}
                    </Typography> */}
                  </TableCell>
                  <TableCell align="right">
                    {getStatusLabel(User.status)}
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit User" arrow>
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.colors.primary.lighter
                          },
                          color: theme.palette.primary.main
                        }}
                        color="inherit"
                        size="small"
                      >
                        <EditTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete User" arrow>
                      <IconButton
                        sx={{
                          '&:hover': { background: theme.colors.error.lighter },
                          color: theme.palette.error.main
                        }}
                        color="inherit"
                        size="small"
                      >
                        <DeleteTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={filteredUsers.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
    </Card>
  );
};

UsersTable.propTypes = {
  Users: PropTypes.array.isRequired
};

UsersTable.defaultProps = {
  Users: []
};

export default UsersTable;
