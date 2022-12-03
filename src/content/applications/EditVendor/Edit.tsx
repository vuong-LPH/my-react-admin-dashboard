import { Button } from '@mui/material';
import { SidebarContext } from 'src/contexts/SidebarContext';
import { NavLink as RouterLink, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import './Edit.css';
import { Card } from '@mui/material';
import { Vendor } from 'src/content/applications/Vendor/Vendors';
import { useFormik } from 'formik';
import { useUpdateVendorMutation } from 'src/generated';

type Props = {
  vendor: Vendor;
};

function EditVendor(props: Props) {
  const {
    vendor: {
      vendor_id: vendorId,
      vendor_name: vendorName,
      email,
      phone,
      street,
      district,
      city,
      zip_code
    }
  } = props;
  const [update, { data }] = useUpdateVendorMutation();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      vendorId,
      vendorName,
      email,
      phone,
      street,
      district,
      city,
      zip_code
      // active
    },
    onSubmit: ({
      vendorId,
      vendorName,
      email,
      phone,
      street,
      district,
      city,
      zip_code
    }) => {
      update({
        variables: {
          object: {
            vendor_name: vendorName,
            email,
            phone,
            street,
            district,
            city,
            zip_code
          },
          where: {
            vendor_id: {
              _eq: vendorId
            }
          }
        }
      });
      window.location.href="/dashboards/vendor";
      // navigate('/dashboards/vendor');
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
              name="vendorId"
              type="hidden"
              value={formik.values.vendorId}
              onChange={formik.handleChange}
            />
              <div className="form-group">
                <p>
                  {' '}
                  Vendor Name <span>*</span>
                </p>
                <input
                  name="vendorName"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.vendorName}
                  required
                />
                {/* <span className="omrs-input-label">Full Name</span> */}
            </div>
            <div className="form-group">
                <p>
                  {' '}
                  Phone <span>*</span>
                </p>
                <input
                  name="phone"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.phone}
                  required
                />
                {/* <span className="omrs-input-label">Phone</span> */}
            </div>
            <div className="form-group">
                <p>
                  {' '}
                  Email <span>*</span>
                </p>
                <input
                  name="email"
                  type="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  required
                />
                {/* <span className="omrs-input-label">Email</span> */}
            </div>
            <div className="form-group">
                <p>
                  {' '}
                  Street <span>*</span>
                </p>
                <input
                  name="street"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.street}
                  required
                />
                {/* <span className="omrs-input-label">Email</span> */}
            </div>
            </div>
            <div className="rightcontact">
            <div className="form-group">
                <p>
                  {' '}
                  District <span>*</span>
                </p>
                <input
                  name="district"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.district}
                  required
                />
                {/* <span className="omrs-input-label">Email</span> */}
            </div>
            <div className="form-group">
                <p>
                  {' '}
                  City <span>*</span>
                </p>
                <input
                  name="city"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.city}
                  required
                />
                {/* <span className="omrs-input-label">Email</span> */}
            </div>
            <div className="form-group">
                <p>
                  {' '}
                  Zip code <span>*</span>
                </p>
                <input
                  name="zip_code"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.zip_code}
                  required
                />
                {/* <span className="omrs-input-label">Email</span> */}
            </div>
            </div>
            </div>
            <div className="btn">
              <Button
                className="btn1"
                disableRipple
                component={RouterLink}
                onClick={closeSidebar}
                to="/dashboards/vendor"
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

export default EditVendor;
