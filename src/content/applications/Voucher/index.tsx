import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from 'src/components/Footer';

import Vouchers from './Vouchers';
import { useGetAllVoucherQuery } from 'src/generated';

function ApplicationsVoucher() {
  const { data, loading } = useGetAllVoucherQuery({
    variables: { status: true }
  });

  if (loading) return <div>Loading...</div>;
  console.log({data})
  return (
    <>
      <Helmet>
        <title>Voucher - Management</title>
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
            {data && <Vouchers vouchers={data.laundry_service_voucher}/>}
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default ApplicationsVoucher;
