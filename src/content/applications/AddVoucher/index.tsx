import { Helmet } from 'react-helmet-async';
// import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container, Button } from '@mui/material';
import Footer from 'src/components/Footer';
import Sidebar from 'src/layouts/SidebarLayout/Sidebar';
import { useContext } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import { SidebarContext } from 'src/contexts/SidebarContext';
import PageHeader from './PageHeader';
import AddVoucher from './Add';
// import { Props } from 'react-apexcharts';

// import Vouchers from './Vouchers';
// eslint-disable-next-line @typescript-eslint/no-redeclare

function ApplicationsAddVoucher() {
  return (
    <>
    <Helmet>
      <title>Add New Voucher</title>
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
          <AddVoucher />
        </Grid>
      </Grid>
    </Container>
    <Footer />
  </>
  );
}

export default ApplicationsAddVoucher;
function setFile(arg0: File): void {
  throw new Error('Function not implemented.');
}

