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
import { Service, ServiceStatus } from 'src/models/service';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BulkActions from './BulkActions';

interface ServicesTableProps {
  className?: string;
  Services: Service[];
}

interface Filters {
  status?: ServiceStatus;
}

// const getStatusLabel = (Servicestatus: Servicestatus): JSX.Element => {
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

//   const { text, color }: any = map[Servicestatus];

//   return <Label color={color}>{text}</Label>;
// };

const applyFilters = (
  Services: Service[],
  filters: Filters
): Service[] => {
  return Services.filter((Service) => {
    let matches = true;

    // if (filters.status && Service.status !== filters.status) {
    //   matches = false;
    // }

    return matches;
  });
};

const applyPagination = (
  Services: Service[],
  page: number,
  limit: number
): Service[] => {
  return Services.slice(page * limit, page * limit + limit);
};

const ServicesTable: FC<ServicesTableProps> = ({ Services }) => {
  const [selectedServices, setSelectedServices] = useState<string[]>(
    []
  );
  const selectedBulkActions = selectedServices.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
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

  // const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
  //   let value = null;

  //   if (e.target.value !== 'all') {
  //     value = e.target.value;
  //   }

  //   setFilters((prevFilters) => ({
  //     ...prevFilters,
  //     status: value
  //   }));
  // };

  const handleSelectAllServices = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedServices(
      event.target.checked
        ? Services.map((Service) => Service.id)
        : []
    );
  };

  const handleSelectOneService = (
    event: ChangeEvent<HTMLInputElement>,
    ServiceId: string
  ): void => {
    if (!selectedServices.includes(ServiceId)) {
      setSelectedServices((prevSelected) => [
        ...prevSelected,
        ServiceId
      ]);
    } else {
      setSelectedServices((prevSelected) =>
        prevSelected.filter((id) => id !== ServiceId)
      );
    }
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredServices = applyFilters(Services, filters);
  const paginatedServices = applyPagination(
    filteredServices,
    page,
    limit
  );
  const selectedSomeServices =
    selectedServices.length > 0 &&
    selectedServices.length < Services.length;
  const selectedAllServices =
    selectedServices.length === Services.length;
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
          title="Services"
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
                  checked={selectedAllServices}
                  indeterminate={selectedSomeServices}
                  onChange={handleSelectAllServices}
                />
              </TableCell>
              <TableCell>SERVICE</TableCell>
              <TableCell>DESCRIPTION</TableCell>
              <TableCell>PRICE</TableCell>
              {/* <TableCell align="right">ADDRESS</TableCell>
              <TableCell align="right">Status</TableCell> */}
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedServices.map((Service) => {
              const isServiceselected = selectedServices.includes(
                Service.id
              );
              return (
                <TableRow
                  hover
                  key={Service.id}
                  selected={isServiceselected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isServiceselected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneService(event, Service.id)
                      }
                      value={isServiceselected}
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
                      {Service.service}
                    </Typography>
                    {/* <Typography variant="body2" color="text.secondary" noWrap>
                      {format(Service.orderDate, 'MMMM dd yyyy')}
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
                      {Service.description}
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
                      {Service.price}
                    </Typography>
                    {/* <Typography variant="body2" color="text.secondary" noWrap>
                      {Service.sourceDesc}
                    </Typography> */}
                  </TableCell>
                  {/* <TableCell align="right">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {Service.address}
                      {Service.cryptoCurrency}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {numeral(Service.amount).format(
                        `${Service.currency}0,0.00`
                      )}
                    </Typography>
                  </TableCell> */}
                  {/* <TableCell align="right">
                    {getStatusLabel(Service.status)}
                  </TableCell> */}
                  <TableCell align="right">
                    <Tooltip title="Edit Service" arrow>
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
                    <Tooltip title="Delete Service" arrow>
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
          count={filteredServices.length}
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

ServicesTable.propTypes = {
  Services: PropTypes.array.isRequired
};

ServicesTable.defaultProps = {
  Services: []
};

export default ServicesTable;
