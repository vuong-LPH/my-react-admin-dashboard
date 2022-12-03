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
// import { Transaction, TransactionStatus } from 'src/models/transaction';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { Transaction } from './Transactions';

interface TransactionsTableProps {
  className?: string;
  Transactions: Transaction[];
}

interface Filters {
  status?: boolean;
}

const applyFilters = (
  Transactions: Transaction[],
  filters: Filters
): Transaction[] => {
  return Transactions.filter((Transaction) => {
    let matches = true;

    return matches;
  });
};

const applyPagination = (
  Transactions: Transaction[],
  page: number,
  limit: number
): Transaction[] => {
  return Transactions.slice(page * limit, page * limit + limit);
};

const TransactionsTable: FC<TransactionsTableProps> = ({ Transactions }) => {
  const [selectedTransactions, setSelectedTransactions] = useState<number[]>(
    []
  );
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(9999);
  const [filters, setFilters] = useState<Filters>({
    status: null
  });

  const handleSelectAllTransactions = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    // setSelectedTransactions(
    //   event.target.checked
    //     ? Transactions.map((Transaction) => Transaction.transaction_id)
    //     : []
    // );
  };

  const handleSelectOneTransaction = (
    event: ChangeEvent<HTMLInputElement>,
    TransactionId: number
  ): void => {
    if (!selectedTransactions.includes(TransactionId)) {
      setSelectedTransactions((prevSelected) => [
        ...prevSelected,
        TransactionId
      ]);
    } else {
      setSelectedTransactions((prevSelected) =>
        prevSelected.filter((id) => id !== TransactionId)
      );
    }
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredTransactions = applyFilters(Transactions, filters);
  const paginatedTransactions = applyPagination(
    filteredTransactions,
    page,
    limit
  );
  const selectedSomeTransactions =
    selectedTransactions.length > 0 &&
    selectedTransactions.length < Transactions.length;
  const selectedAllTransactions =
    selectedTransactions.length === Transactions.length;
  const theme = useTheme();

  return (
    <Card>
      <CardHeader title="Transactions" />
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>ORDER</TableCell>
              <TableCell>PAYMENT METHOD</TableCell>
              <TableCell>DAY</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedTransactions.map((Transaction) => {
              const isTransactionselected = selectedTransactions.includes(
                Transaction.transaction_id
              );
              return (
                <TableRow
                  hover
                  key={Transaction.transaction_id}
                  selected={isTransactionselected}
                >
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {Transaction.transaction_id}
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
                      {Transaction.order_id}
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
                      {Transaction.payment_id}
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
                      {Transaction.transaction_date}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    {/* <Tooltip title="Edit Transaction" arrow>
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
                    </Tooltip> */}
                    <Tooltip title="Delete Transaction" arrow>
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
      {/* <Box p={2}>
        <TablePagination
          component="div"
          count={filteredTransactions.length}
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

TransactionsTable.propTypes = {
  Transactions: PropTypes.array.isRequired
};

TransactionsTable.defaultProps = {
  Transactions: []
};

export default TransactionsTable;
