import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from 'src/components/Footer';

import Managers from './Managers';
import { useGetAllManagerQuery } from 'src/generated';

function ApplicationsManager() {
  const { data, loading } = useGetAllManagerQuery({
    variables: { active: true }
  });

  if (loading) return <div>Loading...</div>;
  console.log({data})
  return (
    <>
      <Helmet>
        <title>User - Management</title>
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
          {data && <Managers managers={data.laundry_service_manager}/>}
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default ApplicationsManager;
