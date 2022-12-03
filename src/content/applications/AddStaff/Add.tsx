import { Button } from '@mui/material';
import { SidebarContext } from 'src/contexts/SidebarContext';
import { NavLink as RouterLink, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import './Add.css';
import { Card } from '@mui/material';
import { useCreateStaffMutation } from 'src/generated';
import { useFormik } from 'formik';

function AddStaff() {
  const [role, setRole] = useState('');
  const [fullname, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [manager, setManager] = useState<number>();
  const [vendor, setVendor] = useState<number>();

  const onRoleChangeHnd = (e: any) => {
    setRole(e.target.value);
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

  const onManagerChangeHnd = (e: any) => {
    setManager(e.target.value);
  };

  const onVendorChangeHnd = (e: any) => {
    setVendor(e.target.value);
  };

  const [create, { data }] = useCreateStaffMutation();

  console.log(typeof data);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      role,
      fullname,
      email,
      phone,
      manager,
      vendor
    },
    onSubmit: ({ role, fullname, email, phone, manager, vendor}) => {
      create({
        variables: {
          object: {
            staff_role: role,
            fullname: fullname,
            email: email,
            phone: phone,
            working_status: true,
            manager_id: manager,
            vendor_id: vendor
          }
        }
      });
      window.location.href = '/dashboards/staff';
    }
  });

  const { closeSidebar } = useContext(SidebarContext);
  return (
    <Card>
      <div className="container">
        <form onSubmit={formik.handleSubmit}>
          <div className="contentform">
            <div className="leftcontact">
              <div className="form-group">
                <p>
                  {' '}
                  Role <span>*</span>
                </p>
                <input
                  type="text"
                  name="role"
                  value={formik.values.role}
                  onChange={formik.handleChange}
                  required
                />
                {/* {errors.fullname && <div className="validation" style={{display: 'block'}}>{errors.fullname}</div>} */}
              </div>
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
            </div>
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
              <div className="form-group">
                <p>
                  Manager <span>*</span>
                </p>
                <input
                  type="text"
                  name="manager"
                  value={formik.values.manager}
                  onChange={formik.handleChange}
                  required
                />
                {/* {errors.phone && <div className="validation" style={{display: 'block'}}>{errors.phone}</div>} */}
              </div>
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
            <div className="btn">
              <Button
                className="btn1"
                disableRipple
                component={RouterLink}
                onClick={closeSidebar}
                to="/dashboards/staff"
                sx={{ mt: { xs: 2, md: 0 } }}
                variant="contained"
              >
                Back
              </Button>
              <div className="space2"></div>
              <Button
                disableRipple
                type='submit'
                sx={{ mt: { xs: 2, md: 0 } }}
                variant="contained"
              >
                Add Staff
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Card>
  );
}

export default AddStaff;
