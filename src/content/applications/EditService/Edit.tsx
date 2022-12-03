import { Button } from '@mui/material';
import { SidebarContext } from 'src/contexts/SidebarContext';
import { NavLink as RouterLink, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import './Edit.css';
import { Card } from '@mui/material';
import { Service } from 'src/content/applications/Services/Services';
import { useUpdateServiceMutation } from 'src/generated';
import { useFormik } from 'formik';

type Props = {
  service: Service;
};

function EditService(props: Props) {
  const {
    service: {
      // active,
      service_id: serviceId,
      service_name: serviceName,
      service_description,
      min_weight,
      max_weight,
      service_price
    }
  } = props;
  const [update, { data }] = useUpdateServiceMutation();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      serviceId,
      serviceName,
      service_description,
      min_weight,
      max_weight,
      service_price
      // active
    },
    onSubmit: ({
      serviceId,
      serviceName,
      service_description,
      min_weight,
      max_weight,
      service_price
    }) => {
      update({
        variables: {
          object: {
            service_name: serviceName,
            service_description,
            min_weight,
            max_weight,
            service_price
          },
          where: {
            service_id: {
              _eq: serviceId
            }
          }
        }
      });
      window.location.href = '/dashboards/service';
      // navigate("/dashboards/service");
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
                name="serviceId"
                type="hidden"
                value={formik.values.serviceId}
                onChange={formik.handleChange}
              />
              <div className="form-group">
                <p>
                  {' '}
                  Service <span>*</span>
                </p>
                <input
                  name="serviceName"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.serviceName}
                  required
                />
                {/* <span className="omrs-input-label">Full Name</span> */}
              </div>
              <div className="form-group">
                <p>
                  {' '}
                  Description <span>*</span>
                </p>
                <input
                  name="service_description"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.service_description}
                  required
                />
                {/* <span className="omrs-input-label">Full Name</span> */}
              </div>
              <div className="form-group">
                <p>
                  {' '}
                  Price <span>*</span>
                </p>
                <input
                  name="service_price"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.service_price}
                  required
                />
                {/* <span className="omrs-input-label">Full Name</span> */}
              </div>
            </div>
            <div className="rightcontact">
              <div className="form-group">
                <p>
                  Min Weight <span>*</span>
                </p>
                <input
                  name="min_weight"
                  type="number"
                  onChange={formik.handleChange}
                  value={formik.values.min_weight}
                  required
                />
                {/* <span className="omrs-input-label">Full Name</span> */}
              </div>
              <div className="form-group">
                <p>
                  Max Weight <span>*</span>
                </p>
                <input
                  name="max_weight"
                  type="number"
                  onChange={formik.handleChange}
                  value={formik.values.max_weight}
                  required
                />
                {/* <span className="omrs-input-label">Full Name</span> */}
              </div>
            </div>
            <div className="btn">
              <Button
                className="btn1"
                disableRipple
                component={RouterLink}
                onClick={closeSidebar}
                to="/dashboards/service"
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

export default EditService;
