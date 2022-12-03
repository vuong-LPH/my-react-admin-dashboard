import { Typography, Button, Grid } from '@mui/material';
import { SidebarContext } from 'src/contexts/SidebarContext';
import { useContext } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';

function PageHeader() {
  const { closeSidebar } = useContext(SidebarContext);
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Service Management
        </Typography>
      </Grid>
      <Grid item>
        <Button
          disableRipple
          component={RouterLink}
          onClick={closeSidebar}
          to="/dashboards/addnewservice"
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
        >
          Create New Service
        </Button>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
