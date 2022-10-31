import { Card } from '@mui/material';
import { Voucher } from 'src/models/voucher';
import VouchersTable from './VouchersTable';
import { subDays } from 'date-fns';

function Vouchers() {
  const Vouchers: Voucher[] = [
    {
      id: '1',
      voucher: 'voucher1',
      description: 'voucher giam 50k',
      // status: 'completed',
      startDate: new Date().getTime(),
      endDate: new Date().getTime(),
      serviceSupport: 'Combo1',
    //   amountCrypto: 34.4565,
    //   amount: 56787,
      condition: 'tren 2kg',
      quantity: 10
    },
    {
      id: '2',
      voucher: 'voucher2',
      description: 'voucher giam 100k',
      // status: 'completed',
      startDate: subDays(new Date(), 1).getTime(),
      endDate: subDays(new Date(), 2).getTime(),
      serviceSupport: 'Combo2',
    //   amountCrypto: 6.58454334,
    //   amount: 8734587,
      condition: 'tren 5kg',
      quantity: 10
    },
    {
      id: '3',
      voucher: 'voucher3',
      description: 'voucher giam 150k',
      // status: 'failed',
      startDate: subDays(new Date(), 5).getTime(),
      endDate: subDays(new Date(), 6).getTime(),
      serviceSupport: 'Combo3',
    //   amountCrypto: 6.58454334,
    //   amount: 8734587,
      condition: 'tren 10kg',
      quantity: 10
    },
    // {
    //   id: '4',
    //   voucher: 'Hung',
    //   description: 'Hung@gmail.com',
    //   status: 'completed',
    //   startDate: '0909123456',
    //   endDate: 'Ha Noi',
    // //   serviceSupport: '*** 1111',
    // //   amountCrypto: 6.58454334,
    // //   amount: 8734587,
    // //   condition: 'BTC',
    // //   quantity: '$'
    // },
    // {
    //   id: '5',
    //   voucher: 'Long',
    //   description: 'Long@gmail.com',
    //   status: 'pending',
    //   startDate: '0909123456',
    //   endDate: 'Vung Tau',
    // //   serviceSupport: '*** 1111',
    // //   amountCrypto: 6.58454334,
    // //   amount: 8734587,
    // //   condition: 'BTC',
    // //   quantity: '$'
    // },
  ];

  return (
    <Card>
      <VouchersTable Vouchers={Vouchers} />
    </Card>
  );
}

export default Vouchers;
