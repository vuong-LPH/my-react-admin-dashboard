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
// import { Payment, PaymentStatus } from 'src/models/payment';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { Payment } from './Payments';
import { useNavigate } from 'react-router-dom';
import { useDelPaymentMutation } from 'src/generated';
// import { useDeletePaymentMutation } from 'src/generated';
import { confirmAlert } from 'react-confirm-alert';
// import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { useAlert } from 'react-alert'
import { render } from 'react-dom';

interface PaymentsTableProps {
  className?: string;
  Payments: Payment[];
}

interface Filters {
  status?: boolean;
}

const getStatusLabel = (PaymentStatus: boolean): JSX.Element => {
  const { text, color } = PaymentStatus
    ? {
        text: 'Failed',
        color: 'error'
      }
    : {
        text: 'Completed',
        color: 'success'
      };
  return <label color={color}>{text}</label>;
};

const applyFilters = (Payments: Payment[], filters: Filters): Payment[] => {
  return Payments.filter((Payment) => {
    let matches = true;

    return matches;
  });
};

const applyPagination = (
  Payments: Payment[],
  page: number,
  limit: number
): Payment[] => {
  return Payments.slice(page * limit, page * limit + limit);
};

const PaymentsTable: FC<PaymentsTableProps> = ({ Payments }) => {
  const [selectedPayments, setSelectedPayments] = useState<number[]>([]);
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(9999);
  const [filters, setFilters] = useState<Filters>({
    status: null
  });

  const handleSelectAllPayments = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    // setSelectedPayments(
    //   event.target.checked
    //     ? Payments.map((Payment) => Payment.payment_id)
    //     : []
    // );
  };

  const handleSelectOnePayment = (
    event: ChangeEvent<HTMLInputElement>,
    PaymentId: number
  ): void => {
    if (!selectedPayments.includes(PaymentId)) {
      // setSelectedPayments((prevSelected) => [
      //   ...prevSelected,
      //   PaymentId
      // ]);
    } else {
      setSelectedPayments((prevSelected) =>
        prevSelected.filter((id) => id !== PaymentId)
      );
    }
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredPayments = applyFilters(Payments, filters);
  const paginatedPayments = applyPagination(filteredPayments, page, limit);
  const selectedSomePayments =
    selectedPayments.length > 0 && selectedPayments.length < Payments.length;
  const selectedAllPayments = selectedPayments.length === Payments.length;
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader title="Payments" />
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>METHOD</TableCell>
              <TableCell align="right">STATUS</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedPayments.map((Payment) => {
              const isPaymentselected = selectedPayments.includes(
                Payment.payment_id
              );

              //confirm yes/no for delete
              const submit = () => {
                confirmAlert({
                  title: 'Are you sure?',
                  message: 'Are you sure to delete this Payment?',
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
                              payment_id: {
                                _eq: Payment.payment_id
                              }
                            }
                          }
                        });
                        alert('Successfully delete the Method.');
                        window.location.href = '/dashboards/payment';
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
                useDelPaymentMutation();
              // const deletePayment = async () => {
              //   deleteFunction({
              //     variables: {
              //       object: {
              //         active: false
              //       },
              //       where: {
              //         payment_id: {
              //           _eq: Payment.payment_id
              //         }
              //       }
              //     }
              //   });
              // };
              console.log(typeof deleteResult);


              return (
                <TableRow
                  hover
                  key={Payment.payment_id}
                  selected={isPaymentselected}
                >
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {Payment.payment_id}
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
                      {Payment.payment_type}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    {getStatusLabel(Payment.active)}
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Delete Payment" arrow>
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
          count={filteredPayments.length}
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

PaymentsTable.propTypes = {
  Payments: PropTypes.array.isRequired
};

PaymentsTable.defaultProps = {
  Payments: []
};

export default PaymentsTable;
