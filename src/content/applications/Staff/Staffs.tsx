import { Card } from '@mui/material';
import StaffsTable from './StaffsTable';
import { useGetAllStaffQuery} from '../../../generated';
// import { subDays } from 'date-fns';

export interface Staff {
  staff_id: number;
  staff_role: string;
  fullname: string;
  email: string;
  phone: string;
  working_status: boolean;
  manager_id: number;
  vendor_id: number;
}

interface Props {
  staffs: Staff[];
}

function Staffs({ staffs }: Props) {

  // const { data } = useGetAllStaffQuery();

  // console.log(typeof data)

  return (
    <Card>
        < StaffsTable Staffs={staffs} />
    </Card>
  );
}

export default Staffs;
