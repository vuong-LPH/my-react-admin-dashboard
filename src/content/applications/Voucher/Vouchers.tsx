import { Card } from '@mui/material';
// import { Voucher } from 'src/models/voucher';
import VouchersTable from './VouchersTable';
import { subDays } from 'date-fns';
import { useGetAllVoucherQuery } from 'src/generated';

export interface Voucher {
  voucher_id: number;
  voucher_name: string;
  voucher_description: string;
  start_date: any;
  end_date: any;
  service_id: number;
  condition_weight: number;
  voucher_quantity: number;
  status: boolean;
}

interface Props {
  vouchers: Voucher[];
}

function Vouchers({ vouchers }: Props) {

  // console.log(typeof data)

  return (
    <Card>
      <VouchersTable Vouchers={vouchers} />
    </Card>
  );
}

export default Vouchers;
