import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from 'src/components/Footer';

import Services from './Services';
import { useGetAllServiceQuery } from 'src/generated';

function ApplicationsService() {
  const { data, loading } = useGetAllServiceQuery({
    variables: { status: true }
  });

  if (loading) return <div>Loading...</div>;
  console.log({data})

  return (
    <>
      <Helmet>
        <title>Service - Management</title>
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
          {data && <Services services={data.laundry_service_service}/>}
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default ApplicationsService;
