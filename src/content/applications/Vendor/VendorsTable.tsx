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
// import { Vendor, VendorStatus } from 'src/models/vendor';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { Vendor } from './Vendors';
import { useDelVendorMutation, useUpdateVendorMutation } from 'src/generated';
import { useNavigate } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
// import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { render } from 'react-dom';
// import { useDeleteVendorMutation } from 'src/generated';

interface VendorsTableProps {
  className?: string;
  Vendors: Vendor[];
}

interface Filters {
  status?: boolean;
}

const getStatusLabel = (VendorStatus: boolean): JSX.Element => {
  const { text, color } = VendorStatus
    ? {
        text: 'Working',
        color: 'success'
      }
    : {
        text: 'Stop Working',
        color: 'error'
      };
  return <label color={color}>{text}</label>;
};
// const getStatusLabel = (VendorStatus: boolean): JSX.Element => {
//   const map = {
//     failed: {
//       text: 'Failed',
//       color: 'error'
//     },
//     completed: {
//       text: 'Completed',
//       color: 'success'
//     },
//     pending: {
//       text: 'Pending',
//       color: 'warning'
//     }
//   };

//   const { text, color }: any = map[VendorStatus];

//   return <Label color={color}>{text}</Label>;
// };

const applyFilters = (Vendors: Vendor[], filters: Filters): Vendor[] => {
  return Vendors.filter((Vendor) => {
    let matches = true;

    return matches;
  });
};

const applyPagination = (
  Vendors: Vendor[],
  page: number,
  limit: number
): Vendor[] => {
  return Vendors.slice(page * limit, page * limit + limit);
};

const VendorsTable: FC<VendorsTableProps> = ({ Vendors }) => {
  const [selectedVendors, setSelectedVendors] = useState<number[]>([]);
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

  const handleSelectAllVendors = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    // setSelectedVendors(
    //   event.target.checked
    //     ? Vendors.map((Vendor) => Vendor.vendor_id)
    //     : []
    // );
  };

  const handleSelectOneVendor = (
    event: ChangeEvent<HTMLInputElement>,
    VendorId: number
  ): void => {
    if (!selectedVendors.includes(VendorId)) {
      setSelectedVendors((prevSelected) => [...prevSelected, VendorId]);
    } else {
      setSelectedVendors((prevSelected) =>
        prevSelected.filter((id) => id !== VendorId)
      );
    }
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredVendors = applyFilters(Vendors, filters);
  const paginatedVendors = applyPagination(filteredVendors, page, limit);
  const selectedSomeVendors =
    selectedVendors.length > 0 && selectedVendors.length < Vendors.length;
  const selectedAllVendors = selectedVendors.length === Vendors.length;
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader title="Vendors" />
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Vendor</TableCell>
              <TableCell>PHONE</TableCell>
              <TableCell>EMAIL</TableCell>
              <TableCell>STREET</TableCell>
              <TableCell align="right">DISTRICT</TableCell>
              <TableCell align="right">CITY</TableCell>
              <TableCell align="right">ZIP CODE</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedVendors.map((Vendor) => {
              const isVendorSelected = selectedVendors.includes(
                Vendor.vendor_id
              );

                            //confirm yes/no for delete
                            const submit = () => {
                              confirmAlert({
                                title: 'Are you sure?',
                                message: 'Are you sure to delete this Vendor?',
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
                                            vendor_id: {
                                              _eq: Vendor.vendor_id
                                            }
                                          }
                                        }
                                      });
                                      alert('Successfully delete the Vendor.');
                                      window.location.href = '/dashboards/vendor';
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
                useDelVendorMutation();
              // const deleteVendor = async () => {
              //   deleteFunction({
              //     variables: {
              //       object: {
              //         active: false
              //       },
              //       where: {
              //         vendor_id: {
              //           _eq: Vendor.vendor_id
              //         }
              //       }
              //     }
              //   });
              // };
              console.log(typeof deleteResult);

              //update
              const [update, { data: editResult }] =
                useUpdateVendorMutation();
              const updateVendor = () => {
                navigate(`/dashboards/editvendor/${Vendor.vendor_id}`);
              };
              console.log(typeof editResult);

              return (
                <TableRow
                  hover
                  key={Vendor.vendor_id}
                  selected={isVendorSelected}
                >
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {Vendor.vendor_id}
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
                      {Vendor.vendor_name}
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
                      {Vendor.phone}
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
                      {Vendor.email}
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
                      {Vendor.street}
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
                      {Vendor.district}
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
                      {Vendor.city}
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
                      {Vendor.zip_code}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    {getStatusLabel(Vendor.active)}
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit Vendor" arrow>
                        <IconButton
                        onClick={updateVendor}
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
                    <Tooltip title="Delete Vendor" arrow>
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
          count={filteredVendors.length}
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

VendorsTable.propTypes = {
  Vendors: PropTypes.array.isRequired
};

VendorsTable.defaultProps = {
  Vendors: []
};

export default VendorsTable;
