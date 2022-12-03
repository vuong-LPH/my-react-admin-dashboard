import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from 'src/components/Footer';

import Products from './Products';
import { useGetAllProductQuery } from 'src/generated';

function ApplicationsProduct() {
  const { data, loading } = useGetAllProductQuery({
    variables: { status: true }
  });

  if (loading) return <div>Loading...</div>;
  console.log({data})
  return (
    <>
      <Helmet>
        <title>Product - Management</title>
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
          {data && <Products products={data.laundry_service_product}/>}
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default ApplicationsProduct;
