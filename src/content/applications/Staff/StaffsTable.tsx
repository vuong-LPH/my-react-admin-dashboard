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
import { Staff } from './Staffs';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDelStaffMutation, useUpdateStaffMutation } from 'src/generated';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

interface StaffsTableProps {
  className?: string;
  Staffs: Staff[];
}

interface Filters {
  status?: boolean;
}

const getStatusLabel = (StaffStatus: boolean): JSX.Element => {
  const { text, color } = StaffStatus
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

const applyFilters = (Staffs: Staff[], filters: Filters): Staff[] => {
  return Staffs.filter((Staff) => {
    let matches = true;

    return matches;
  });
};

const applyPagination = (
  Staffs: Staff[],
  page: number,
  limit: number
): Staff[] => {
  return Staffs.slice(page * limit, page * limit + limit);
};

const StaffsTable: FC<StaffsTableProps> = ({ Staffs }) => {
  const [selectedStaffs, setselectedStaffs] = useState<number[]>([]);
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

  const handleSelectAllStaffs = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {};

  const handleSelectOneStaff = (
    event: ChangeEvent<HTMLInputElement>,
    StaffId: number
  ): void => {
    if (!selectedStaffs.includes(StaffId)) {
      // setselectedStaffs((prevSelected) => [
      //   ...prevSelected,
      //   StaffId
      // ]);
    } else {
      // setselectedStaffs((prevSelected) =>
      //   prevSelected.filter((id) => id !== StaffId)
      // );
    }
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredStaffs = applyFilters(Staffs, filters);
  const paginatedStaffs = applyPagination(filteredStaffs, page, limit);
  const selectedSomeStaffs =
    selectedStaffs.length > 0 && selectedStaffs.length < Staffs.length;
  const selectedAllStaffs = selectedStaffs.length === Staffs.length;
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader action={<Box width={150}></Box>} title="Staffs" />
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {/* <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={selectedAllStaffs}
                  indeterminate={selectedSomeStaffs}
                  onChange={handleSelectAllStaffs}
                />
              </TableCell> */}
              <TableCell>ID</TableCell>
              <TableCell>ROLE</TableCell>
              <TableCell>FULL NAME</TableCell>
              <TableCell>EMAIL</TableCell>
              <TableCell>PHONE</TableCell>
              <TableCell align="right">STATUS</TableCell>
              <TableCell align="right">MANAGER</TableCell>
              <TableCell align="right">VENDOR</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedStaffs.map((Staff) => {
              const isStaffSelected = selectedStaffs.includes(Staff.staff_id);

              //confirm yes/no for delete
              const submit = () => {
                confirmAlert({
                  title: 'Are you sure?',
                  message: 'Are you sure to delete this Staff?',
                  buttons: [
                    {
                      label: 'Yes',
                      // neu co can chinh lai delete thi cop tu async xuong toi het trong ngoac cua label yes vao phan delete ben duoi
                      onClick: async () => {
                        deleteFunction({
                          variables: {
                            object: {
                              working_status: false
                            },
                            where: {
                              staff_id: {
                                _eq: Staff.staff_id
                              }
                            }
                          }
                        });
                        alert('Successfully delete the Staff.');
                        window.location.href = '/dashboards/staff';
                      }
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
                useDelStaffMutation();
              // const deleteStaff = async () => {
              //   deleteFunction({
              //     variables: {
              //       object: {
              //         working_status: false
              //       },
              //       where: {
              //         staff_id: {
              //           _eq: Staff.staff_id
              //         }
              //       }
              //     }
              //   });
              // };
              console.log(typeof deleteResult);

              //update
              const [update, { data: editResult }] = useUpdateStaffMutation();
              const updateStaff = () => {
                navigate(`/dashboards/editstaff/${Staff.staff_id}`);
              };
              console.log(typeof editResult);

              return (
                <TableRow hover key={Staff.staff_id} selected={isStaffSelected}>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {Staff.staff_id}
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
                      {Staff.staff_role}
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
                      {Staff.fullname}
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
                      {Staff.email}
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
                      {Staff.phone}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    {getStatusLabel(Staff.working_status)}
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {Staff.manager_id}
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
                      {Staff.vendor_id}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit User" arrow>
                      <IconButton
                        onClick={updateStaff}
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
          count={filteredStaffs.length}
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

StaffsTable.propTypes = {
  Staffs: PropTypes.array.isRequired
};

StaffsTable.defaultProps = {
  Staffs: []
};

export default StaffsTable;
