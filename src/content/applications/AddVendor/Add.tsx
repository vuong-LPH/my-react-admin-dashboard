import { Button } from '@mui/material';
import { SidebarContext } from 'src/contexts/SidebarContext';
import { NavLink as RouterLink, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import './Add.css';
import { Card } from '@mui/material';
import { useCreateVendorMutation } from 'src/generated';
import { useFormik } from 'formik';

function AddVendor() {
  const [vendorName, setVendorName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [district, setDistrict] = useState();
  const [city, setCity] = useState();
  const [zipCode, setZipCode] = useState();
  const [active, setActive] = useState('');

  const onVendorNameChangeHnd = (e: any) => {
    setVendorName(e.target.value);
  };

  const onEmailChangeHnd = (e: any) => {
    setEmail(e.target.value);
  };

  const onPhoneChangeHnd = (e: any) => {
    setPhone(e.target.value);
  };

  const onStreetChangeHnd = (e: any) => {
    setStreet(e.target.value);
  };

  const onDistrictChangeHnd = (e: any) => {
    setDistrict(e.target.value);
  };

  const onCityChangeHnd = (e: any) => {
    setCity(e.target.value);
  };

  const onZipCodeChangeHnd = (e: any) => {
    setZipCode(e.target.value);
  };

  const onActiveChangeHnd = (e: any) => {
    setActive(e.target.value);
  };

  const [create, { data }] = useCreateVendorMutation();

  console.log(typeof data);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      vendorName,
      email,
      phone,
      street,
      district,
      city,
      zipCode
    },
    onSubmit: ({ vendorName, email, phone, street, district,city, zipCode }) => {
      create({
        variables: {
          object: {
            vendor_name: vendorName,
            email: email,
            phone: phone,
            street: street,
            district: district,
            city: city,
            zip_code: zipCode,
            active: true
          }
        }
      });
      window.location.href = '/dashboards/vendor';
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
                  Vendor Name <span>*</span>
                </p>
                <input
                  type="text"
                  name="vendorName"
                  value={formik.values.vendorName}
                  onChange={formik.handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <p>
                  {' '}
                  Phone <span>*</span>
                </p>
                <input
                  type="phone"
                  name="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <p>
                  {' '}
                  Email <span>*</span>
                </p>
                <input
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <p>
                  {' '}
                  Street <span>*</span>
                </p>
                <input
                  type="text"
                  name="street"
                  value={formik.values.street}
                  onChange={formik.handleChange}
                  required
                />
              </div>
            </div>
            <div className="rightcontact">
              <div className="form-group">
                <p>
                  {' '}
                  District <span>*</span>
                </p>
                <input
                  type="text"
                  name="district"
                  value={formik.values.district}
                  onChange={formik.handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <p>
                  {' '}
                  City <span>*</span>
                </p>
                <input
                  type="text"
                  name="city"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <p>
                  {' '}
                  Zip Code <span>*</span>
                </p>
                <input
                  type="text"
                  name="zipCode"
                  value={formik.values.zipCode}
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
                to="/dashboards/vendor"
                sx={{ mt: { xs: 2, md: 0 } }}
                variant="contained"
              >
                Back
              </Button>
              <div className="space2"></div>
              <Button
                // className="btn2"
                disableRipple
                type="submit"
                sx={{ mt: { xs: 2, md: 0 } }}
                variant="contained"
              >
                Add Vendor
              </Button>
            </div>
        </form>
      </div>
    </Card>
  );
}

export default AddVendor;
