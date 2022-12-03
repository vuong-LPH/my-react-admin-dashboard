import { Button } from '@mui/material';
import { SidebarContext } from 'src/contexts/SidebarContext';
import { NavLink as RouterLink, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import './Add.css';
import { Card } from '@mui/material';
import { useCreateProductMutation } from 'src/generated';
import { useFormik } from 'formik';

function AddProduct() {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [status, setStatus] = useState('');

  const onProductNameChangeHnd = (e: any) => {
    setProductName(e.target.value);
  };

  const onPriceChangeHnd = (e: any) => {
    setPrice(e.target.value);
  };

  const onStatusChangeHnd = (e: any) => {
    setStatus(e.target.value);
  };

  const [create, { data }] = useCreateProductMutation();

  console.log(typeof data);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      productName,
      price
    },
    onSubmit: ({ productName, price }) => {
      create({
        variables: {
          object: {
            product_name: productName,
            product_price: price,
            status: true
          }
        }
      });
      window.location.href = '/dashboards/product';
    }
  });

  const { closeSidebar } = useContext(SidebarContext);
  return (
    <Card>
      <div className="App">
        <form onSubmit={formik.handleSubmit}>
          <div className="contentform">
            <div className="leftcontact">
              <div className="form-group">
                <p>
                  {' '}
                  Product name <span>*</span>
                </p>
                <input
                  type="text"
                  name="productName"
                  value={formik.values.productName}
                  onChange={formik.handleChange}
                  required
                />
              </div>
            </div>
            <div className="rightcontact">
              <div className="form-group">
                <p>
                  {' '}
                  Price <span>*</span>
                </p>
                <input
                  type="text"
                  name="price"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className="btn">
            <Button
              className="btn1"
              disableRipple
              component={RouterLink}
              onClick={closeSidebar}
              to="/dashboards/product"
              sx={{ mt: { xs: 2, md: 0 } }}
              variant="contained"
            >
              Back
            </Button>
            <div className="space2"></div>
            <Button
              // className="btn2"
              disableRipple
              type='submit'
              sx={{ mt: { xs: 2, md: 0 } }}
              variant="contained"
            >
              Add Product
            </Button>
          </div>
        </form>
      </div>
    </Card>
  );
}

export default AddProduct;
