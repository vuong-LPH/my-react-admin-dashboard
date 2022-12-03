import { Button } from '@mui/material';
import { SidebarContext } from 'src/contexts/SidebarContext';
import { NavLink as RouterLink, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import './Add.css';
import { useFormik } from 'formik';
import { Card } from '@mui/material';
import { useCreatePaymentMutation } from 'src/generated';

function AddMethod() {
  const [paymentType, setPaymentType] = useState('');
  const [active, setActive] = useState('');

  const onPaymentTypeChangeHnd = (e: any) => {
    setPaymentType(e.target.value);
  };

  const [create, { data }] = useCreatePaymentMutation();

  console.log(typeof data);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      paymentType
    },
    onSubmit: ({ paymentType }) => {
      create({
        variables: {
          object: {
            payment_type: paymentType,
            active: true
          }
        }
      });
      window.location.href = '/dashboards/payment';
    }
  });

  const { closeSidebar } = useContext(SidebarContext);
  return (
    <Card>
      <div className="App">
        <form onSubmit={formik.handleSubmit}>
          <div className="contentform">
            <div className="form-group">
              <p>
                {' '}
                Payment Method <span>*</span>
              </p>
              <input
                name='paymentType'
                type="text"
                value={formik.values.paymentType}
                onChange={formik.handleChange}
                required
              />
            </div>
          </div>
          <div className="btn">
            <Button
              className="btn1"
              disableRipple
              component={RouterLink}
              onClick={closeSidebar}
              to="/dashboards/payment"
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
              Add Method
            </Button>
          </div>
        </form>
      </div>
    </Card>
  );
}

export default AddMethod;
