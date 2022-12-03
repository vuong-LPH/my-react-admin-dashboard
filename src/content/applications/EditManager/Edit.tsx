import { Button } from '@mui/material';
import { SidebarContext } from 'src/contexts/SidebarContext';
import { NavLink as RouterLink, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import './Edit.css';
import { Card } from '@mui/material';
import { Manager } from 'src/content/applications/Manager/Managers';
import { useUpdateManagerMutation } from 'src/generated';
import { useFormik } from 'formik';

type Props = {
  manager: Manager;
};

function EditManager(props: Props) {
  const {
    manager: {
      // active,
      manager_id: managerId,
      email,
      fullname: fullName,
      phone,
      password,
      vendor_id
    }
  } = props;

  const [update, { data }] = useUpdateManagerMutation();
  const navigate = useNavigate();

  //   function refreshPage() {
  //     setTimeout(()=>{
  //         window.location.href="/dashboards/manager";
  //     }, 500);
  //     console.log('/dashboards/manager')
  // }

  const formik = useFormik({
    initialValues: {
      managerId,
      fullName,
      email,
      phone,
      password,
      vendor_id
    },
    onSubmit: ({ managerId, fullName, email, phone, password, vendor_id }) => {
      update({
        variables: {
          object: {
            fullname: fullName,
            email,
            phone,
            password,
            vendor_id
          },
          where: {
            manager_id: {
              _eq: managerId
            }
          }
        }
      });
      // refreshPage();
      window.location.href = '/dashboards/manager';
      // navigate('/dashboards/manager');
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
                name="managerId"
                type="hidden"
                value={formik.values.managerId}
                onChange={formik.handleChange}
              />
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
              <div className="form-group">
                <p>
                  Password <span>*</span>
                </p>
                  <input
                    name="password"
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
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
    </Card>
  );
}

export default EditManager;
