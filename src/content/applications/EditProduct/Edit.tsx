import { Button } from '@mui/material';
import { SidebarContext } from 'src/contexts/SidebarContext';
import { NavLink as RouterLink, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import './Edit.css';
import { Card } from '@mui/material';
import { Product } from 'src/content/applications/Product/Products';
// import { useUpdateManagerMutation } from "src/generated";
import { useFormik } from 'formik';
import { useUpdateProductMutation } from 'src/generated';

type Props = {
  product: Product;
};

function EditProduct(props: Props) {
  const {
    product: {
      // active,
      product_id: productId,
      product_name: productName,
      product_price
    }
  } = props;

  const [update, { data }] = useUpdateProductMutation();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      productId,
      productName,
      product_price
    },
    onSubmit: ({ productId, productName, product_price }) => {
      update({
        variables: {
          object: {
            product_name: productName,
            product_price
          },
          where: {
            product_id: {
              _eq: productId
            }
          }
        }
      });
      window.location.href = '/dashboards/product';
      // navigate('/dashboards/product');
    }
  });

  const { closeSidebar } = useContext(SidebarContext);
  return (
    <Card>
      <div className="App">
        <form onSubmit={formik.handleSubmit}>
          <div className="contentform">
            <div className="leftcontact">
              <input
                name="productId"
                type="hidden"
                value={formik.values.productId}
                onChange={formik.handleChange}
              />
              <div className="form-group">
                <p>
                  {' '}
                  Product name <span>*</span>
                </p>
                <input
                  name="productName"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.productName}
                  required
                />
                {/* <span className="omrs-input-label">Full Name</span> */}
              </div>
            </div>
            <div className="rightcontact">
              <div className="form-group">
                <p>
                  {' '}
                  Price <span>*</span>
                </p>
                <input
                  name="product_price"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.product_price}
                  required
                />
                {/* <span className="omrs-input-label">Full Name</span> */}
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
              type="submit"
              disableRipple
              sx={{ mt: { xs: 2, md: 0 } }}
              variant="contained"
            >
              Save
            </Button>
          </div>
        </form>
      </div>
    </Card>
  );
}

export default EditProduct;
