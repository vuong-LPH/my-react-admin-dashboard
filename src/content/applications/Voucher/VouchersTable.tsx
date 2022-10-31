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
import { Voucher, VoucherStatus } from 'src/models/voucher';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BulkActions from './BulkActions';

interface VouchersTableProps {
  className?: string;
  Vouchers: Voucher[];
}

interface Filters {
  status?: VoucherStatus;
}

const getStatusLabel = (VoucherStatus: VoucherStatus): JSX.Element => {
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

  const { text, color }: any = map[VoucherStatus];

  return <Label color={color}>{text}</Label>;
};

const applyFilters = (
  Vouchers: Voucher[],
  filters: Filters
): Voucher[] => {
  return Vouchers.filter((Voucher) => {
    let matches = true;

    // if (filters.status && Voucher.status !== filters.status) {
    //   matches = false;
    // }

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
  const [selectedVouchers, setSelectedVouchers] = useState<string[]>(
    []
  );
  const selectedBulkActions = selectedVouchers.length > 0;
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

  const handleSelectAllVouchers = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedVouchers(
      event.target.checked
        ? Vouchers.map((Voucher) => Voucher.id)
        : []
    );
  };

  const handleSelectOneVoucher = (
    event: ChangeEvent<HTMLInputElement>,
    VoucherId: string
  ): void => {
    if (!selectedVouchers.includes(VoucherId)) {
      setSelectedVouchers((prevSelected) => [
        ...prevSelected,
        VoucherId
      ]);
    } else {
      setSelectedVouchers((prevSelected) =>
        prevSelected.filter((id) => id !== VoucherId)
      );
    }
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredVouchers = applyFilters(Vouchers, filters);
  const paginatedVouchers = applyPagination(
    filteredVouchers,
    page,
    limit
  );
  const selectedSomeVouchers =
    selectedVouchers.length > 0 &&
    selectedVouchers.length < Vouchers.length;
  const selectedAllVouchers =
    selectedVouchers.length === Vouchers.length;
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
          // action={
          //   <Box width={150}>
          //     <FormControl fullWidth variant="outlined">
          //       <InputLabel>Status</InputLabel>
          //       <Select
          //         value={filters.status || 'all'}
          //         onChange={handleStatusChange}
          //         label="Status"
          //         autoWidth
          //       >
          //         {statusOptions.map((statusOption) => (
          //           <MenuItem key={statusOption.id} value={statusOption.id}>
          //             {statusOption.name}
          //           </MenuItem>
          //         ))}
          //       </Select>
          //     </FormControl>
          //   </Box>
          // }
          title="Vouchers"
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
                  checked={selectedAllVouchers}
                  indeterminate={selectedSomeVouchers}
                  onChange={handleSelectAllVouchers}
                />
              </TableCell>
              <TableCell>VOUCHER</TableCell>
              <TableCell>DESCRIPTION</TableCell>
              <TableCell>START DATE</TableCell>
              <TableCell>END DATE</TableCell>
              <TableCell align="right">SERVICE SUPPORT</TableCell>
              <TableCell align="right">CONDITION</TableCell>
              <TableCell align="right">QUANTITY</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedVouchers.map((Voucher) => {
              const isVoucherSelected = selectedVouchers.includes(
                Voucher.id
              );
              return (
                <TableRow
                  hover
                  key={Voucher.id}
                  selected={isVoucherSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isVoucherSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneVoucher(event, Voucher.id)
                      }
                      value={isVoucherSelected}
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
                      {Voucher.voucher}
                    </Typography>
                    {/* <Typography variant="body2" color="text.secondary" noWrap>
                      {format(Voucher.orderDate, 'MMMM dd yyyy')}
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
                      {Voucher.description}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {format(Voucher.startDate, 'MMMM dd yyyy')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {format(Voucher.endDate, 'MMMM dd yyyy')}
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
                      {Voucher.serviceSupport}
                    </Typography>
                    {/* <Typography variant="body2" color="text.secondary" noWrap>
                      {Voucher.sourceDesc}
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
                      {Voucher.condition}
                      {/* {Voucher.cryptoCurrency} */}
                    </Typography>
                    {/* <Typography variant="body2" color="text.secondary" noWrap>
                      {numeral(Voucher.amount).format(
                        `${Voucher.currency}0,0.00`
                      )}
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
                      {Voucher.quantity}
                      {/* {Voucher.cryptoCurrency} */}
                    </Typography>
                    {/* <Typography variant="body2" color="text.secondary" noWrap>
                      {numeral(Voucher.amount).format(
                        `${Voucher.currency}0,0.00`
                      )}
                    </Typography> */}
                  </TableCell>
                  {/* <TableCell align="right">
                    {getStatusLabel(Voucher.status)}
                  </TableCell> */}
                  <TableCell align="right">
                    <Tooltip title="Edit Voucher" arrow>
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
                    <Tooltip title="Delete Voucher" arrow>
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
          count={filteredVouchers.length}
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

VouchersTable.propTypes = {
  Vouchers: PropTypes.array.isRequired
};

VouchersTable.defaultProps = {
  Vouchers: []
};

export default VouchersTable;
