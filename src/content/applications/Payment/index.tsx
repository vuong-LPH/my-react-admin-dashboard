import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from 'src/components/Footer';

import Payments from './Payments';
import { useGetAllPaymentMethodQuery } from 'src/generated';
import { Payment } from '@mui/icons-material';

function ApplicationsPayment() {
  const { data, loading } = useGetAllPaymentMethodQuery({
    variables: { active: true }
  });

  if (loading) return <div>Loading...</div>;
  console.log({data})
  return (
    <>
      <Helmet>
        <title>PaymentMethod - Management</title>
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
          {data && <Payments payments={data.laundry_service_payment}/>}
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default ApplicationsPayment;
