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
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { Manager } from './Managers';
import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useDelManagerMutation, useUpdateManagerMutation } from 'src/generated';
import Staff from '../Staff';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

interface ManagersTableProps {
  className?: string;
  Managers: Manager[];
}

interface Filters {
  status?: boolean;
}

const getStatusLabel = (ManagerStatus: boolean): JSX.Element => {
  const { text, color } = ManagerStatus
    ? {
        text: 'Still active',
        color: 'success'
      }
    : {
        text: 'Banned',
        color: 'eror'
      };
  return <label color={color}>{text}</label>;
};

const applyFilters = (Managers: Manager[], filters: Filters): Manager[] => {
  return Managers.filter((Manager) => {
    let matches = true;

    return matches;
  });
};

const applyPagination = (
  Managers: Manager[],
  page: number,
  limit: number
): Manager[] => {
  return Managers.slice(page * limit, page * limit + limit);
};

const ManagersTable: FC<ManagersTableProps> = ({ Managers }) => {
  const { state } = useLocation();
  const [selectedManagers, setselectedManagers] = useState<number[]>([]);
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(9999);
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

  const handleSelectAllManagers = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {};

  const handleSelectOneManager = (
    event: ChangeEvent<HTMLInputElement>,
    ManagerId: number
  ): void => {
    if (!selectedManagers.includes(ManagerId)) {
      // setselectedManagers((prevSelected) => [
      //   ...prevSelected,
      //   ManagerId
      // ]);
    } else {
      // setselectedManagers((prevSelected) =>
      //   prevSelected.filter((id) => id !== ManagerId)
      // );
    }
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredManagers = applyFilters(Managers, filters);
  const paginatedManagers = applyPagination(filteredManagers, page, limit);
  const selectedSomeManagers =
    selectedManagers.length > 0 && selectedManagers.length < Managers.length;
  const selectedAllManagers = selectedManagers.length === Managers.length;
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader action={<Box width={150}></Box>} title="Managers" />
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell>EMAIL</TableCell>
              <TableCell>PASSWORD</TableCell>
              <TableCell align="right">PHONE</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">VENDOR</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedManagers.map((Manager) => {
              const isManagerSelected = selectedManagers.includes(
                Manager.manager_id
              );

              //confirm yes/no for delete
              const submit = () => {
                confirmAlert({
                  title: 'Are you sure?',
                  message: 'Are you sure to delete this Manager?',
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
                              manager_id: {
                                _eq: Manager.manager_id
                              }
                            }
                          }
                        });
                        alert('Successfully delete the Manager.');
                        window.location.href = '/dashboards/manager';
                      }
                    },
                    {
                      label: 'No',
                      onClick: () => close
                    }
                  ]
                });
              };

              //delete
              const [deleteFunction, { data: deleteResult }] =
                useDelManagerMutation();
              // const deleteManager = async () => {
              //   deleteFunction({
              //     variables: {
              //       object: {
              //         active: false
              //       },
              //       where: {
              //         manager_id: {
              //           _eq: Manager.manager_id
              //         }
              //       }
              //     }
              //   });
              // };
              console.log(typeof deleteResult);

              //update
              const [update, { data: editResult }] = useUpdateManagerMutation();
              const updateManager = () => {
                navigate(`/dashboards/editmanager/${Manager.manager_id}`);
              };
              console.log(typeof editResult);

              return (
                <TableRow
                  hover
                  key={Manager.manager_id}
                  selected={isManagerSelected}
                >
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {Manager.manager_id}
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
                      {Manager.fullname}
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
                      {Manager.email}
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
                      {Manager.password}
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
                      {Manager.phone}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    {getStatusLabel(Manager.active)}
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {Manager.vendor_id}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit User" arrow>
                      <IconButton
                        onClick={updateManager}
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
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <Box p={2}>
        <TablePagination
          component="div"
          count={filteredManagers.length}
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

ManagersTable.propTypes = {
  Managers: PropTypes.array.isRequired
};

ManagersTable.defaultProps = {
  Managers: []
};

export default ManagersTable;
