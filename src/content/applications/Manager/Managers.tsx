import { Card } from '@mui/material';
import ManagersTable from './ManagersTable';
import { useGetAllManagerQuery, useGetCustomerQuery } from '../../../generated';
// import { subDays } from 'date-fns';

export interface Manager {
  manager_id: number;
  fullname: string;
  email: string;
  password: string;
  phone: string;
  active: boolean;
  vendor_id: number;
}

interface Props {
  managers: Manager[];
}

function Managers({ managers }: Props) {

  return (
    <Card>
        < ManagersTable Managers={managers} />
    </Card>
  );
}

export default Managers;
