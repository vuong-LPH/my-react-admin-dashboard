import { Card } from '@mui/material';
// import { Transaction } from 'src/models/transaction';
import TransactionsTable from './TransactionsTable';
import { subDays } from 'date-fns';
import { useGetAllTransactionQuery } from 'src/generated';

export interface Transaction {
  transaction_id: number;
  order_id: number;
  payment_id: number;
  transaction_date: any;
}

function Transactions() {

  const { data } = useGetAllTransactionQuery();

  console.log(typeof data)

  return (
    <Card>
      {data && (
        < TransactionsTable Transactions={data.laundry_service_transaction} />
      )}
    </Card>
  );
}

export default Transactions;
