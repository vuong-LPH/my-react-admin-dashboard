import { Button } from '@mui/material';
import { SidebarContext } from 'src/contexts/SidebarContext';
import { NavLink as RouterLink, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import './Add.css';
import { Card } from '@mui/material';
import { useCreateVoucherMutation } from 'src/generated';
import { useFormik } from 'formik';

function AddVoucher() {
  const [voucherName, setVoucherName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [condition, setCondition] = useState<number>();
  const [service, setService] = useState<number>();
  const [quantity, setQuantity] = useState<number>();
  const [status, setStatus] = useState('');

  const onVoucherNameChangeHnd = (e: any) => {
    setVoucherName(e.target.value);
  };

  const onDescriptionChangeHnd = (e: any) => {
    setDescription(e.target.value);
  };

  const onStartDateChangeHnd = (e: any) => {
    setStartDate(e.target.value);
  };

  const onEndDateChangeHnd = (e: any) => {
    setEndDate(e.target.value);
  };

  const onServiceChangeHnd = (e: any) => {
    setService(e.target.value);
  };

  const onQuantityChangeHnd = (e: any) => {
    setQuantity(e.target.value);
  };

  const onStatusChangeHnd = (e: any) => {
    setStatus(e.target.value);
  };

  const onConditionChangeHnd = (e: any) => {
    setCondition(e.target.value);
  };

  const [create, { data }] = useCreateVoucherMutation();

  console.log(typeof data);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      voucherName,
      description,
      startDate, 
      endDate,
      service,
      quantity,
      condition
    },
    onSubmit: ({ voucherName, description, startDate, endDate, service, quantity, condition }) => {
      create({
        variables: {
          object: {
            voucher_name: voucherName,
            voucher_description: description,
            start_date: startDate,
            end_date: endDate,
            service_id: service,
            voucher_quantity: quantity,
            condition_weight: condition,
            status: true
          }
        }
      });
      window.location.href = '/dashboards/voucher';
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
                  Voucher <span>*</span>
                </p>
                <input
                  type="text"
                  name="voucherName"
                  value={formik.values.voucherName}
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
                  Start date <span>*</span>
                </p>
                <input
                  type="date"
                  name='startDate'
                  value={formik.values.startDate}
                  onChange={formik.handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <p>
                  {' '}
                  End date <span>*</span>
                </p>
                <input
                  type="date"
                  name="endDate"
                  value={formik.values.endDate}
                  onChange={formik.handleChange}
                  required
                />
              </div>
            </div>
            <div className="rightcontact">
              <div className="form-group">
                <p>
                  Service Support <span>*</span>
                </p>
                <input
                  type="text"
                  name="service"
                  value={formik.values.service}
                  onChange={formik.handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <p>
                  Condition Weight <span>*</span>
                </p>{' '}
                :
                <input
                  type="number"
                  name="condition"
                  value={formik.values.condition}
                  onChange={formik.handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <p>
                  Quantity <span>*</span>
                </p>
                <input
                  type="number"
                  name='quantity'
                  value={formik.values.quantity}
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
                to="/dashboards/voucher"
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
                Add Voucher
              </Button>
            </div>
        </form>
      </div>
    </Card>
  );
}

export default AddVoucher;
