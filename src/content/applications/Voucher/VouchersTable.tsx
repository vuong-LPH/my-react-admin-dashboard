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
// import { Voucher, VoucherStatus } from 'src/models/voucher';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { Voucher } from './Vouchers';
import { useDelVoucherMutation, useUpdateVoucherMutation } from 'src/generated';
import { useNavigate } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
// import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { render } from 'react-dom';

interface VouchersTableProps {
  className?: string;
  Vouchers: Voucher[];
}

interface Filters {
  status?: boolean;
}

const getStatusLabel = (VoucherStatus: boolean): JSX.Element => {
  const { text, color } = VoucherStatus
    ? {
        text: 'Available',
        color: 'success'
      }
    : {
        text: 'Not Available',
        color: 'error'
      };
  return <label color={color}>{text}</label>;
};

// const getStatusLabel = (VoucherStatus: boolean): JSX.Element => {
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

//   const { text, color }: any = map[VoucherStatus];

//   return <Label color={color}>{text}</Label>;
// };

const applyFilters = (Vouchers: Voucher[], filters: Filters): Voucher[] => {
  return Vouchers.filter((Voucher) => {
    let matches = true;

    return matches;
  });
};

const applyPagination = (
  Vouchers: Voucher[],
  page: number,
  limit: number
): Voucher[] => {
  return Vouchers.slice(page * limit, page * limit + limit);
};

const VouchersTable: FC<VouchersTableProps> = ({ Vouchers }) => {
  const [selectedVouchers, setSelectedVouchers] = useState<number[]>([]);
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(9999);
  const [filters, setFilters] = useState<Filters>({
    status: null
  });

  // const statusOptions = [
  //   {
  //     id: 'all',
  //     name: 'All'
  //   },
  //   {
  //     id: 'completed',
  //     name: 'Completed'
  //   },
  //   {
  //     id: 'pending',
  //     name: 'Pending'
  //   },
  //   {
  //     id: 'failed',
  //     name: 'Failed'
  //   }
  // ];

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

  const handleSelectAllVouchers = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    // setSelectedVouchers(
    //   event.target.checked
    //     ? Vouchers.map((Voucher) => Voucher.voucher_id)
    //     : []
    // );
  };

  const handleSelectOneVoucher = (
    event: ChangeEvent<HTMLInputElement>,
    VoucherId: number
  ): void => {
    if (!selectedVouchers.includes(VoucherId)) {
      //   // setSelectedVouchers((prevSelected) => [
      //   //   ...prevSelected,
      //   //   VoucherId
      //   // ]);
    } else {
      // setSelectedVouchers((prevSelected) =>
      //   prevSelected.filter((id) => id !== VoucherId)
      // );
    }
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredVouchers = applyFilters(Vouchers, filters);
  const paginatedVouchers = applyPagination(filteredVouchers, page, limit);
  const selectedSomeVouchers =
    selectedVouchers.length > 0 && selectedVouchers.length < Vouchers.length;
  const selectedAllVouchers = selectedVouchers.length === Vouchers.length;
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader title="Vouchers" />
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>VOUCHER</TableCell>
              <TableCell>DESCRIPTION</TableCell>
              <TableCell>START DATE</TableCell>
              <TableCell>END DATE</TableCell>
              <TableCell align="right">SERVICE SUPPORT</TableCell>
              <TableCell align="right">CONDITION</TableCell>
              <TableCell align="right">STATUS</TableCell>
              <TableCell align="right">QUANTITY</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedVouchers.map((Voucher) => {
              const isVoucherSelected = selectedVouchers.includes(
                Voucher.voucher_id
              );

              //confirm yes/no for delete
              const submit = () => {
                confirmAlert({
                  title: 'Are you sure?',
                  message: 'Are you sure to delete this Voucher?',
                  buttons: [
                    {
                      label: 'Yes',
                      // neu co can chinh lai delete thi cop tu async xuong toi het trong ngoac cua label yes vao phan delete ben duoi
                      onClick: async () => {
                        deleteFunction({
                          variables: {
                            object: {
                              status: false
                            },
                            where: {
                              voucher_id: {
                                _eq: Voucher.voucher_id
                              }
                            }
                          }
                        });
                        alert('Successfully delete the Voucher.');
                        window.location.href = '/dashboards/voucher';
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
                useDelVoucherMutation();
              // const deleteVoucher = async () => {
              //   deleteFunction({
              //     variables: {
              //       object: {
              //         status: false
              //       },
              //       where: {
              //         voucher_id: {
              //           _eq: Voucher.voucher_id
              //         }
              //       }
              //     }
              //   });
              // };
              console.log(typeof deleteResult);

              //update
              const [update, { data: editResult }] = useUpdateVoucherMutation();
              const updateVoucher = () => {
                navigate(`/dashboards/editvoucher/${Voucher.voucher_id}`);
              };
              console.log(typeof editResult);

              return (
                <TableRow
                  hover
                  key={Voucher.voucher_id}
                  selected={isVoucherSelected}
                >
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {Voucher.voucher_id}
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
                      {Voucher.voucher_name}
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
                      {Voucher.voucher_description}
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
                      {Voucher.start_date}
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
                      {Voucher.end_date}
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
                      {Voucher.service_id}
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
                      {Voucher.condition_weight}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    {getStatusLabel(Voucher.status)}
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {Voucher.voucher_quantity}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit Voucher" arrow>
                      <IconButton
                        onClick={updateVoucher}
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
                    <Tooltip title="Delete Voucher" arrow>
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
          count={filteredVouchers.length}
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

VouchersTable.propTypes = {
  Vouchers: PropTypes.array.isRequired
};

VouchersTable.defaultProps = {
  Vouchers: []
};

export default VouchersTable;
