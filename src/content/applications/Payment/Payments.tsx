import { Card } from '@mui/material';
import { useGetAllPaymentMethodQuery } from 'src/generated';
// import { Payment } from 'src/models/payment';
import PaymentsTable from './PaymentsTable';

export interface Payment {
  payment_id: number;
  payment_type: string;
  active: boolean;
}

interface Props {
  payments: Payment[];
}

function Payments({ payments }: Props) {

  return (
    <Card>
        < PaymentsTable Payments={payments} />
    </Card>
  );
}

export default Payments;
