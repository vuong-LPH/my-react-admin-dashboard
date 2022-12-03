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
  CardHeader,
  // Modal,
  Button
} from '@mui/material';

import Label from 'src/components/Label';
// import { User, UserStatus } from 'src/models/user';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { Customer } from './Users';
import React from 'react';
import {
  useDelCustomerMutation,
  useUpdateCustomerMutation
} from 'src/generated';
import { number } from 'yup/lib/locale';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';
// import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { render } from 'react-dom';

interface UsersTableProps {
  className?: string;
  customers: Customer[];
}

interface Filters {
  status?: boolean;
}

const getStatusLabel = (UserStatus: boolean): JSX.Element => {
  const { text, color } = UserStatus
    ? {
        text: 'Still active',
        color: 'success'
      }
    : {
        text: 'Banned',
        color: 'error'
      };
  return <label color={color}>{text}</label>;
};

const applyFilters = (Users: Customer[], filters: Filters): Customer[] => {
  return Users.filter((Customer) => {
    let matches = true;

    // if (filters.status && User.status !== filters.status) {
    //   matches = false;
    // }

    return matches;
  });
};

const applyPagination = (
  Users: Customer[],
  page: number,
  limit: number
): Customer[] => {
  return Users.slice(page * limit, page * limit + limit);
};

const UsersTable: FC<UsersTableProps> = ({ customers }) => {
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(9999);
  const [filters, setFilters] = useState<Filters>({
    status: null
  });

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

  const handleSelectAllUsers = (event: ChangeEvent<HTMLInputElement>): void => {
    // setSelectedUsers(
    //   event.target.checked
    //     ? Users.map((Customer) => User.id)
    //     : []
    // );
  };

  const handleSelectOneUser = (
    event: ChangeEvent<HTMLInputElement>,
    UserId: number
  ): void => {
    if (!selectedUsers.includes(UserId)) {
      // setSelectedUsers((prevSelected) => [
      //   ...prevSelected,
      //   UserId
      // ]);
    } else {
      // setSelectedUsers((prevSelected) =>
      //   prevSelected.filter((id) => id !== UserId)
      // );
    }
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredUsers = applyFilters(customers, filters);
  const paginatedUsers = applyPagination(filteredUsers, page, limit);
  const selectedSomeUsers =
    selectedUsers.length > 0 && selectedUsers.length < customers.length;
  const selectedAllUsers = selectedUsers.length === customers.length;
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Card>
        <CardHeader action={<Box width={150}></Box>} title="Customers" />
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {/* <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={selectedAllUsers}
                  indeterminate={selectedSomeUsers}
                  onChange={handleSelectAllUsers}
                />
              </TableCell> */}
              <TableCell>ID</TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell>EMAIL</TableCell>
              <TableCell>PHONE</TableCell>
              <TableCell align="right">ADDRESS</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedUsers.map((customer) => {
              const isUserSelected = selectedUsers.includes(
                customer.customer_id
              );

              //confirm yes/no for delete
              const submit = () => {
                confirmAlert({
                  title: 'Are you sure?',
                  message: 'Are you sure to delete this Customer?',
                  buttons: [
                    {
                      label: 'Yes',
                      // neu co can chinh lai delete thi cop tu async xuong toi het trong ngoac cua label yes vao phan delete ben duoi
                      onClick: async () => {
                        deleteFunction({
                          variables: {
                            object: {
                              active: false
                            },
                            where: {
                              customer_id: {
                                _eq: customer.customer_id
                              }
                            }
                          }
                        });
                        alert('Successfully delete the Customer.');
                        window.location.href="/dashboards/user";
                      },
                    },
                    {
                      label: 'No',
                      onClick: () => close,
                    }
                  ]
                });
              };

              //delete
              const [deleteFunction, { data: deleteResult }] =
                useDelCustomerMutation();
              // const deleteCustomer = async () => {
              //   deleteFunction({
              //     variables: {
              //       object: {
              //         active: false
              //       },
              //       where: {
              //         customer_id: {
              //           _eq: customer.customer_id
              //         }
              //       }
              //     }
              //   });
              // };
              console.log(typeof deleteResult);

              //update
              const [update, { data: editResult }] =
                useUpdateCustomerMutation();
              const updateCustomer = () => {
                navigate(`/dashboards/editcustomer/${customer.customer_id}`);
              };
              console.log(typeof editResult);

              return (
                <>
                  <TableRow
                    hover
                    key={customer.customer_id}
                    selected={isUserSelected}
                  >
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {customer.customer_id}
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
                        {customer.fullname}
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
                        {customer.email}
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
                        {customer.phone}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {customer.address}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      {getStatusLabel(customer.active)}
                    </TableCell>
                    <TableCell align="right">
                      {/* <Tooltip title="Edit User" arrow>
      <IconButton
        onClick={updateCustomer}
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
    </Tooltip> */}
                      <Tooltip title="Delete User" arrow>
                          <IconButton
                            onClick={submit}
                            sx={{
                              '&:hover': {
                                background: theme.colors.error.lighter
                              },
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
                </>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <Box p={2}>
        <TablePagination
          component="div"
          count={filteredUsers.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box> */}
    </Card>
  );
};

UsersTable.propTypes = {
  customers: PropTypes.array.isRequired
};

UsersTable.defaultProps = {
  customers: []
};

export default UsersTable;
