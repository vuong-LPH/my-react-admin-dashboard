import { Card } from '@mui/material';
import { useGetAllServiceQuery } from 'src/generated';
import ServicesTable from './ServicesTable';

export interface Service {
  service_id: number;
  service_name: string;
  service_description: string;
  service_price: any;
  min_weight: number;
  max_weight: number;
  status: boolean;
}

interface Props {
  services: Service[];
}

function Services({ services }: Props) {


  return (
    <Card>
        < ServicesTable Services={services} />
    </Card>
  );
}

export default Services;
