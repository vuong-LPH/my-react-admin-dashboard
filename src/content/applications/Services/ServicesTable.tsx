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
import { Service } from './Services';
import { useDelServiceMutation, useUpdateServiceMutation } from 'src/generated';
import { useNavigate } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { render } from 'react-dom';
// import { useDeleteServiceMutation } from 'src/generated';

interface ServicesTableProps {
  className?: string;
  Services: Service[];
}

interface Filters {
  status?: boolean;
}

const getStatusLabel = (ServiceStatus: boolean): JSX.Element => {
  const { text, color } = ServiceStatus
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

const applyFilters = (Services: Service[], filters: Filters): Service[] => {
  return Services.filter((Service) => {
    let matches = true;

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
  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(9999);
  const [filters, setFilters] = useState<Filters>({
    status: null
  });

  const handleSelectAllServices = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    // setSelectedServices(
    //   event.target.checked
    //     ? Services.map((Service) => Service.service_id)
    //     : []
    // );
  };

  const handleSelectOneService = (
    event: ChangeEvent<HTMLInputElement>,
    ServiceId: number
  ): void => {
    if (!selectedServices.includes(ServiceId)) {
      // setSelectedServices((prevSelected) => [
      //   ...prevSelected,
      //   ServiceId
      // ]);
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
  const paginatedServices = applyPagination(filteredServices, page, limit);
  const selectedSomeServices =
    selectedServices.length > 0 && selectedServices.length < Services.length;
  const selectedAllServices = selectedServices.length === Services.length;
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader title="Services" />
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>SERVICE</TableCell>
              <TableCell>DESCRIPTION</TableCell>
              <TableCell>PRICE</TableCell>
              <TableCell align="right">MIN WEIGHT</TableCell>
              <TableCell align="right">MAX WEIGHT</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedServices.map((Service) => {
              const isServiceselected = selectedServices.includes(
                Service.service_id
              );

              //confirm yes/no for delete
              const submit = () => {
                confirmAlert({
                  title: 'Are you sure?',
                  message: 'Are you sure to delete this service?',
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
                              service_id: {
                                _eq: Service.service_id
                              }
                            }
                          }
                        });
                        alert('Successfully delete the Service.');
                        window.location.href="/dashboards/service";
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
                useDelServiceMutation();
              // const deleteService = async () => {
              //   deleteFunction({
              //     variables: {
              //       object: {
              //         status: false
              //       },
              //       where: {
              //         service_id: {
              //           _eq: Service.service_id
              //         }
              //       }
              //     }
              //   });
              // };
              console.log(typeof deleteResult);

              //update
              const [update, { data: editResult }] = useUpdateServiceMutation();
              const updateService = () => {
                navigate(`/dashboards/editservice/${Service.service_id}`);
              };
              console.log(typeof editResult);

              return (
                <TableRow
                  hover
                  key={Service.service_id}
                  selected={isServiceselected}
                >
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {Service.service_id}
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
                      {Service.service_name}
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
                      {Service.service_description}
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
                      {Service.service_price}
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
                      {Service.min_weight}
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
                      {Service.max_weight}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    {getStatusLabel(Service.status)}
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit Service" arrow>
                      <IconButton
                        onClick={updateService}
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
          count={filteredServices.length}
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

ServicesTable.propTypes = {
  Services: PropTypes.array.isRequired
};

ServicesTable.defaultProps = {
  Services: []
};

export default ServicesTable;
