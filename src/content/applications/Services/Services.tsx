import { Card } from '@mui/material';
import { Service } from 'src/models/service';
import ServicesTable from './ServicesTable';
// import { subDays } from 'date-fns';

function Services() {
  const Services: Service[] = [
    {
      id: '1',
      service: 'combo 1',
      description: 'giat, ui (10k/1kg)',
      // status: 'completed',
      price: '10.000',
      // address: 'Ho Chi Minh',
    //   sourceDesc: '*** 1111',
    //   amountCrypto: 34.4565,
    //   amount: 56787,
    //   cryptoCurrency: 'ETH',
    //   currency: '$'
    },
    {
      id: '2',
      service: 'combo 2',
      description: 'giat, ui, hap (20k/1kg)',
      // status: 'completed',
      price: '20.000',
      // address: 'Ho Chi Minh',
    //   sourceDesc: '*** 1111',
    //   amountCrypto: 6.58454334,
    //   amount: 8734587,
    //   cryptoCurrency: 'BTC',
    //   currency: '$'
    },
    {
      id: '3',
      service: 'combo 3',
      description: 'giat, say (10k/1kg)',
      // status: 'failed',
      price: '10.000',
      // address: 'Ha Noi',
    //   sourceDesc: '*** 1111',
    //   amountCrypto: 6.58454334,
    //   amount: 8734587,
    //   cryptoCurrency: 'BTC',
    //   currency: '$'
    },
    {
      id: '4',
      service: 'combo 4',
      description: 'giat, hap(30k/1kg)',
      // status: 'completed',
      price: '30.000',
      // address: 'Ha Noi',
    //   sourceDesc: '*** 1111',
    //   amountCrypto: 6.58454334,
    //   amount: 8734587,
    //   cryptoCurrency: 'BTC',
    //   currency: '$'
    },
    {
      id: '5',
      service: 'combo 5',
      description: 'full service (40k/1kg)',
      // status: 'pending',
      price: '40.000',
      // address: 'Vung Tau',
    //   sourceDesc: '*** 1111',
    //   amountCrypto: 6.58454334,
    //   amount: 8734587,
    //   cryptoCurrency: 'BTC',
    //   currency: '$'
    },
  ];

  return (
    <Card>
      <ServicesTable Services={Services} />
    </Card>
  );
}

export default Services;
