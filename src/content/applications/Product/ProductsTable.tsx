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
// import { Product, ProductStatus } from 'src/models/product';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { Product } from './Products';
import { useDelProductMutation, useUpdateProductMutation } from 'src/generated';
import { useNavigate } from 'react-router-dom';
// import { useDeleteProductMutation } from 'src/generated';
import { confirmAlert } from 'react-confirm-alert';
// import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

interface ProductsTableProps {
  className?: string;
  Products: Product[];
}

interface Filters {
  status?: boolean;
}

const getStatusLabel = (ProductStatus: boolean): JSX.Element => {
  const { text, color } = ProductStatus
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

const applyFilters = (Products: Product[], filters: Filters): Product[] => {
  return Products.filter((Product) => {
    let matches = true;

    return matches;
  });
};

const applyPagination = (
  Products: Product[],
  page: number,
  limit: number
): Product[] => {
  return Products.slice(page * limit, page * limit + limit);
};

const ProductsTable: FC<ProductsTableProps> = ({ Products }) => {
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(9999);
  const [filters, setFilters] = useState<Filters>({
    status: null
  });

  const handleSelectAllProducts = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    // setSelectedProducts(
    //   event.target.checked
    //     ? Products.map((Product) => Product.product_id)
    //     : []
    // );
  };

  const handleSelectOneProduct = (
    event: ChangeEvent<HTMLInputElement>,
    ProductId: number
  ): void => {
    if (!selectedProducts.includes(ProductId)) {
      // setSelectedProducts((prevSelected) => [
      //   ...prevSelected,
      //   ProductId
      // ]);
    } else {
      setSelectedProducts((prevSelected) =>
        prevSelected.filter((id) => id !== ProductId)
      );
    }
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredProducts = applyFilters(Products, filters);
  const paginatedProducts = applyPagination(filteredProducts, page, limit);
  const selectedSomeProducts =
    selectedProducts.length > 0 && selectedProducts.length < Products.length;
  const selectedAllProducts = selectedProducts.length === Products.length;
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader title="Products" />
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Product</TableCell>
              <TableCell>PRICE</TableCell>
              <TableCell align="right">STATUS</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedProducts.map((Product) => {
              const isProductselected = selectedProducts.includes(
                Product.product_id
              );

                            //confirm yes/no for delete
                            const submit = () => {
                              confirmAlert({
                                title: 'Are you sure?',
                                message: 'Are you sure to delete this Product?',
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
                                            product_id: {
                                              _eq: Product.product_id
                                            }
                                          }
                                        }
                                      });
                                      alert('Successfully delete the Product.');
                                      window.location.href = '/dashboards/product';
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
                useDelProductMutation();
              // const deleteProduct = async () => {
              //   deleteFunction({
              //     variables: {
              //       object: {
              //         status: false
              //       },
              //       where: {
              //         product_id: {
              //           _eq: Product.product_id
              //         }
              //       }
              //     }
              //   });
              // };
              console.log(typeof deleteResult);

              //update
              const [update, { data: editResult }] = useUpdateProductMutation();
              const updateProduct = () => {
                navigate(`/dashboards/editproduct/${Product.product_id}`);
              };
              console.log(typeof editResult);

              return (
                <TableRow
                  hover
                  key={Product.product_id}
                  selected={isProductselected}
                >
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {Product.product_id}
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
                      {Product.product_name}
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
                      {Product.product_price}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    {getStatusLabel(Product.status)}
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit Product" arrow>
                        <IconButton
                        onClick={updateProduct}
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
                    <Tooltip title="Delete Product" arrow>
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
          count={filteredProducts.length}
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

ProductsTable.propTypes = {
  Products: PropTypes.array.isRequired
};

ProductsTable.defaultProps = {
  Products: []
};

export default ProductsTable;
