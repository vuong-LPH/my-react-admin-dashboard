import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from 'src/components/Footer';

import Staffs from './Staffs';
import { useGetAllStaffQuery } from 'src/generated';

function ApplicationsStaff() {
  const { data, loading } = useGetAllStaffQuery({
    variables: { working_status: true }
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
          {data && <Staffs staffs={data.laundry_service_staff}/>}
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default ApplicationsStaff;
