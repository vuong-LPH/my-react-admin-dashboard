import { Typography, Button, Grid } from '@mui/material';
import { NavLink as RouterLink } from 'react-router-dom';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { SidebarContext } from 'src/contexts/SidebarContext';
import { useContext } from 'react';
import './header.css';

function PageHeader() {
  const { closeSidebar } = useContext(SidebarContext)
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <div>
      <Grid item>
        <a href='/dashboards/user'>
        <Typography variant="h3" component="h3" gutterBottom >
          User Management
        </Typography>
        </a>
      </Grid>
      <div className="space1">
      </div>
      <Button
          disableRipple
          component={RouterLink}
          onClick={closeSidebar}
          to="/dashboards/addnewmanager"
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
        >
          Add New Manager
        </Button>
      </div>
      <div className='navBtn' >
      <Grid item>
        <Button
          disableRipple
          component={RouterLink}
          onClick={closeSidebar}
          to="/dashboards/staff"
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
        >
          View All Staff
        </Button>
        <div className="space">
        </div>
        <Button
          disableRipple
          component={RouterLink}
          onClick={closeSidebar}
          to="/dashboards/manager"
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
        >
          View All Manager
        </Button>
      </Grid>
      </div>
    </Grid>
  );
}

export default PageHeader;
