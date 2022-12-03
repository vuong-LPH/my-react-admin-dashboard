import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { RouteObject } from 'react-router';

import SidebarLayout from 'src/layouts/SidebarLayout';
import BaseLayout from 'src/layouts/BaseLayout';

import SuspenseLoader from 'src/components/SuspenseLoader';

const Loader = (Component) => (props) =>
(
  <Suspense fallback={<SuspenseLoader />}>
    <Component {...props} />
  </Suspense>
);

// Pages

const Login = Loader(lazy(() => import('src/content/overview')));

// Dashboards

const Dashboard = Loader(lazy(() => import('src/content/dashboards/Crypto')));

// Applications
const User = Loader(
  lazy(() => import('src/content/applications/User'))
);
const Staff = Loader(
  lazy(() => import('src/content/applications/Staff'))
);
const Manager = Loader(
  lazy(() => import('src/content/applications/Manager'))
);
const Payment = Loader(
  lazy(() => import('src/content/applications/Payment'))
);
const Product = Loader(
  lazy(() => import('src/content/applications/Product'))
);
const Services = Loader(
  lazy(() => import('src/content/applications/Services'))
);
const Transaction = Loader(
  lazy(() => import('src/content/applications/Transaction'))
);
const Vendor = Loader(
  lazy(() => import('src/content/applications/Vendor'))
);
const Voucher = Loader(
  lazy(() => import('src/content/applications/Voucher'))
);
const AddStaff = Loader(
  lazy(() => import('src/content/applications/AddStaff'))
);
const EditStaff = Loader(
  lazy(() => import('src/content/applications/EditStaff'))
);
const AddManager = Loader(
  lazy(() => import('src/content/applications/AddManager'))
);
const EditManager = Loader(
  lazy(() => import('src/content/applications/EditManager'))
);
const AddService = Loader(
  lazy(() => import('src/content/applications/AddService'))
);
const EditService = Loader(
  lazy(() => import('src/content/applications/EditService'))
);
const AddVoucher = Loader(
  lazy(() => import('src/content/applications/AddVoucher'))
);  
const EditVoucher = Loader(
  lazy(() => import('src/content/applications/EditVoucher'))
);      
const AddVendor = Loader(
  lazy(() => import('src/content/applications/AddVendor'))
);
const EditVendor = Loader(
  lazy(() => import('src/content/applications/EditVendor'))
);  
const AddProduct = Loader(
  lazy(() => import('src/content/applications/AddProduct'))
);
const EditProduct = Loader(
  lazy(() => import('src/content/applications/EditProduct'))
);  
const AddPaymentMethod = Loader(
  lazy(() => import('src/content/applications/AddPaymentMethod'))
);

// Components

const Buttons = Loader(
  lazy(() => import('src/content/pages/Components/Buttons'))
);
const Modals = Loader(
  lazy(() => import('src/content/pages/Components/Modals'))
);
const Accordions = Loader(
  lazy(() => import('src/content/pages/Components/Accordions'))
);
const Tabs = Loader(lazy(() => import('src/content/pages/Components/Tabs')));
const Badges = Loader(
  lazy(() => import('src/content/pages/Components/Badges'))
);
const Tooltips = Loader(
  lazy(() => import('src/content/pages/Components/Tooltips'))
);
const Avatars = Loader(
  lazy(() => import('src/content/pages/Components/Avatars'))
);
const Cards = Loader(lazy(() => import('src/content/pages/Components/Cards')));
const Forms = Loader(lazy(() => import('src/content/pages/Components/Forms')));

// Status

const Status404 = Loader(
  lazy(() => import('src/content/pages/Status/Status404'))
);
const Status500 = Loader(
  lazy(() => import('src/content/pages/Status/Status500'))
);
const StatusComingSoon = Loader(
  lazy(() => import('src/content/pages/Status/ComingSoon'))
);
const StatusMaintenance = Loader(
  lazy(() => import('src/content/pages/Status/Maintenance'))
);

const routes: RouteObject[] = [
  {
    path: '',
    element: <BaseLayout />,
    children: [
      {
        path: '/',
        element: <Login />,
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'status',
        children: [
          {
            path: '',
            element: <Navigate to="404" replace />
          },
          {
            path: '404',
            element: <Status404 />
          },
          {
            path: '500',
            element: <Status500 />
          },
          {
            path: 'maintenance',
            element: <StatusMaintenance />
          },
          {
            path: 'coming-soon',
            element: <StatusComingSoon />
          }
        ]
      },
      {
        path: '*',
        element: <Status404 />
      }
    ]
  },
  {
    path: 'dashboards',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="crypto" replace />
      },
      {
        path: 'dashboard',
        element: <Dashboard />
      },
      {
        path: 'user',
        element: <User />
      },
      {
        path: 'staff',
        element: <Staff />
      },
      {
        path: 'manager',
        element: <Manager />
      },
      {
        path: 'service',
        element: <Services />
      },
      {
        path: 'voucher',
        element: <Voucher />,
      },
      {
        path: 'addnewstaff',
        element: <AddStaff />
      },
      {
        path: 'editstaff/:staffId',
        element: <EditStaff />
      },
      {
        path: 'addnewmanager',
        element: <AddManager />
      },
      {
        path: 'editmanager/:managerId',
        element: <EditManager />
      },
      {
        path: 'addnewservice',
        element: <AddService />
      },
      {
        path: 'editservice/:serviceId',
        element: <EditService />
      },
      {
        path: 'addnewvoucher',
        element: <AddVoucher />
      },
      {
        path: 'editvoucher/:voucherId',
        element: <EditVoucher />
      },
      {
        path: 'addnewvendor',
        element: <AddVendor />
      },
      {
        path: 'editvendor/:vendorId',
        element: <EditVendor />
      },
      {
        path: 'addnewproduct',
        element: <AddProduct />
      },
      {
        path: 'editproduct/:productId',
        element: <EditProduct />
      },
      {
        path: 'addnewmethod',
        element: <AddPaymentMethod />
      },
      {
        path: 'vendor',
        element: <Vendor />
      },
      {
        path: 'product',
        element: <Product />
      },
      {
        path: 'transaction',
        element: <Transaction />
      },
      {
        path: 'payment',
        element: <Payment />
      },
    ]
  },
  {
    path: 'management',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="transactions" replace />
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            element: <Navigate to="details" replace />
          },
        ]
      }
    ]
  },
];

export default routes;
