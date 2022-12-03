import { Button } from '@mui/material';
import { SidebarContext } from 'src/contexts/SidebarContext';
import { NavLink as RouterLink, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import './Add.css';
import { Card } from '@mui/material';
import { useCreateServiceMutation } from 'src/generated';
import { useFormik } from 'formik';

function AddService() {
  const [service_name, setServiceName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number>();
  const [min_weight, setMinWeight] = useState<number>();
  const [max_weight, setMaxWeight] = useState<number>();
  const [status, setStatus] = useState('');

  const onServiceNameChangeHnd = (e: any) => {
    setServiceName(e.target.value);
  };

  const onDescriptionChangeHnd = (e: any) => {
    setDescription(e.target.value);
  };

  const onPriceChangeHnd = (e: any) => {
    setPrice(e.target.value);
  };

  const onMinWeightChangeHnd = (e: any) => {
    setMinWeight(e.target.value);
  };

  const onMaxWeightChangeHnd = (e: any) => {
    setMaxWeight(e.target.value);
  };

  const onStatusChangeHnd = (e: any) => {
    setStatus(e.target.value);
  };

  const [create, { data }] = useCreateServiceMutation();

  console.log(typeof data);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      service_name,
      description,
      price,
      min_weight,
      max_weight
    },
    onSubmit: ({ service_name, description, price, min_weight, max_weight }) => {
      create({
        variables: {
          object: {
            service_name: service_name,
            service_description: description,
            service_price: price,
            min_weight: min_weight,
            max_weight: max_weight,
            status: true
          }
        }
      });
      window.location.href = '/dashboards/service';
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
                  Service <span>*</span>
                </p>
                  <input
                    type="text"
                    name="service_name"
                    value={formik.values.service_name}
                    onChange={formik.handleChange}
                    required
                  />
              </div>
              <div className="form-group">
              <p>
                  {' '}
                  Description <span>*</span>
                </p>
                  <input
                    type="text"
                    name="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    required
                  />  
              </div>
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
              <div className="rightcontact">
              <div className="form-group">
                <p>
                  Min Weight <span>*</span>
                </p>
                  <input
                    type="number"
                    name="min_weight"
                    value={formik.values.min_weight}
                    onChange={formik.handleChange}
                    required
                  />
              </div>
              <div className="form-group">
                <p>
                  Max Weight <span>*</span>
                </p>
                  <input
                    type="number"
                    name="max_weight"
                    value={formik.values.max_weight}
                    onChange={formik.handleChange}
                    required
                  />
              </div>
              </div>
          </div>
          <div className='btn'>
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
                disableRipple
                type='submit'
                sx={{ mt: { xs: 2, md: 0 } }}
                variant="contained"
              >
                Add Service
              </Button>
            </div>
        </form>
      </div>
    </Card>
  );
}

export default AddService;
