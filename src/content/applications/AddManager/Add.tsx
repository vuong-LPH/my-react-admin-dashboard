import { Button } from '@mui/material';
import { SidebarContext } from 'src/contexts/SidebarContext';
import { NavLink as RouterLink, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import './Add.css';
import { Card } from '@mui/material';
import { useCreateManagerMutation } from 'src/generated';
import { useFormik } from 'formik';

function AddManager() {

  const [password, setPassword] = useState('');
  const [fullname, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [active, setActive] = useState<number>();
  const [vendor, setVendor] = useState<number>();

  const onPasswordChangeHnd = (e: any) => {
    setPassword(e.target.value);
  };

  const onFullNameChangeHnd = (e: any) => {
    setFullName(e.target.value);
  };

  const onEmailChangeHnd = (e: any) => {
    setEmail(e.target.value);
  };

  const onPhoneChangeHnd = (e: any) => {
    setPhone(e.target.value);
  };

  const onActiveChangeHnd = (e: any) => {
    setActive(e.target.value);
  };

  const onVendorChangeHnd = (e: any) => {
    setVendor(e.target.value);
  };

  const [create, { data }] = useCreateManagerMutation();

  console.log(typeof data);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      fullname,
      email,
      phone,
      password,
      vendor
    },
    onSubmit: ({ fullname, email, phone, password, vendor }) => {
    create({
      variables: {
        object: {
          fullname: fullname,
          email: email,
          phone: phone,
          password: password,
          active: true,
          vendor_id: vendor
        }
      }
    });
    window.location.href = '/dashboards/manager';
    }
  });

  // const createManager = async () => {
  //   create({
  //     variables: {
  //       object: {
  //         fullname: fullname,
  //         email: email,
  //         phone: phone,
  //         password: password,
  //         active: true,
  //         vendor_id: vendor
  //       }
  //     }
  //   });
  //   window.location.href = '/dashboards/manager';
  //   // navigate('/dashboards/manager');
  // };

  const { closeSidebar } = useContext(SidebarContext);

  // const {errors} = this.state;
  return (
    <Card>
      <div className="App">
        <form onSubmit={formik.handleSubmit}>
          <div className="contentform">
            <div className="leftcontact">
              <div className="form-group">
                <p>
                  {' '}
                  Full Name <span>*</span>
                </p>
                <input
                  type="text"
                  name="fullname"
                  value={formik.values.fullname}
                  onChange={formik.handleChange}
                  required
                />
                {/* {errors.fullname && <div className="validation" style={{display: 'block'}}>{errors.fullname}</div>} */}
              </div>

              {/* <div className="omrs-input-group">
            <label className="omrs-input-filled">
                {' '}
                Full Name <span>*</span> :
                <input
                  type="text"
                  value={fullname}
                  onChange={onFullNameChangeHnd}
                  required
                />
              </label>
            </div> */}
              {/* <div className="omrs-input-group">
            <label className="omrs-input-filled">
                {' '}
                Email <span>*</span> :
                <input
                  type="email"
                  value={email}
                  onChange={onEmailChangeHnd}
                  required
                />
              </label>
            </div> */}
              <div className="form-group">
                <p>
                  E-mail <span>*</span>
                </p>
                <input
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  required
                />
                {/* {errors.email && <div className="validation" style={{display: 'block'}}>{errors.email}</div>} */}
              </div>
              {/* <div className="omrs-input-group">
              <label className="omrs-input-filled">
                {' '}
                Password <span>*</span> :
                <input
                  type="password"
                  value={password}
                  onChange={onPasswordChangeHnd}
                  required
                />
              </label>
            </div> */}
              <div className="form-group">
                <p>
                  Password <span>*</span>
                </p>
                <input
                  type="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  required
                />
                {/* {errors.password && <div className="validation" style={{display: 'block'}}>{errors.password}</div>} */}
              </div>
            </div>
            {/* <div className="omrs-input-group">
            <label className="omrs-input-filled">
                {' '}
                Phone <span>*</span> :
                <input
                  type="phone"
                  value={phone}
                  onChange={onPhoneChangeHnd}
                  required
                />
              </label>
            </div> */}
            <div className="rightcontact">
              <div className="form-group">
                <p>
                  Phone <span>*</span>
                </p>
                <input
                  type="phone"
                  name="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  required
                />
                {/* {errors.phone && <div className="validation" style={{display: 'block'}}>{errors.phone}</div>} */}
              </div>
              {/* <div className="omrs-input-group">
            <label className="omrs-input-filled">
                {' '}
                Vendor <span>*</span> :
                <input
                  type="text"
                  value={vendor}
                  onChange={onVendorChangeHnd}
                  required
                />
              </label>
            </div> */}
              <div className="form-group">
                <p>
                  Vendor <span>*</span>
                </p>
                <input
                  type="text"
                  name="vendor"
                  value={formik.values.vendor}
                  onChange={formik.handleChange}
                  required
                />
                {/* {errors.vendor && <div className="validation" style={{display: 'block'}}>{errors.vendor}</div>} */}
              </div>
            </div>
          </div>
          <div className='btn'>
          <Button
              className="btn1"
              disableRipple
              component={RouterLink}
              onClick={closeSidebar}
              to="/dashboards/manager"
              sx={{ mt: { xs: 2, md: 0 } }}
              variant="contained"
            >
              Back
            </Button>
            {/* <div>
            <button type="button" className="bouton-contact" onClick={closeSidebar} to="/dashboards/manager">Back</button>
            </div> */}
            <div className="space2"></div>
            {/* <button type="button" className="bouton-contact" onClick={createManager}>Add Manager</button> */}
            <Button
              // className="btn2"
              disableRipple
              type="submit"
              sx={{ mt: { xs: 2, md: 0 } }}
              variant="contained"
            >
              Add Manager
            </Button>
            </div>
        </form>
      </div>
    </Card>
  );
}

export default AddManager;
