import { Button } from '@mui/material';
import { SidebarContext } from 'src/contexts/SidebarContext';
import { NavLink as RouterLink, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import './Edit.css';
import { Card } from '@mui/material';
import { Staff } from 'src/content/applications/Staff/Staffs';
import { useUpdateStaffMutation } from 'src/generated';
import { useFormik } from 'formik';

type Props = {
  staff: Staff;
};

function EditStaff(props: Props) {
  const {
    staff: {
      // active,
      staff_role,
      staff_id: staffId,
      email,
      fullname: fullName,
      phone,
      manager_id,
      vendor_id
    }
  } = props;

  const [update, { data }] = useUpdateStaffMutation();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      staffId,
      fullName,
      email,
      phone,
      staff_role,
      manager_id,
      vendor_id
    },
    onSubmit: ({
      staffId,
      fullName,
      email,
      phone,
      staff_role,
      manager_id,
      vendor_id
    }) => {
      update({
        variables: {
          object: {
            fullname: fullName,
            email,
            phone,
            staff_role,
            manager_id,
            vendor_id
          },
          where: {
            staff_id: {
              _eq: staffId
            }
          }
        }
      });
      window.location.href = '/dashboards/staff';
      // navigate('/dashboards/staff');
    }
  });

  const { closeSidebar } = useContext(SidebarContext);
  return (
    <Card>
      <div className="App">
        <div>
          <form onSubmit={formik.handleSubmit}>
            <div className="contentform">
              <div className="leftcontact">
                <input
                  name="staffId"
                  type="hidden"
                  value={formik.values.staffId}
                  onChange={formik.handleChange}
                  required
                />
                <div className="form-group">
                  <p>
                    {' '}
                    Role <span>*</span>
                  </p>
                  <input
                    name="staff_role"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.staff_role}
                    required
                  />
                  {/* <span className="omrs-input-label">Full Name</span> */}
                </div>
                <div className="form-group">
                  <p>
                    {' '}
                    Full Name <span>*</span>
                  </p>
                  <input
                    name="fullName"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.fullName}
                    required
                  />
                  {/* <span className="omrs-input-label">Full Name</span> */}
                </div>
                <div className="form-group">
                  <p>
                    E-mail <span>*</span>
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
              </div>
              <div className="rightcontact">
              <div className="form-group">
                <p>
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
                  Manager <span>*</span>
                </p>
                  <input
                    name="manager_id"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.manager_id}
                    required
                  />
                  {/* <span className="omrs-input-label">Phone</span> */}
              </div>
              <div className="form-group">
                <p>
                  Vendor <span>*</span>
                </p>
                  <input
                    name="vendor_id"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.vendor_id}
                    required
                  />
                  {/* <span className="omrs-input-label">Phone</span> */}
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
                // className="btn2"
                type="submit"
                disableRipple
                sx={{ mt: { xs: 2, md: 0 } }}
                variant="contained"
              >
                Save
              </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Card>
  );
}

export default EditStaff;
