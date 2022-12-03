import { Button } from '@mui/material';
import { SidebarContext } from 'src/contexts/SidebarContext';
import { NavLink as RouterLink, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import './Edit.css';
import { Card } from '@mui/material';
import { Voucher } from 'src/content/applications/Voucher/Vouchers';
import { useFormik } from 'formik';
import { useUpdateVoucherMutation } from 'src/generated';

type Props = {
  voucher: Voucher;
};

function EditVoucher(props: Props) {
  const {
    voucher: {
      // active,
      voucher_description,
      voucher_id: voucherId,
      voucher_name: voucherName,
      voucher_quantity,
      service_id,
      start_date,
      end_date,
      condition_weight
    }
  } = props;
  const [update, { data }] = useUpdateVoucherMutation();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      voucherId,
      voucherName,
      voucher_description,
      voucher_quantity,
      service_id,
      start_date,
      end_date,
      condition_weight
      // active
    },
    onSubmit: ({
      voucherId,
      voucherName,
      voucher_description,
      voucher_quantity,
      service_id,
      start_date,
      end_date,
      condition_weight
    }) => {
      update({
        variables: {
          object: {
            voucher_description,
            voucher_name: voucherName,
            voucher_quantity,
            service_id,
            start_date,
            end_date,
            condition_weight
          },
          where: {
            voucher_id: {
              _eq: voucherId
            }
          }
        }
      });
      window.location.href = '/dashboards/voucher';
      // navigate("/dashboards/voucher");
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
                name="voucherId"
                type="hidden"
                value={formik.values.voucherId}
                onChange={formik.handleChange}
              />
              <div className="form-group">
                <p>
                  {' '}
                  Voucher <span>*</span>
                </p>
                <input
                  name="voucherName"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.voucherName}
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
                  name="voucher_description"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.voucher_description}
                  required
                />
                {/* <span className="omrs-input-label">Full Name</span> */}
              </div>
              <div className="form-group">
                <p>
                  {' '}
                  Start date <span>*</span>
                </p>
                <input
                  name="start_date"
                  type="date"
                  onChange={formik.handleChange}
                  value={formik.values.start_date}
                  required
                />
                {/* <span className="omrs-input-label">Full Name</span> */}
              </div>
              <div className="form-group">
                <p>
                  {' '}
                  End date <span>*</span>
                </p>
                <input
                  name="end_date"
                  type="date"
                  onChange={formik.handleChange}
                  value={formik.values.end_date}
                  required
                />
                {/* <span className="omrs-input-label">Full Name</span> */}
              </div>
            </div>
            <div className="rightcontact">
              <div className="form-group">
                <p>
                  Service Support <span>*</span>
                </p>
                <input
                  name="service_id"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.service_id}
                  required
                />
                {/* <span className="omrs-input-label">Full Name</span> */}
              </div>
              <div className="form-group">
                <p>
                  Condition Weight <span>*</span>
                </p>
                <input
                  name="condition_weight"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.condition_weight}
                  required
                />
                {/* <span className="omrs-input-label">Full Name</span> */}
              </div>
              <div className="form-group">
                <p>
                  Quantity <span>*</span>
                </p>
                <input
                  name="voucher_quantity"
                  type="number"
                  onChange={formik.handleChange}
                  value={formik.values.voucher_quantity}
                  required
                />
                {/* <span className="omrs-input-label">Full Name</span> */}
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

export default EditVoucher;
