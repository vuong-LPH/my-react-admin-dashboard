import { Card } from '@mui/material';
import { User } from 'src/models/user';
import UsersTable from './UsersTable';
// import { subDays } from 'date-fns';

function Users() {
  const Users: User[] = [
    {
      id: '1',
      fullName: 'Vuong',
      email: 'vuong@gmail.com',
      status: 'completed',
      phone: '0909123456',
      address: 'Ho Chi Minh',
    //   sourceDesc: '*** 1111',
    //   amountCrypto: 34.4565,
    //   amount: 56787,
    //   cryptoCurrency: 'ETH',
    //   currency: '$'
    },
    {
      id: '2',
      fullName: 'Ha',
      email: 'Ha@gmail.com',
      status: 'completed',
      phone: '0909123456',
      address: 'Ho Chi Minh',
    //   sourceDesc: '*** 1111',
    //   amountCrypto: 6.58454334,
    //   amount: 8734587,
    //   cryptoCurrency: 'BTC',
    //   currency: '$'
    },
    {
      id: '3',
      fullName: 'Luat',
      email: 'Luat@gmail.com',
      status: 'failed',
      phone: '0909123456',
      address: 'Ha Noi',
    //   sourceDesc: '*** 1111',
    //   amountCrypto: 6.58454334,
    //   amount: 8734587,
    //   cryptoCurrency: 'BTC',
    //   currency: '$'
    },
    {
      id: '4',
      fullName: 'Hung',
      email: 'Hung@gmail.com',
      status: 'completed',
      phone: '0909123456',
      address: 'Ha Noi',
    //   sourceDesc: '*** 1111',
    //   amountCrypto: 6.58454334,
    //   amount: 8734587,
    //   cryptoCurrency: 'BTC',
    //   currency: '$'
    },
    {
      id: '5',
      fullName: 'Long',
      email: 'Long@gmail.com',
      status: 'pending',
      phone: '0909123456',
      address: 'Vung Tau',
    //   sourceDesc: '*** 1111',
    //   amountCrypto: 6.58454334,
    //   amount: 8734587,
    //   cryptoCurrency: 'BTC',
    //   currency: '$'
    },
  ];

  return (
    <Card>
      <UsersTable Users={Users} />
    </Card>
  );
}

export default Users;
