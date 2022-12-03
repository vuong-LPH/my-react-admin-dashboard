import { Typography, Button, Grid } from '@mui/material';
import { NavLink as RouterLink } from 'react-router-dom';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { useContext } from 'react';
import { SidebarContext } from 'src/contexts/SidebarContext';

function PageHeader() {
  const { closeSidebar } = useContext(SidebarContext);
  const user = {
    name: 'Catherine Pike',
    avatar: '/static/images/avatars/1.jpg'
  };
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Vendor Management
        </Typography>
      </Grid>
      <Grid item>
        <Button
          disableRipple
          component={RouterLink}
          onClick={closeSidebar}
          to="/dashboards/addnewvendor"
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
        >
          Create New Vendor
        </Button>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
