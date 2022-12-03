import { Helmet } from 'react-helmet-async';
// import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container, Button, CircularProgress } from '@mui/material';
import Footer from 'src/components/Footer';
import Sidebar from 'src/layouts/SidebarLayout/Sidebar';
import { useContext } from 'react';
import { NavLink as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { SidebarContext } from 'src/contexts/SidebarContext';
import PageHeader from './PageHeader';
import EditVendor from './Edit';
import { useGetVendorByIdQuery } from 'src/generated';
// import { Props } from 'react-apexcharts';

// import Vouchers from './Vouchers';
// eslint-disable-next-line @typescript-eslint/no-redeclare

function ApplicationsEditVendor() {
  const { vendorId } = useParams();
  const navigate = useNavigate();
  // DANGER
  // TODO: change graphql query to get by id
  const { data, loading, error } = useGetVendorByIdQuery({
    variables: { id: parseInt(vendorId) }
  });
  if (loading) return <CircularProgress />;
  return (
    <>
    <Helmet>
      <title>Edit Vendor</title>
    </Helmet>
    <PageTitleWrapper>
      <PageHeader />
    </PageTitleWrapper>
    <Container maxWidth="lg">
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={3}
      >
          <Grid item xs={12}>
            {/* Loading check customer , nho check null */}
            {data && data.laundry_service_vendor.length > 0 ? (
              // user by id only get one => get at index 0
              <EditVendor vendor={data.laundry_service_vendor[0]} />
            ) : (
              <>
                <div>No Vendor Found</div>
                <Button
                  className="btn1"
                  disableRipple
                  onClick={() => navigate("/dashboards/vendor")}
                  sx={{ mt: { xs: 2, md: 0 } }}
                  variant="contained"
                >
                  Back
                </Button>
              </>
            )}
          </Grid>
      </Grid>
    </Container>
    <Footer />
  </>
  );
}

export default ApplicationsEditVendor;
function setFile(arg0: File): void {
  throw new Error('Function not implemented.');
}

