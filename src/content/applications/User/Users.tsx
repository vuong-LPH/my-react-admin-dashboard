import { Card } from '@mui/material';
import UsersTable from './UsersTable';
import {
  useGetCustomerQuery
} from '../../../generated';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
// import { subDays } from 'date-fns';

export interface Customer {
  customer_id: number;
  fullname: string;
  email: string;
  phone: string;
  address: string;
  active: boolean;
}

interface Props {
  users: Customer[];
}

function Users({ users }: Props) {
  return (
    <Card>
      <UsersTable customers={users} />
    </Card>
  );
}

export default Users;
